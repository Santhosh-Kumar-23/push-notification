import {CommonActions, useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  Linking,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {BiometryType} from 'react-native-biometrics';
import {
  ActivityIndicator,
  Appbar,
  Button,
  Dialog,
  Divider,
  MD3Theme,
  Portal,
  Switch,
  ToggleButton,
  useTheme,
} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import ENV from '../../../env';
import * as Assets from '../../assets';
import Dp from '../../common/components/dp';
import Network from '../../common/components/network';
import SkeletonPlaceholder from '../../common/components/skeletonPlaceholder';
import SubscribeNow from '../../common/components/subscribeNow';
import SubscriptionCard from '../../common/components/subscriptionCard';
import useAppNotificationPermission from '../../common/hooks/appNotificationPermission';
import useBiometrics from '../../common/hooks/biomertics';
import * as Styles from '../../common/styles';
import * as Colors from '../../common/utils/colors';
import * as Constants from '../../common/utils/constants';
import * as Functions from '../../common/utils/functions';
import * as Enums from '../../configs/ts/enums';
import * as Interfaces from '../../configs/ts/interfaces';
import * as Actions from '../../redux/rootAction';
import ProfileStyles from '../../styles/appStyles/profile';

const Profile: FC = (props: any) => {
  // Props Variables
  const {navigation} = props;

  // UseState Variables
  const [fetchFor, setFetchFor] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [signOutVisible, setSignOutVisible] = useState<boolean>(false);

  // Other Variables
  const biometrics: Interfaces.BiometricsDetailsInterface = useBiometrics();
  const dispatch: any = useDispatch();
  const appNotificationPermission: boolean = useAppNotificationPermission();
  const appReduxStates: Interfaces.AppReducerStateInterface = useSelector(
    (state: Interfaces.RootReducersStateInterface) => state.app,
  );
  const otherReduxStates: Interfaces.OtherReducerStateInterface = useSelector(
    (state: Interfaces.RootReducersStateInterface) => state.other,
  );
  const {colors}: MD3Theme = useTheme();
  const {StatusCodes} = Enums;
  const {AppBarStyles, ButtonStyles, CommonStyles} = Styles;
  const biometricAvailable: boolean = biometrics.available;
  const biometricType: BiometryType =
    biometrics.biometryType ??
    (Platform.OS == Constants.IOS
      ? Constants.BIO_FACEID
      : Constants.BIO_BIOMETRICS);
  const fetchingStatus: boolean = otherReduxStates.fetchingStatus;
  const subscriptions: Interfaces.SubscriptionCardDataInterface[] =
    appReduxStates.subscriptions;
  const checkForSubscriptions: boolean =
    Array.isArray(subscriptions) && subscriptions.length > Constants.ZERO;
  const user: null | Interfaces.UserInterface = appReduxStates.user;
  const loader: boolean =
    (fetchingStatus && !checkForSubscriptions) || refreshing;

  // Hooks Functions
  useFocusEffect(
    useCallback(() => {
      let isFocus: boolean = true;

      handleSubscriptionDetailsAPI();

      return (): void => {
        isFocus = false;
      };
    }, []),
  );

  // Functions
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
          title={Constants.MY_ACCOUNT}
        />
      </Appbar.Header>
    );
  };

  const onRefresh = (): void => {
    setRefreshing(true);

    handleSubscriptionDetailsAPI();
  };

  const renderDP = (): React.JSX.Element => {
    const dp: string = user?.user_image ?? '';

    const loader: boolean =
      (fetchingStatus && fetchFor == Constants.DP) || refreshing;

    const name: string = user?.name ?? '';

    const userId: number = user?.id ?? Constants.ZERO;

    const handleImageUploadAPI = (
      fileData: Interfaces.FileDataInterface,
    ): void => {
      let requestData: FormData = new FormData();

      requestData.append('file', fileData);

      requestData.append('user_id', userId);

      dispatch(
        Actions.imageUpload(
          requestData,
          (response: Interfaces.APIResponseInterface): void => {
            const responseData: Interfaces.UpdateBiometricsInfoResponseInterface =
              response.data;

            const responseType: number = response.type;

            switch (responseType) {
              case StatusCodes.SUCCESS:
                const user: Interfaces.UserInterface = responseData.user_data;

                dispatch(Actions.storeUser(user));
                break;

              default:
                break;
            }

            setFetchFor('');
          },
        ),
      );
    };

    return !loader ? (
      <Dp
        dp={dp}
        isUpload={true}
        label={name}
        onUpload={(fileData: Interfaces.FileDataInterface) => {
          setFetchFor(Constants.DP);

          ENV.currentEnvironment == Constants.DEVELOPMENT &&
            console.log('DP FILE DATA::: ', fileData);

          handleImageUploadAPI(fileData);
        }}
        size={RFPercentage(8.8)}
      />
    ) : (
      <SkeletonPlaceholder>
        <View style={ProfileStyles.skeletonDPContainer} />
      </SkeletonPlaceholder>
    );
  };

  const renderNameEmail = (): React.JSX.Element => {
    const email: string = user?.email ?? '';

    const name: string = user?.name ?? '';

    return !loader ? (
      <View style={Styles.paddingVertical(RFPercentage(1), RFPercentage(2))}>
        <Text
          style={Styles.textView(
            RFPercentage(2.2),
            'Roboto-Regular',
            colors.surface,
            RFPercentage(2.8),
            'center',
          )}>
          {name}
        </Text>
        <Text
          style={Styles.textView(
            RFPercentage(1.2),
            'Roboto-Regular',
            colors.surface,
            RFPercentage(2.8),
            'center',
          )}>
          {email}
        </Text>
      </View>
    ) : (
      <SkeletonPlaceholder>
        <View style={Styles.marginVertical(RFPercentage(1), RFPercentage(2))}>
          <View style={ProfileStyles.skeletonNameContainer} />
          <View style={ProfileStyles.skeletonEmailContainer} />
        </View>
      </SkeletonPlaceholder>
    );
  };

  const renderEditMyProfile = (): React.JSX.Element => {
    return !loader ? (
      <Pressable
        onPress={(): void => {
          navigation.navigate(Constants.PROFILE_UPDATE);
        }}
        style={Styles.padding(0, RFPercentage(0.5))}>
        <Text
          style={Styles.textView(
            RFPercentage(1.2),
            'Roboto-Regular',
            colors.primary,
            RFPercentage(2.8),
            'center',
          )}>
          {Constants.EDIT_MY_PROFILE}
        </Text>
      </Pressable>
    ) : (
      <SkeletonPlaceholder>
        <View style={ProfileStyles.skeletonEditMyProfileContainer} />
      </SkeletonPlaceholder>
    );
  };

  const renderBodyInfo = (): React.JSX.Element => {
    const age: number = user?.age ?? Constants.ZERO;

    const height: number = user?.height ?? Constants.ZERO;

    const heightUnit: string = user?.height_unit ?? Constants.CM_UNIT;

    const weight: number = user?.weight ?? Constants.ZERO;

    const weightUnit: string = user?.weight_unit ?? Constants.KG_UNIT;

    const renderItem = (
      label: string,
      value: number | string,
      unit: null | string = null,
      showDivider: boolean = false,
    ): React.JSX.Element => {
      return (
        <>
          <View style={[Styles.flex(0.33), CommonStyles.centered]}>
            <Text
              style={Styles.textView(
                RFPercentage(1.6),
                'Roboto-Bold',
                colors.primary,
                RFPercentage(1.875),
                'center',
              )}>
              {value || '-'} {unit}
            </Text>
            <Text
              style={[
                Styles.textView(
                  RFPercentage(1),
                  'Roboto-Regular',
                  colors.surface,
                  RFPercentage(1.172),
                  'center',
                ),
                Styles.paddingVertical(0, RFPercentage(0.5)),
              ]}>
              {label}
            </Text>
          </View>
          {showDivider && renderDivider(true)}
        </>
      );
    };

    return !loader ? (
      <View style={ProfileStyles.bodyInfoContainer}>
        {renderItem(
          Constants.HEIGHT,
          Functions.convertUnit(height, heightUnit),
          heightUnit,
          true,
        )}
        {renderItem(
          Constants.WEIGHT,
          Functions.convertUnit(weight, weightUnit),
          weightUnit,
          true,
        )}
        {renderItem(Constants.AGE, age)}
      </View>
    ) : (
      <SkeletonPlaceholder>
        <View style={ProfileStyles.skeletonBodyInfoContainer} />
      </SkeletonPlaceholder>
    );
  };

  const renderSubscription = (): React.JSX.Element => {
    const subscription: null | Interfaces.SubscriptionCardDataInterface =
      user?.subscription ?? null;

    const checkForSubscription: boolean =
      Boolean(subscription) &&
      Object.keys({...subscription}).length > Constants.ZERO;

    return checkForSubscription ? (
      !loader ? (
        <SubscriptionCard
          checked={false}
          index={Constants.ZERO}
          isRenew={false}
          item={subscription}
        />
      ) : (
        <SkeletonPlaceholder>
          <View style={CommonStyles.skeletonSubscriptionCardContainer} />
        </SkeletonPlaceholder>
      )
    ) : (
      <SubscribeNow
        loading={loader}
        navigation={navigation}
        subscriptions={subscriptions}
      />
    );
  };

  const renderSettings = (): React.JSX.Element => {
    const checkForBiometricsFaceId: boolean =
      Platform.OS == Constants.IOS &&
      biometricAvailable &&
      biometricType == Constants.BIO_FACEID;

    const checkForBiometricsTouchId: boolean =
      biometricAvailable &&
      (biometricType == Constants.BIO_BIOMETRICS ||
        biometricType == Constants.BIO_TOUCHID);

    const skeletonStyle: StyleProp<ViewStyle> =
      checkForBiometricsFaceId && checkForBiometricsTouchId
        ? ProfileStyles.skeletonSettingsContainerI
        : checkForBiometricsFaceId || checkForBiometricsTouchId
        ? ProfileStyles.skeletonSettingsContainerII
        : ProfileStyles.skeletonSettingsContainerIII;

    const userId: number = user?.id ?? Constants.ZERO;

    const renderFaceId = (): React.JSX.Element => {
      const faceId: boolean = user?.face_id ?? false;

      const loader: boolean = fetchingStatus && fetchFor == Constants.FACE_ID;

      const handleFaceId = (value: boolean): void => {
        setFetchFor(Constants.FACE_ID);

        handleBiometricsAPI(value, Constants.KEY_FACE_ID, biometricType);
      };

      return (
        <Pressable
          onPress={() => {
            handleFaceId(!faceId);
          }}
          style={ProfileStyles.settingsItemContainer}>
          {renderIconLabel(Assets.FACE_ID, Constants.FACE_ID)}
          {loader
            ? renderActivityIndicator()
            : renderSwitch(faceId, (value: boolean): void => {
                handleFaceId(value);
              })}
        </Pressable>
      );
    };

    const renderTouchId = (): React.JSX.Element => {
      const loader: boolean = fetchingStatus && fetchFor == Constants.TOUCH_ID;

      const touchId: boolean = user?.touch_id ?? false;

      const handleTouchId = (value: boolean): void => {
        setFetchFor(Constants.TOUCH_ID);

        handleBiometricsAPI(value, Constants.KEY_TOUCH_ID, biometricType);
      };

      return (
        <Pressable
          onPress={() => {
            handleTouchId(!touchId);
          }}
          style={ProfileStyles.settingsItemContainer}>
          {renderIconLabel(Assets.TOUCH_ID, Constants.TOUCH_ID)}
          {loader
            ? renderActivityIndicator()
            : renderSwitch(touchId, (value: boolean): void => {
                handleTouchId(value);
              })}
        </Pressable>
      );
    };

    const renderNotification = (): React.JSX.Element => {
      const loader: boolean =
        fetchingStatus && fetchFor == Constants.NOTIFICATION;

      const notification: boolean = user?.notification ?? false;

      const handleNotification = (value: boolean): void => {
        if (!appNotificationPermission) {
          const toastPopupData: Interfaces.ToastPopupDataInterface = {
            buttonAction: (): void => {
              Linking.openSettings();
            },
            buttonLabel: Constants.OPEN_APP_SETTINGS,
            message: Constants.NOTIFICATION_WARNING_POP_UP,
            title: Constants.ACCESS_PERMISSION,
            type: StatusCodes.INFO,
          };

          dispatch(Actions.storeToastPopup(toastPopupData));
        } else {
          setFetchFor(Constants.NOTIFICATION);

          handleUpdateUserAPI(value?.toString(), Constants.KEY_NOTIFICATION);
        }
      };

      return (
        <Pressable
          onPress={() => {
            handleNotification(!notification);
          }}
          style={ProfileStyles.settingsItemContainer}>
          {renderIconLabel(Assets.NOTIFICATION, Constants.NOTIFICATION)}
          {loader
            ? renderActivityIndicator()
            : renderSwitch(
                notification,
                (value: boolean) => {
                  handleNotification(value);
                },
                !appNotificationPermission,
              )}
        </Pressable>
      );
    };

    const renderHeightUnits = (): React.JSX.Element => {
      const heightUnit: string = user?.height_unit ?? Constants.CM_UNIT;

      const loader: boolean =
        fetchingStatus && fetchFor == Constants.HEIGHT_UNITS;

      const renderToggleButton = (): React.JSX.Element => {
        const handleHeightUnits = (value: string): void => {
          setFetchFor(Constants.HEIGHT_UNITS);

          handleUpdateUserAPI(value, Constants.KEY_HEIGHT_UNIT);
        };

        return (
          <ToggleButton.Row
            onValueChange={(value: string): void => {
              handleHeightUnits(value);
            }}
            value={heightUnit}>
            {renderToggleButtonItem(Constants.CM_UNIT, heightUnit)}
            {renderToggleButtonItem(Constants.FT_UNIT, heightUnit)}
          </ToggleButton.Row>
        );
      };

      return (
        <View style={ProfileStyles.settingsItemContainer}>
          {renderIconLabel(Assets.HEIGHT, Constants.HEIGHT_UNITS)}
          {loader ? renderActivityIndicator(2.4) : renderToggleButton()}
        </View>
      );
    };

    const renderWeightUnits = (): React.JSX.Element => {
      const loader: boolean =
        fetchingStatus && fetchFor == Constants.WEIGHT_UNITS;

      const weightUnit: string = user?.weight_unit ?? Constants.KG_UNIT;

      const renderToggleButton = (): React.JSX.Element => {
        const handleHeightUnits = (value: string): void => {
          setFetchFor(Constants.WEIGHT_UNITS);

          handleUpdateUserAPI(value, Constants.KEY_WEIGHT_UNIT);
        };

        return (
          <ToggleButton.Row
            onValueChange={(value: string): void => {
              handleHeightUnits(value);
            }}
            value={weightUnit}>
            {renderToggleButtonItem(Constants.KG_UNIT, weightUnit)}
            {renderToggleButtonItem(Constants.LBS_UNIT, weightUnit)}
          </ToggleButton.Row>
        );
      };

      return (
        <View style={ProfileStyles.settingsItemContainer}>
          {renderIconLabel(Assets.WEIGHT, Constants.WEIGHT_UNITS)}
          {loader ? renderActivityIndicator(2.4) : renderToggleButton()}
        </View>
      );
    };

    const renderChangePassword = (): React.JSX.Element => {
      return (
        <Pressable
          onPress={(): void => {
            navigation.navigate(Constants.CHANGE_PASSWORD);
          }}
          style={ProfileStyles.settingsItemContainer}>
          {renderIconLabel(Assets.CHANGE_PASSWORD, Constants.CHANGE_PASSWORD)}
          {renderChevronRightIcon()}
        </Pressable>
      );
    };

    const renderActivityIndicator = (size: number = 3.2): React.JSX.Element => {
      return <ActivityIndicator size={RFPercentage(size)} />;
    };

    const renderSwitch = (
      switchValue: boolean,
      onPress: (value: boolean) => void,
      disabled: boolean = false,
    ): React.JSX.Element => {
      return (
        <Switch
          color={colors.primary}
          disabled={disabled}
          onValueChange={(value: boolean): void => {
            onPress(value);
          }}
          style={ProfileStyles.switchContainer}
          value={switchValue}
        />
      );
    };

    const renderToggleButtonItem = (
      value: string,
      selecetdValue: string,
    ): React.JSX.Element => {
      const checkForValue: boolean = selecetdValue == value;

      return (
        <ToggleButton
          icon={() => (
            <Text
              style={Styles.textView(
                RFPercentage(1.4),
                'Roboto-Regular',
                checkForValue ? colors.surface : colors.onSurface,
                RFPercentage(1.406),
                'center',
              )}>
              {value}
            </Text>
          )}
          style={[
            Styles.backgroundColor(
              checkForValue ? colors.primary : Colors.TRANSPARENT,
            ),
            Styles.borderColor(colors.primary),
            ProfileStyles.toogleButtonItemConatiner,
          ]}
          value={value}
        />
      );
    };

    const handleBiometricsAPI = (
      value: boolean,
      key: string,
      biometricType: BiometryType,
    ): void => {
      const faceId: boolean = user?.face_id ?? false;

      const touchId: boolean = user?.touch_id ?? false;

      let requestData: Interfaces.UpdateBiometricsInfoRequestInterface = {
        user_id: userId,
      };

      switch (biometricType) {
        case Constants.BIO_BIOMETRICS:
        case Constants.BIO_TOUCHID:
          requestData = {...requestData, face_id: faceId, touch_id: value};
          break;

        case Constants.BIO_FACEID:
          requestData = {...requestData, face_id: value, touch_id: touchId};
          break;

        default:
          requestData = {...requestData, face_id: faceId, touch_id: touchId};
          break;
      }

      ENV.currentEnvironment == Constants.DEVELOPMENT &&
        console.log('UPDATE BIOMETRIC INFO REQUEST DATA::: ', requestData);

      dispatch(
        Actions.updateBiometricInfo(
          requestData,
          (response: Interfaces.APIResponseInterface): void => {
            const responseData: Interfaces.UpdateBiometricsInfoResponseInterface =
              response.data;

            const responseType: number = response.type;

            switch (responseType) {
              case StatusCodes.SUCCESS:
                const user: Interfaces.UserInterface = responseData.user_data;

                dispatch(Actions.storeUser(user));
                break;

              default:
                updateUserStates(!value, key);
                break;
            }

            setFetchFor('');
          },
        ),
      );
    };

    const handleUpdateUserAPI = (
      value: boolean | string,
      key: string,
    ): void => {
      let requestData: Interfaces.UpdateUserRequestInterface = {
        [key]: value,
        user_id: userId,
      };

      ENV.currentEnvironment == Constants.DEVELOPMENT &&
        console.log('UPDATE USER REQUEST DATA::: ', requestData);

      dispatch(
        Actions.updateUser(
          requestData,
          (response: Interfaces.APIResponseInterface): void => {
            const responseData: Interfaces.UpdateUserResponseInterface =
              response.data;

            const responseType: number = response.type;

            switch (responseType) {
              case StatusCodes.SUCCESS:
                const updatedUser: Interfaces.UserInterface =
                  responseData.user_data;

                dispatch(Actions.storeUser(updatedUser));
                break;

              default:
                const previousValue = user?.[key];

                updateUserStates(previousValue, key);
                break;
            }

            setFetchFor('');
          },
        ),
      );
    };

    return !loader ? (
      <View style={ProfileStyles.settingsContainer}>
        {checkForBiometricsFaceId && (
          <>
            {renderFaceId()}
            {renderDivider()}
          </>
        )}
        {checkForBiometricsTouchId && (
          <>
            {renderTouchId()}
            {renderDivider()}
          </>
        )}
        {renderNotification()}
        {renderDivider()}
        {renderHeightUnits()}
        {renderDivider()}
        {renderWeightUnits()}
        {renderDivider()}
        {renderChangePassword()}
      </View>
    ) : (
      <SkeletonPlaceholder>
        <View style={skeletonStyle} />
      </SkeletonPlaceholder>
    );
  };

  const updateUserStates = (value: boolean | string, key: string): void => {
    let updateUser: null | Interfaces.UserInterface = user;

    updateUser = updateUser
      ? {
          ...updateUser,
          [key]: value,
        }
      : null;

    dispatch(Actions.storeUser(updateUser));
  };

  const renderOtherSettings = (): React.JSX.Element => {
    const renderAbout = (): React.JSX.Element => {
      return (
        <Pressable
          onPress={(): void => {}}
          style={ProfileStyles.settingsItemContainer}>
          {renderIconLabel(Assets.ABOUT, Constants.ABOUT)}
          {renderChevronRightIcon()}
        </Pressable>
      );
    };

    const renderPrivacyPolicy = (): React.JSX.Element => {
      return (
        <Pressable
          onPress={(): void => {}}
          style={ProfileStyles.settingsItemContainer}>
          {renderIconLabel(Assets.PRIVACY_POLICY, Constants.PRIVACY_AND_POLICY)}
          {renderChevronRightIcon()}
        </Pressable>
      );
    };

    return !loader ? (
      <View style={ProfileStyles.otherSettingsContainer}>
        {renderAbout()}
        {renderDivider()}
        {renderPrivacyPolicy()}
      </View>
    ) : (
      <SkeletonPlaceholder>
        <View style={ProfileStyles.skeletonOtherSettingsContainer} />
      </SkeletonPlaceholder>
    );
  };

  const renderIconLabel = (
    source: ImageSourcePropType,
    label: string,
  ): React.JSX.Element => {
    return (
      <View style={ProfileStyles.settingsIconLabelContainer}>
        <View style={ProfileStyles.settingsIconContainer}>
          <Image
            resizeMode={Constants.COVER}
            source={source}
            style={Styles.imageView('62.5%', '62.5%')}
            tintColor={colors.primary}
          />
        </View>
        <View style={Styles.paddingHorizontal(RFPercentage(1), 0)}>
          <Text
            style={Styles.textView(
              RFPercentage(1.4),
              'Roboto-Regular',
              colors.surface,
              RFPercentage(1.406),
            )}>
            {label}
          </Text>
        </View>
      </View>
    );
  };

  const renderDivider = (isVertical: boolean = false) => {
    return isVertical ? (
      <View style={ProfileStyles.verticalDividerContainer}>
        <Divider />
        <View
          style={[
            Styles.backgroundColor(colors.outlineVariant),
            Styles.imageView('100%', RFPercentage(0.125)),
          ]}
        />
      </View>
    ) : (
      <Divider style={Styles.margin(0, RFPercentage(1))} />
    );
  };

  const renderChevronRightIcon = (): React.JSX.Element => {
    return (
      <MaterialIcons
        color={colors.surface}
        name={Constants.ARROW_FORWARD_IOS}
        size={RFPercentage(1.8)}
      />
    );
  };

  const renderButtons = (): React.JSX.Element => {
    const renderSignOut = (): React.JSX.Element => {
      const renderIcon = (): React.JSX.Element => {
        return (
          <Image
            resizeMode={Constants.COVER}
            source={Assets.SIGN_OUT}
            style={Styles.imageView(RFPercentage(2.4), RFPercentage(2.4))}
          />
        );
      };

      return !loader ? (
        <View style={Styles.padding(0, RFPercentage(0.9))}>
          <Button
            contentStyle={ButtonStyles.contentStyleForRightIcon}
            icon={(): React.JSX.Element => renderIcon()}
            labelStyle={ButtonStyles.defaultLabelStyle}
            mode={Constants.B_MODE_ELEVATED}
            onPress={(): void => {
              setSignOutVisible(true);
            }}
            style={[
              Styles.backgroundColor(colors.error),
              ButtonStyles.defaultStyle,
            ]}
            textColor={colors.surface}>
            {Constants.SIGN_OUT}
          </Button>
        </View>
      ) : (
        <SkeletonPlaceholder>
          <View style={CommonStyles.skeletonButtonContainer} />
        </SkeletonPlaceholder>
      );
    };

    return (
      <View style={ProfileStyles.buttonsContainer}>{renderSignOut()}</View>
    );
  };

  const renderSignOut = (): React.JSX.Element => {
    const onCancel = (): void => {
      setSignOutVisible(false);
    };

    const onOk = (): void => {
      setSignOutVisible(false);

      handleSignOut();
    };

    const handleSignOut = async (): Promise<void> => {
      Functions.clearAsyncStorageAndRedux();

      const resetAction: CommonActions.Action = CommonActions.reset({
        index: Constants.ZERO,
        routes: [{name: Constants.SIGN_IN}],
      });

      navigation.dispatch(resetAction);
    };

    return (
      <Portal>
        <Dialog
          onDismiss={(): void => {
            onCancel();
          }}
          style={Styles.backgroundColor(colors.background)}
          visible={signOutVisible}>
          <Dialog.Title
            style={Styles.textView(
              RFPercentage(1.8),
              'Roboto-Bold',
              colors.primary,
            )}>
            {Constants.SIGN_OUT}
          </Dialog.Title>
          <Dialog.Content>
            <Text
              style={Styles.textView(
                RFPercentage(1.4),
                'Roboto-Regular',
                colors.surface,
              )}>
              {Constants.SIGN_OUT_TEXT}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={(): void => {
                onCancel();
              }}>
              {Constants.CANCEL}
            </Button>
            <Button
              onPress={(): void => {
                onOk();
              }}>
              {Constants.OK}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  };

  return (
    <Network>
      <View style={Styles.screenContainer(colors.background)}>
        {renderHeader()}
        <ScrollView
          contentContainerStyle={[
            CommonStyles.defaultFlexGrow,
            ProfileStyles.container,
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
          {renderDP()}
          {renderNameEmail()}
          {renderEditMyProfile()}
          {renderBodyInfo()}
          {renderSubscription()}
          {renderSettings()}
          {renderOtherSettings()}
          {renderButtons()}
        </ScrollView>
        {renderSignOut()}
      </View>
    </Network>
  );
};

export default Profile;
