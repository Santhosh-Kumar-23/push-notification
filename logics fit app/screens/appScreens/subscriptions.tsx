import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useState} from 'react';
import {
  BackHandler,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {Appbar, Button, MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import ENV from '../../../env';
import Network from '../../common/components/network';
import PaymentOptions from '../../common/components/paymentOptions';
import SkeletonPlaceholder from '../../common/components/skeletonPlaceholder';
import SubscriptionCard from '../../common/components/subscriptionCard';
import * as Styles from '../../common/styles';
import * as Colors from '../../common/utils/colors';
import * as Constants from '../../common/utils/constants';
import * as Enums from '../../configs/ts/enums';
import * as Interfaces from '../../configs/ts/interfaces';
import * as Actions from '../../redux/rootAction';
import SubscriptionsStyles from '../../styles/appStyles/subscriptions';

const Subscriptions: FC = (props: any) => {
  // Props Variables
  const {navigation, route} = props;
  const isRenew = route?.params?.isRenew ?? false;

  // UseState Variables
  const [paymentOptionsVisible, setPaymentOptionsVisible] =
    useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Other Variables
  const dispatch: any = useDispatch();
  const appReduxStates: Interfaces.AppReducerStateInterface = useSelector(
    (state: Interfaces.RootReducersStateInterface) => state.app,
  );
  const otherReduxStates: Interfaces.OtherReducerStateInterface = useSelector(
    (state: Interfaces.RootReducersStateInterface) => state.other,
  );
  const {colors}: MD3Theme = useTheme();
  const {StatusCodes} = Enums;
  const {AppBarStyles, ButtonStyles, CommonStyles} = Styles;
  const fetchingStatus: boolean = otherReduxStates.fetchingStatus;
  const subscription: null | Interfaces.SubscriptionCardDataInterface =
    appReduxStates.subscription;
  const subscriptions: Interfaces.SubscriptionCardDataInterface[] =
    appReduxStates.subscriptions;
  const checkForSubscriptions: boolean =
    Array.isArray(subscriptions) && subscriptions.length > Constants.ZERO;
  const user: null | Interfaces.UserInterface = appReduxStates.user;
  const loader: boolean = fetchingStatus || refreshing;

  // Hooks Functions
  useFocusEffect(
    useCallback(() => {
      let isFocus: boolean = true;

      BackHandler.addEventListener('hardwareBackPress', backAction);

      return (): void => {
        isFocus = false;

        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, []),
  );

  // Functions
  const backAction = (): boolean => {
    handleReduxStatesReset();

    navigation.pop();

    return true;
  };

  const renderHeader = (): React.JSX.Element => {
    return (
      <Appbar.Header
        mode={Constants.AB_M_SMALL}
        statusBarHeight={Constants.ZERO}
        style={AppBarStyles.defaultHeaderStyle}>
        <Appbar.BackAction
          iconColor={colors.surface}
          onPress={() => {
            handleReduxStatesReset();

            navigation.pop();
          }}
        />
        <Appbar.Content
          titleStyle={Styles.textView(
            RFPercentage(2.2),
            'Roboto-Regular',
            colors.surface,
            RFPercentage(2.8),
            'left',
          )}
          title={isRenew ? Constants.MY_PROFILE : Constants.SELECT_SUBSCRIPTION}
        />
      </Appbar.Header>
    );
  };

  const onRefresh = (): void => {
    setRefreshing(true);

    handleSubscriptionDetailsAPI();
  };

  const handleSubscriptionDetailsAPI = (): void => {
    const userId: number = user?.id ?? Constants.ZERO;

    const requestData: Interfaces.SubscriptionDetailsRequestInterface = {
      user_id: userId,
    };

    ENV.currentEnvironment == Constants.DEVELOPMENT &&
      console.log('SUBSCRIPTION DETAILS REQUEST DATA::: ', requestData);

    dispatch(
      Actions.getSubscriptionDetails(
        requestData,
        (response: Interfaces.APIResponseInterface): void => {
          const responseData: Interfaces.SubscriptionDetailsResponseInterface =
            response.data;

          const responseType: number = response.type;

          switch (responseType) {
            case StatusCodes.SUCCESS:
              let subscriptionDetails: Interfaces.SubscriptionCardDataInterface[] =
                responseData.subscription_details;

              subscriptionDetails = subscriptionDetails.filter(
                (lol: Interfaces.SubscriptionCardDataInterface): boolean =>
                  Boolean(lol.status),
              );

              dispatch(Actions.storeSubscriptions(subscriptionDetails));
              break;

            default:
              break;
          }

          setRefreshing(false);
        },
      ),
    );
  };

  const renderSubscriptions = (): React.JSX.Element => {
    return (
      <FlatList
        data={subscriptions}
        keyExtractor={(
          _: Interfaces.SubscriptionCardDataInterface,
          index: number,
        ): string => index.toString()}
        renderItem={({item, index}): any => {
          const reduxSubscriptionId: number =
            subscription?.id ?? Constants.ZERO;

          const subscriptionId: number = item.id;

          const checked: boolean = subscriptionId == reduxSubscriptionId;

          return !loader ? (
            <SubscriptionCard
              checked={checked}
              index={index}
              isRenew={isRenew}
              item={item}
              key={index}
              onPress={(): void => {
                dispatch(Actions.storeSubscription(item));
              }}
            />
          ) : (
            <SkeletonPlaceholder key={index}>
              <View style={CommonStyles.skeletonSubscriptionCardContainer} />
            </SkeletonPlaceholder>
          );
        }}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderButtons = (): React.JSX.Element => {
    const checkForSubscription: boolean =
      Boolean(subscription) &&
      Object.keys({...subscription}).length > Constants.ZERO;

    const renderProceed = (): React.JSX.Element => {
      const handleProceed = (): void => {
        if (checkForSubscription) {
          navigation.navigate(Constants.SUBSCRIBE);
        } else {
          handleToastPopup();
        }
      };

      return !loader ? (
        <View style={Styles.padding(0, RFPercentage(0.9))}>
          <Button
            contentStyle={ButtonStyles.defaultContentStyle}
            labelStyle={ButtonStyles.defaultLabelStyle}
            mode={Constants.B_MODE_ELEVATED}
            onPress={(): void => {
              handleProceed();
            }}
            style={[
              Styles.backgroundColor(colors.primary),
              ButtonStyles.defaultStyle,
            ]}
            textColor={colors.secondary}>
            {Constants.PROCEED}
          </Button>
        </View>
      ) : (
        <SkeletonPlaceholder>
          <View style={CommonStyles.skeletonButtonContainer} />
        </SkeletonPlaceholder>
      );
    };

    const renderRenew = (): React.JSX.Element => {
      const handleRenew = (): void => {
        if (checkForSubscription) {
          setPaymentOptionsVisible(true);
        } else {
          handleToastPopup();
        }
      };

      return !loader ? (
        <View style={Styles.padding(0, RFPercentage(0.9))}>
          <Button
            contentStyle={ButtonStyles.defaultContentStyle}
            labelStyle={ButtonStyles.defaultLabelStyle}
            mode={Constants.B_MODE_ELEVATED}
            onPress={(): void => {
              handleRenew();
            }}
            style={[
              Styles.backgroundColor(colors.primary),
              ButtonStyles.defaultStyle,
            ]}
            textColor={colors.secondary}>
            {Constants.RENEW}
          </Button>
        </View>
      ) : (
        <SkeletonPlaceholder>
          <View style={CommonStyles.skeletonButtonContainer} />
        </SkeletonPlaceholder>
      );
    };

    const handleToastPopup = (): void => {
      const toastPopupData: Interfaces.ToastPopupDataInterface = {
        message: Constants.SUBSCRIPTIONS_SELECTION_ERROR,
        title: Constants.INFO,
        type: StatusCodes.INFO,
      };

      dispatch(Actions.storeToastPopup(toastPopupData));
    };

    const renderCancel = (): React.JSX.Element => {
      return !loader ? (
        <View style={Styles.padding(0, RFPercentage(0.9))}>
          <Button
            contentStyle={ButtonStyles.defaultContentStyle}
            labelStyle={ButtonStyles.defaultLabelStyle}
            mode={Constants.B_MODE_ELEVATED}
            onPress={(): void => {
              handleReduxStatesReset();

              navigation.pop();
            }}
            style={[
              Styles.backgroundColor(Colors.TRANSPARENT),
              Styles.borderColor(colors.surface),
              ButtonStyles.defaultStyle,
              ButtonStyles.outlinedStyle,
            ]}
            textColor={colors.surface}>
            {Constants.CANCEL}
          </Button>
        </View>
      ) : (
        <SkeletonPlaceholder>
          <View style={CommonStyles.skeletonButtonContainer} />
        </SkeletonPlaceholder>
      );
    };

    return (
      <View style={SubscriptionsStyles.buttonsContainer}>
        {isRenew ? renderRenew() : renderProceed()}
        {renderCancel()}
      </View>
    );
  };

  const renderNoSubscripotions = () => {
    return (
      <View style={[Styles.flex(1), CommonStyles.centered]}>
        <Text
          style={Styles.textView(
            RFPercentage(1.6),
            'Roboto-Regular',
            colors.surface,
            RFPercentage(2),
            'center',
          )}>
          {Constants.NO_SUBSCRIPTIONS_FOUND}
        </Text>
      </View>
    );
  };

  const renderPaymentOptions = (): React.JSX.Element => {
    return (
      <PaymentOptions
        visible={paymentOptionsVisible}
        onRequestClose={() => {
          setPaymentOptionsVisible(false);
        }}
      />
    );
  };

  const handleReduxStatesReset = (): void => {
    dispatch(Actions.storeSubscription(null));

    dispatch(Actions.storeUserInfo(null));
  };

  return (
    <Network>
      <View style={Styles.screenContainer(colors.background)}>
        {renderHeader()}
        {checkForSubscriptions ? (
          <>
            <ScrollView
              contentContainerStyle={[
                CommonStyles.defaultFlexGrow,
                SubscriptionsStyles.container,
              ]}
              keyboardShouldPersistTaps={Constants.SCROLL_PERSIST_TAPS_HANDLED}
              refreshControl={
                <RefreshControl
                  enabled={true}
                  onRefresh={(): void => {
                    onRefresh();
                  }}
                  refreshing={refreshing}
                  tintColor={colors.primary}
                />
              }
              showsVerticalScrollIndicator={false}>
              {renderSubscriptions()}
              {renderButtons()}
            </ScrollView>
            {renderPaymentOptions()}
          </>
        ) : (
          renderNoSubscripotions()
        )}
      </View>
    </Network>
  );
};

export default Subscriptions;
