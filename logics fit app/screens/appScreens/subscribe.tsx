import React, {FC, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {Appbar, Button, Chip, MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import * as Assets from '../../assets';
import Counter from '../../common/components/counter';
import CounterInput from '../../common/components/counterInput';
import Network from '../../common/components/network';
import PaymentOptions from '../../common/components/paymentOptions';
import SkeletonPlaceholder from '../../common/components/skeletonPlaceholder';
import SubscriptionCard from '../../common/components/subscriptionCard';
import * as Styles from '../../common/styles';
import * as Colors from '../../common/utils/colors';
import * as Constants from '../../common/utils/constants';
import * as Functions from '../../common/utils/functions';
import * as Interfaces from '../../configs/ts/interfaces';
import * as Actions from '../../redux/rootAction';
import SubscribeStyles from '../../styles/appStyles/subscribe';

const Subscribe: FC = (props: any) => {
  // Props Variables
  const {navigation} = props;

  // UseState Variables
  const [isError, setIsError] = useState<boolean>(false);
  const [paymentOptionsVisible, setPaymentOptionsVisible] =
    useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Other Variables
  const dispatch: any = useDispatch();
  const appReduxStates: Interfaces.AppReducerStateInterface = useSelector(
    (state: Interfaces.RootReducersStateInterface) => state.app,
  );
  const {colors}: MD3Theme = useTheme();
  const {AppBarStyles, ButtonStyles, CommonStyles} = Styles;
  const POSSIBLE_ZERO_INPUTS: string[] = [
    Constants.ZERO.toString(),
    Constants.TWO_ZERO,
    Constants.THREE_ZERO,
    Constants.FOUR_ZERO,
  ];
  const subscription: null | Interfaces.SubscriptionCardDataInterface =
    appReduxStates.subscription;
  const checkForSubscription: boolean =
    Boolean(subscription) &&
    Object.keys({...subscription}).length > Constants.ZERO;
  const user: null | Interfaces.UserInterface = appReduxStates.user;
  const userInfo: null | Interfaces.UserInfoInterface = appReduxStates.userInfo;
  const birthOfDateDD: string = userInfo?.birthOfDateDD ?? '';
  const birthOfDateMM: string = userInfo?.birthOfDateMM ?? '';
  const birthOfDateYYYY: string = userInfo?.birthOfDateYYYY ?? '';
  const checkForBirthOfDateEmpty: boolean =
    !birthOfDateDD && !birthOfDateMM && !birthOfDateYYYY && isError;
  const checkForValidDD: boolean =
    Boolean(birthOfDateDD) &&
    !POSSIBLE_ZERO_INPUTS.includes(birthOfDateDD) &&
    Number(birthOfDateDD) < Constants.THIRTY_TWO;
  const checkForValidMM: boolean =
    Boolean(birthOfDateMM) &&
    !POSSIBLE_ZERO_INPUTS.includes(birthOfDateMM) &&
    Number(birthOfDateMM) < Constants.THIRTEEN;
  const checkForValidYYYY: boolean =
    Boolean(birthOfDateYYYY) &&
    !POSSIBLE_ZERO_INPUTS.includes(birthOfDateYYYY) &&
    birthOfDateYYYY?.length == Constants.FOUR;
  let checkForValidBirthOfDate: boolean =
    !birthOfDateDD && !birthOfDateMM && !birthOfDateYYYY
      ? false
      : !checkForValidDD ||
        !checkForValidMM ||
        !checkForValidYYYY ||
        Functions.handleDobValidation(
          `${birthOfDateDD}/${birthOfDateMM}/${birthOfDateYYYY}`,
        );
  const checkForBirthOfDateError: boolean =
    checkForBirthOfDateEmpty || checkForValidBirthOfDate;
  const gender: string = userInfo?.gender ?? '';
  const height: string = userInfo?.height ?? '';
  const checkForHeightEmpty: boolean = !height && isError;
  const checkForValidHeight: boolean = !POSSIBLE_ZERO_INPUTS.includes(height);
  const checkForHeightError: boolean =
    checkForHeightEmpty || !checkForValidHeight;
  const loader: boolean = refreshing;
  const weight: string = userInfo?.weight ?? '';
  const checkForWeightEmpty: boolean = !weight && isError;
  const checkForValidWeight: boolean = !POSSIBLE_ZERO_INPUTS.includes(weight);
  const checkForWeightError: boolean =
    checkForWeightEmpty || !checkForValidWeight;

  // Functions
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
          title={Constants.SUBSCRIBE}
        />
      </Appbar.Header>
    );
  };

  const onRefresh = (): void => {
    setRefreshing(true);

    setTimeout((): void => {
      dispatch(Actions.storeUserInfo(null));

      setRefreshing(false);
    }, Constants.SET_TIMEOUT_2500);
  };

  const renderSubscription = (): React.JSX.Element => {
    return !loader ? (
      <SubscriptionCard
        checked={true}
        index={Constants.ZERO}
        isRenew={false}
        item={subscription}
      />
    ) : (
      <SkeletonPlaceholder>
        <View style={CommonStyles.skeletonSubscriptionCardContainer} />
      </SkeletonPlaceholder>
    );
  };

  const renderUserInfo = () => {
    const defaultPlaceholder: string = `${Constants.ZERO}${Constants.ZERO}${Constants.ZERO}`;

    const renderHeight = (): React.JSX.Element => {
      return (
        <>
          <Counter
            customContainerStyle={Styles.borderColor(
              checkForHeightError ? colors.error : colors.surface,
            )}
            iconColor={colors.primary}
            keyboardType={Constants.TI_KT_NUMBER_PAD}
            label={Constants.HEIGHT_UPDATE}
            maxLength={Constants.THREE}
            onChangeText={(txt: string) => {
              handleUserInfo(txt, Constants.HEIGHT_UPDATE);
            }}
            placeholder={defaultPlaceholder}
            placeholderColor={colors.onSurface}
            unit={`${Constants.HEIGHT_BY} (${Constants.CM_UNIT})`}
            value={height}
          />
          {checkForHeightEmpty && (
            <Text
              style={Styles.textView(
                RFPercentage(1.4),
                'Roboto-Regular',
                colors.error,
                RFPercentage(2),
                'center',
              )}>
              {Constants.HEIGHT_ERROR}
            </Text>
          )}
          {!checkForValidHeight && (
            <View style={Styles.padding(RFPercentage(2.5), 0)}>
              <Text
                style={Styles.textView(
                  RFPercentage(1.4),
                  'Roboto-Regular',
                  colors.error,
                  RFPercentage(2),
                  'center',
                )}>
                {Constants.HEIGHT_INVALID_ERROR}
              </Text>
            </View>
          )}
        </>
      );
    };

    const renderWeight = (): React.JSX.Element => {
      return (
        <>
          <Counter
            customContainerStyle={Styles.borderColor(
              checkForWeightError ? colors.error : colors.surface,
            )}
            iconColor={colors.primary}
            keyboardType={Constants.TI_KT_NUMBER_PAD}
            label={Constants.WEIGHT_UPDATE}
            maxLength={Constants.THREE}
            onChangeText={(txt: string) => {
              handleUserInfo(txt, Constants.WEIGHT_UPDATE);
            }}
            placeholder={defaultPlaceholder}
            placeholderColor={colors.onSurface}
            unit={`${Constants.WEIGHT_BY} (${Constants.KG_UNIT})`}
            value={weight}
          />
          {checkForWeightEmpty && (
            <Text
              style={Styles.textView(
                RFPercentage(1.4),
                'Roboto-Regular',
                colors.error,
                RFPercentage(2),
                'center',
              )}>
              {Constants.WEIGHT_ERROR}
            </Text>
          )}
          {!checkForValidWeight && (
            <View style={Styles.padding(RFPercentage(2.5), 0)}>
              <Text
                style={Styles.textView(
                  RFPercentage(1.4),
                  'Roboto-Regular',
                  colors.error,
                  RFPercentage(2),
                  'center',
                )}>
                {Constants.WEIGHT_INVALID_ERROR}
              </Text>
            </View>
          )}
        </>
      );
    };

    const renderBirthOfDate = (): React.JSX.Element => {
      return (
        <>
          <View style={Styles.padding(0, RFPercentage(1.5))}>
            <Text
              style={Styles.textView(
                RFPercentage(1.6),
                'Roboto-Bold',
                colors.surface,
                RFPercentage(1.875),
              )}>
              {Constants.BIRTH_OF_DATE}
            </Text>
            <View style={SubscribeStyles.sectionSubContainer}>
              <CounterInput
                customContainerStyle={[
                  Styles.borderColor(
                    checkForBirthOfDateError ? colors.error : colors.surface,
                  ),
                ]}
                keyboardType={Constants.TI_KT_NUMBER_PAD}
                maxLength={Constants.TWO}
                onChangeText={(txt: string) => {
                  handleUserInfo(txt, Constants.DD);
                }}
                placeholder={Constants.DD}
                placeholderColor={colors.onSurface}
                value={birthOfDateDD}
              />
              <CounterInput
                customContainerStyle={[
                  Styles.borderColor(
                    checkForBirthOfDateError ? colors.error : colors.surface,
                  ),
                ]}
                keyboardType={Constants.TI_KT_NUMBER_PAD}
                maxLength={Constants.TWO}
                onChangeText={(txt: string) => {
                  handleUserInfo(txt, Constants.MM);
                }}
                placeholder={Constants.MM}
                placeholderColor={colors.onSurface}
                value={birthOfDateMM}
              />
              <CounterInput
                customContainerStyle={[
                  Styles.borderColor(
                    checkForBirthOfDateError ? colors.error : colors.surface,
                  ),
                ]}
                keyboardType={Constants.TI_KT_NUMBER_PAD}
                maxLength={Constants.FOUR}
                onChangeText={(txt: string) => {
                  handleUserInfo(txt, Constants.YYYY);
                }}
                placeholder={Constants.YYYY}
                placeholderColor={colors.onSurface}
                value={birthOfDateYYYY}
              />
            </View>
          </View>
          {checkForBirthOfDateEmpty && (
            <Text
              style={Styles.textView(
                RFPercentage(1.4),
                'Roboto-Regular',
                colors.error,
                RFPercentage(2),
                'center',
              )}>
              {Constants.BIRTH_OF_DATE_ERROR}
            </Text>
          )}
          {checkForValidBirthOfDate && (
            <View style={Styles.padding(RFPercentage(2.5), 0)}>
              <Text
                style={Styles.textView(
                  RFPercentage(1.4),
                  'Roboto-Regular',
                  colors.error,
                  RFPercentage(2),
                  'center',
                )}>
                {Constants.BIRTH_OF_DATE_INVAILD_ERROR}
              </Text>
            </View>
          )}
        </>
      );
    };

    const renderGender = (): React.JSX.Element => {
      const checkForGenderEmpty: boolean = !gender && isError;

      const renderMale = () => {
        const selected: boolean = gender == Constants.MALE;

        return (
          <Chip
            icon={() => renderIcon(Assets.MALE, selected)}
            mode={
              selected ? Constants.CH_MODE_FLAT : Constants.CH_MODE_OUTLINED
            }
            onPress={(): void => {
              handleUserInfo(Constants.MALE, Constants.GENDER);
            }}
            selected={selected}
            style={[
              Styles.backgroundColor(
                selected ? colors.primary : colors.surface,
              ),
              Styles.borderColor(selected ? colors.primary : colors.surface),
              SubscribeStyles.genderContainer,
            ]}
            textStyle={Styles.textView(
              RFPercentage(1.8),
              'Roboto-Bold',
              selected ? colors.surface : colors.onSurface,
              RFPercentage(2.109),
              'center',
            )}>
            {Constants.MALE}
          </Chip>
        );
      };

      const renderFemale = (): React.JSX.Element => {
        const selected: boolean = gender == Constants.FEMALE;

        return (
          <Chip
            icon={() => renderIcon(Assets.FEMALE, selected)}
            mode={Constants.CH_MODE_OUTLINED}
            onPress={(): void => {
              handleUserInfo(Constants.FEMALE, Constants.GENDER);
            }}
            selected={selected}
            style={[
              Styles.backgroundColor(
                selected ? colors.primary : colors.surface,
              ),
              Styles.borderColor(selected ? colors.primary : colors.surface),
              SubscribeStyles.genderContainer,
              Styles.marginHorizontal(RFPercentage(2), 0),
            ]}
            textStyle={Styles.textView(
              RFPercentage(1.8),
              'Roboto-Bold',
              selected ? colors.surface : colors.onSurface,
              RFPercentage(2.109),
              'center',
            )}>
            {Constants.FEMALE}
          </Chip>
        );
      };

      const renderIcon = (
        source: ImageSourcePropType,
        status: boolean,
      ): React.ReactNode => {
        return (
          <Image
            resizeMode={Constants.CONTAIN}
            source={source}
            style={Styles.imageView(RFPercentage(2), RFPercentage(2))}
            tintColor={status ? colors.surface : colors.onSurface}
          />
        );
      };

      return (
        <>
          <View style={Styles.padding(0, RFPercentage(1.5))}>
            <Text
              style={Styles.textView(
                RFPercentage(1.6),
                'Roboto-Bold',
                colors.surface,
                RFPercentage(1.875),
              )}>
              {Constants.GENDER}
            </Text>
            <View style={SubscribeStyles.sectionSubContainer}>
              {renderMale()}
              {renderFemale()}
            </View>
          </View>
          {checkForGenderEmpty && (
            <Text
              style={Styles.textView(
                RFPercentage(1.4),
                'Roboto-Regular',
                colors.error,
                RFPercentage(2),
                'center',
              )}>
              {Constants.GENDER_ERROR}
            </Text>
          )}
        </>
      );
    };

    const handleUserInfo = (value: string, action: string): void => {
      let updatedUserInfo: Interfaces.UserInfoInterface = userInfo
        ? userInfo
        : {
            birthOfDateDD: '',
            birthOfDateMM: '',
            birthOfDateYYYY: '',
            gender: '',
            height: '',
            weight: '',
          };

      switch (action) {
        case Constants.DD:
          updatedUserInfo = {...updatedUserInfo, birthOfDateDD: value};
          break;

        case Constants.GENDER:
          updatedUserInfo = {...updatedUserInfo, gender: value};
          break;

        case Constants.HEIGHT_UPDATE:
          updatedUserInfo = {...updatedUserInfo, height: value};
          break;

        case Constants.MM:
          updatedUserInfo = {...updatedUserInfo, birthOfDateMM: value};
          break;

        case Constants.WEIGHT_UPDATE:
          updatedUserInfo = {...updatedUserInfo, weight: value};
          break;

        case Constants.YYYY:
          updatedUserInfo = {...updatedUserInfo, birthOfDateYYYY: value};
          break;

        default:
          break;
      }

      dispatch(Actions.storeUserInfo(updatedUserInfo));
    };

    return !loader ? (
      <View style={SubscribeStyles.userInfoContainer}>
        {renderHeight()}
        {renderWeight()}
        {renderBirthOfDate()}
        {renderGender()}
      </View>
    ) : (
      <SkeletonPlaceholder>
        <View style={SubscribeStyles.skeletonUserInfoContainer} />
      </SkeletonPlaceholder>
    );
  };

  const renderButtons = (): React.JSX.Element => {
    const renderSubscribeAndPay = (): React.JSX.Element => {
      const handleSubscribeAndPay = (): void => {
        Keyboard.dismiss();

        const checkForBirthOfDate: boolean = !checkForValidBirthOfDate;

        const checkForGender: boolean = Boolean(gender);

        const checkForHeight: boolean = Boolean(height) && checkForValidHeight;

        const checkForWeight: boolean = Boolean(weight) && checkForValidWeight;

        if (
          checkForBirthOfDate &&
          checkForGender &&
          checkForHeight &&
          checkForWeight
        ) {
          setIsError(false);

          setPaymentOptionsVisible(true);
        } else {
          setIsError(true);
        }
      };

      return !loader ? (
        <View style={Styles.padding(0, RFPercentage(0.9))}>
          <Button
            contentStyle={ButtonStyles.defaultContentStyle}
            labelStyle={ButtonStyles.defaultLabelStyle}
            mode={Constants.B_MODE_ELEVATED}
            onPress={(): void => {
              handleSubscribeAndPay();
            }}
            style={[
              Styles.backgroundColor(colors.primary),
              ButtonStyles.defaultStyle,
            ]}
            textColor={colors.secondary}>
            {Constants.SUBSCRIBE_AND_PAY}
          </Button>
        </View>
      ) : (
        <SkeletonPlaceholder>
          <View style={CommonStyles.skeletonButtonContainer} />
        </SkeletonPlaceholder>
      );
    };

    const renderCancel = (): React.JSX.Element => {
      const handleCancel = (): void => {
        Keyboard.dismiss();

        handleReduxStatesReset();

        navigation.pop(Constants.TWO);
      };

      return !loader ? (
        <View style={Styles.padding(0, RFPercentage(0.9))}>
          <Button
            contentStyle={ButtonStyles.defaultContentStyle}
            labelStyle={ButtonStyles.defaultLabelStyle}
            mode={Constants.B_MODE_ELEVATED}
            onPress={(): void => {
              handleCancel();
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
      <View style={SubscribeStyles.buttonsContainer}>
        {renderSubscribeAndPay()}
        {renderCancel()}
      </View>
    );
  };

  const handleReduxStatesReset = (): void => {
    dispatch(Actions.storeSubscription(null));

    dispatch(Actions.storeUserInfo(null));
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

  return (
    <Network>
      <View style={Styles.screenContainer(colors.background)}>
        {renderHeader()}
        <KeyboardAvoidingView
          behavior={
            Platform.OS == Constants.IOS
              ? Constants.KAV_BEHAVIOUR_PADDING
              : Constants.KAV_BEHAVIOUR_HEIGHT
          }
          keyboardVerticalOffset={
            Platform.OS == Constants.IOS ? -RFPercentage(10) : Constants.ZERO
          }
          style={CommonStyles.defaultFlex}>
          <ScrollView
            contentContainerStyle={[
              CommonStyles.defaultFlexGrow,
              SubscribeStyles.container,
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
            {checkForSubscription && renderSubscription()}
            {renderUserInfo()}
            {renderButtons()}
          </ScrollView>
        </KeyboardAvoidingView>
        {renderPaymentOptions()}
      </View>
    </Network>
  );
};

export default Subscribe;
