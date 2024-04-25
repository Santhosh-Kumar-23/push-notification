import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useState} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  MD3Theme,
  useTheme,
} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import ENV from '../../../env';
import Network from '../../common/components/network';
import NotificationCard from '../../common/components/notificationCard';
import SkeletonPlaceholder from '../../common/components/skeletonPlaceholder';
import * as Styles from '../../common/styles';
import * as Constants from '../../common/utils/constants';
import * as Functions from '../../common/utils/functions';
import * as Enums from '../../configs/ts/enums';
import * as Interfaces from '../../configs/ts/interfaces';
import * as Actions from '../../redux/rootAction';
import NotificationStyles from '../../styles/appStyles/notifications';

const Notifications: FC = (props: any) => {
  // Props Variables
  const {navigation} = props;

  // UseState Variables
  const [isEndLoading, setIsEndLoading] = useState<boolean>(false);
  const [newNotifications, setNewNotifications] = useState<
    Interfaces.NotificationCardDataInterface[]
  >([]);
  const [readNotifications, setReadNotifications] = useState<
    Interfaces.NotificationCardDataInterface[]
  >([]);
  const [pageIndex, setPageIndex] = useState<number>(Constants.ONE);
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
  const {AppBarStyles, CommonStyles} = Styles;
  const checkForNewNotifications: boolean =
    Array.isArray(newNotifications) && newNotifications.length > Constants.ZERO;
  const checkForReadNotifications: boolean =
    Array.isArray(readNotifications) &&
    readNotifications.length > Constants.ZERO;
  const fetchingStatus: boolean = otherReduxStates.fetchingStatus;
  const notifications: Interfaces.NotificationCardDataInterface[] =
    appReduxStates.notifications.notifications;
  const checkForNotifications: boolean =
    Array.isArray(notifications) && notifications.length > Constants.ZERO;
  const pageSize: number = Constants.TEN;
  const totalNotifications: number = appReduxStates.notifications.totalRecords;
  const totalPages: number = Math.ceil(totalNotifications / pageSize);
  const user: null | Interfaces.UserInterface = appReduxStates.user;
  const userId: number = user?.id ?? Constants.ZERO;
  const loader: boolean =
    (fetchingStatus && !checkForNotifications) || refreshing;

  // Hooks Functions
  useFocusEffect(
    useCallback(() => {
      let isFocus: boolean = true;

      handleNotificationsAPI();

      return (): void => {
        isFocus = false;
      };
    }, [pageIndex]),
  );

  useFocusEffect(
    useCallback(() => {
      let isFocus: boolean = true;

      filterNotifications();

      return (): void => {
        isFocus = false;
      };
    }, [notifications]),
  );

  // Functions
  const handleNotificationsAPI = (): void => {
    const requestData: Interfaces.NotificationsRequestInterface = {
      pageIndex,
      pageSize,
      user_id: userId,
    };

    ENV.currentEnvironment == Constants.DEVELOPMENT &&
      console.log('GET NOTIFICATIONS REQUEST DATA::: ', requestData);

    dispatch(
      Actions.getNotifications(
        requestData,
        (response: Interfaces.APIResponseInterface): void => {
          let responseData: Interfaces.NotificationsResponseInterface =
            response.data;

          const responseType: number = response.type;

          switch (responseType) {
            case StatusCodes.SUCCESS:
              const newNotifications: Interfaces.NotificationCardDataInterface[] =
                responseData.notifications;

              responseData = {
                ...responseData,
                notifications:
                  pageIndex != Constants.ONE
                    ? [...notifications, ...newNotifications]
                    : newNotifications,
              };

              dispatch(Actions.storeNotifications(responseData));
              break;

            default:
              break;
          }

          setRefreshing(false);
        },
      ),
    );
  };

  const filterNotifications = (): void => {
    const newNotifications: Interfaces.NotificationCardDataInterface[] =
      notifications.filter(
        (notificationData: Interfaces.NotificationCardDataInterface) =>
          Boolean(notificationData.isNew),
      );

    setNewNotifications(newNotifications);

    const readNotifications: Interfaces.NotificationCardDataInterface[] =
      notifications.filter(
        (notificationData: Interfaces.NotificationCardDataInterface) =>
          !Boolean(notificationData.isNew),
      );

    setReadNotifications(readNotifications);
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
          title={Constants.NOTIFICATIONS}
        />
      </Appbar.Header>
    );
  };

  const handleScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ): void => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;

    const paddingToBottom: number = Constants.TWENTY;

    const isEndReached: boolean =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;

    const upadtedPageIndex: number = pageIndex + Constants.ONE;

    const checkForUpadtedPageIndex: boolean = upadtedPageIndex <= totalPages;

    const checkForLoadMore: boolean =
      !isEndLoading && isEndReached && checkForUpadtedPageIndex;

    if (checkForLoadMore) {
      setIsEndLoading(true);

      setPageIndex(upadtedPageIndex);
    } else {
      setIsEndLoading(false);
    }
  };

  const onRefresh = (): void => {
    const checkForPageIndex: boolean = pageIndex != Constants.ONE;

    if (checkForPageIndex) {
      setPageIndex(Constants.ONE);

      setRefreshing(true);
    }
  };

  const renderNew = (): React.JSX.Element => {
    return (
      <>
        <View style={NotificationStyles.sectionLabelContainer}>
          <View style={NotificationStyles.sectionLabelSubContainerI}>
            <Text
              style={Styles.textView(
                RFPercentage(1.6),
                'Roboto-Bold',
                colors.surface,
                RFPercentage(1.875),
              )}>
              {Constants.NEW}
            </Text>
          </View>
          <View style={NotificationStyles.sectionLabelSubContainerII}>
            <Text
              style={Styles.textView(
                RFPercentage(1.4),
                'Roboto-Regular',
                colors.primary,
                RFPercentage(1.641),
                'right',
              )}>
              {Constants.MARK_ALL_AS_READ}
            </Text>
          </View>
        </View>
        {renderNotifications(newNotifications)}
      </>
    );
  };

  const renderRead = (): React.JSX.Element => {
    return (
      <View style={Styles.marginVertical(0, RFPercentage(2))}>
        <View style={NotificationStyles.sectionLabelContainer}>
          <View style={NotificationStyles.sectionLabelSubContainerI}>
            <Text
              style={Styles.textView(
                RFPercentage(1.8),
                'Roboto-Bold',
                colors.surface,
                RFPercentage(2.109),
              )}>
              {Constants.READ}
            </Text>
          </View>
          <View style={NotificationStyles.sectionLabelSubContainerII}>
            <Text
              style={Styles.textView(
                RFPercentage(1.4),
                'Roboto-Regular',
                colors.primary,
                RFPercentage(1.641),
                'right',
              )}>
              {Constants.CLEAR_ALL}
            </Text>
          </View>
        </View>
        {renderNotifications(readNotifications)}
      </View>
    );
  };

  const renderNotifications = (
    notifications: Interfaces.NotificationCardDataInterface[],
  ): React.JSX.Element => {
    return (
      <View style={Styles.margin(0, RFPercentage(1.6))}>
        {notifications.flatMap(
          (
            item: Interfaces.NotificationCardDataInterface,
            index: number,
          ): any => {
            return !loader ? (
              <NotificationCard
                index={index}
                item={item}
                key={index}
                onPress={(): void => {
                  Functions.handleNotificationRedirections(item);
                }}
              />
            ) : (
              renderNotificationCardSkeleton()
            );
          },
        )}
      </View>
    );
  };

  const renderNoNotifications = () => {
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
          {Constants.NO_NOTIFICATIONS_FOUND}
        </Text>
      </View>
    );
  };

  const renderNotificationCardSkeleton = (): React.JSX.Element => {
    return (
      <SkeletonPlaceholder>
        <View style={NotificationStyles.skeletonNotificationCardConatiner} />
      </SkeletonPlaceholder>
    );
  };

  return (
    <Network>
      <View style={Styles.screenContainer(colors.background)}>
        {renderHeader()}
        <ScrollView
          contentContainerStyle={[
            CommonStyles.defaultFlexGrow,
            NotificationStyles.container,
          ]}
          keyboardShouldPersistTaps={Constants.SCROLL_PERSIST_TAPS_HANDLED}
          onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>): void => {
            handleScroll(event);
          }}
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
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}>
          {!loader ? (
            checkForNotifications ? (
              <>
                {checkForNewNotifications && renderNew()}
                {checkForReadNotifications && renderRead()}
                {isEndLoading && (
                  <View style={Styles.padding(0, RFPercentage(1))}>
                    <ActivityIndicator />
                  </View>
                )}
              </>
            ) : (
              renderNoNotifications()
            )
          ) : (
            <>
              {renderNotificationCardSkeleton()}
              {renderNotificationCardSkeleton()}
              {renderNotificationCardSkeleton()}
              {renderNotificationCardSkeleton()}
              {renderNotificationCardSkeleton()}
              {renderNotificationCardSkeleton()}
              {renderNotificationCardSkeleton()}
              {renderNotificationCardSkeleton()}
              {renderNotificationCardSkeleton()}
              {renderNotificationCardSkeleton()}
            </>
          )}
        </ScrollView>
      </View>
    </Network>
  );
};

export default Notifications;
