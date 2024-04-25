import {CommonActions, useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useState} from 'react';
import {
  BackHandler,
  Image,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import ReactNativeBiometrics, {BiometryType} from 'react-native-biometrics';
import {showMessage} from 'react-native-flash-message';
import {Button, MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import ENV from '../../../env';
import * as Assets from '../../assets';
import AuthHeader from '../../common/components/authHeader';
import AuthScreenBackground from '../../common/components/authScreenBackground';
import Biometrics from '../../common/components/biometrics';
import useBiometrics from '../../common/hooks/biomertics';
import * as Styles from '../../common/styles';
import * as Constants from '../../common/utils/constants';
import * as Functions from '../../common/utils/functions';
import * as AppConfigs from '../../configs/appConfigs';
import * as Enums from '../../configs/ts/enums';
import * as Interfaces from '../../configs/ts/interfaces';
import * as Actions from '../../redux/rootAction';
import SignInWelcomeBackStyles from '../../styles/authStyles/signInWelcomeBack';

const SignInWelcomeBack: FC = (props: any) => {
  // Props Variables
  const {navigation, route} = props;
  const isBackAlert = route?.params?.isBackAlert ?? false;
  const isNew = route?.params?.isNew ?? false;

  // UseState Variables
  const [biometricsVisible, setBiometricsVisible] = useState<boolean>(false);
  const [exitCount, setExitCount] = useState<number>(Constants.ZERO);

  // Other Variables
  const biometrics: Interfaces.BiometricsDetailsInterface = useBiometrics();
  const dispatch: any = useDispatch();
  const appReduxStates: Interfaces.AppReducerStateInterface = useSelector(
    (state: Interfaces.RootReducersStateInterface) => state.app,
  );
  const otherReduxStates: Interfaces.OtherReducerStateInterface = useSelector(
    (state: Interfaces.RootReducersStateInterface) => state.other,
  );
  const {colors}: MD3Theme = useTheme();
  const RnBiometrics = new ReactNativeBiometrics(AppConfigs.biomerticsConfigs);
  const {StatusCodes} = Enums;
  const {ButtonStyles, CommonStyles} = Styles;
  const biometricAvailable: boolean = biometrics.available;
  const biometricType: BiometryType =
    biometrics.biometryType ??
    (Platform.OS == Constants.IOS
      ? Constants.BIO_FACEID
      : Constants.BIO_BIOMETRICS);
  const checkForBiometricTypeFaceID: boolean =
    biometricType == Constants.BIO_FACEID;
  const fetchingStatus: boolean = otherReduxStates.fetchingStatus;
  const user: null | Interfaces.UserInterface = appReduxStates.user;
  const checkForBiometricsIds: boolean =
    Functions.handleUserBiometricsIds(user);
  const faceId: boolean = user?.face_id ?? false;
  const touchId: boolean = user?.touch_id ?? false;
  const name: string = user?.name ?? '';
  const userId: number = user?.id ?? Constants.ZERO;

  // Hooks Functions
  useFocusEffect(
    useCallback(() => {
      let isFocus: boolean = true;

      BackHandler.addEventListener('hardwareBackPress', backAction);

      return (): void => {
        isFocus = false;

        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, [exitCount]),
  );

  useFocusEffect(
    useCallback(() => {
      let isFocus: boolean = true;

      handleBiometrics();

      return (): void => {
        isFocus = false;
      };
    }, [biometricAvailable]),
  );

  // Functions
  const backAction = (): boolean => {
    if (isBackAlert) {
      switch (exitCount) {
        case Constants.ZERO:
          setExitCount(exitCount + Constants.ONE);

          showMessage({
            icon: Constants.FM_MI_AUTO,
            message: Constants.EXIT_APP_TOAST,
            position: Constants.BOTTOM,
            type: Constants.FM_MT_DEFAULT,
          });
          break;

        case Constants.ONE:
          setExitCount(Constants.ZERO);

          Functions.handleExitApp();
          break;

        default:
          break;
      }
    } else {
      navigation.pop();
    }

    return true;
  };

  const renderSignInWelcomeBack = (): React.JSX.Element => {
    const renderWelcomeBack = (): React.JSX.Element => {
      return (
        <View style={SignInWelcomeBackStyles.welcomeBackContainer}>
          <Text
            style={Styles.textView(
              RFPercentage(2),
              'Roboto-Regular',
              colors.surface,
              RFPercentage(2.813),
              'center',
            )}>
            {`${isNew ? Constants.WELCOME : Constants.WELCOME_BACK}, `}
          </Text>
          <Text
            style={Styles.textView(
              RFPercentage(2),
              'Roboto-Regular',
              colors.primary,
              RFPercentage(2.813),
              'center',
            )}>
            {name}
          </Text>
        </View>
      );
    };

    return (
      <View style={SignInWelcomeBackStyles.signInWelcomeBackContainer}>
        <View style={Styles.padding(RFPercentage(3.6), 0)}>
          <Text
            style={Styles.textView(
              RFPercentage(3.79),
              'Saira-Bold',
              colors.surface,
              RFPercentage(4.548),
            )}>
            {Constants.SIGN_IN}
          </Text>
          <View style={Styles.padding(0, RFPercentage(1))}>
            {renderWelcomeBack()}
          </View>
        </View>
      </View>
    );
  };

  const renderSignInWithButton = (): React.JSX.Element => {
    const renderIcon = (): React.JSX.Element => {
      return (
        <Image
          resizeMode={Constants.COVER}
          source={
            checkForBiometricTypeFaceID ? Assets.FACE_ID : Assets.TOUCH_ID
          }
          style={Styles.imageView(RFPercentage(2.4), RFPercentage(2.4))}
        />
      );
    };

    return (
      <View style={Styles.padding(RFPercentage(3.6), RFPercentage(1))}>
        <Button
          contentStyle={
            fetchingStatus
              ? ButtonStyles.defaultContentStyle
              : ButtonStyles.contentStyleForRightIcon
          }
          icon={(): React.JSX.Element => renderIcon()}
          labelStyle={ButtonStyles.defaultLabelStyle}
          loading={fetchingStatus}
          mode={Constants.B_MODE_ELEVATED}
          onPress={(): void => {
            handleBiometrics();
          }}
          style={[
            Styles.backgroundColor(colors.primary),
            ButtonStyles.defaultStyle,
          ]}
          textColor={colors.secondary}>
          {fetchingStatus
            ? Constants.LOADING
            : checkForBiometricTypeFaceID
            ? Constants.SIGN_IN_WITH_FACE_ID
            : Constants.SIGN_IN_WITH_TOUCH_ID}
        </Button>
      </View>
    );
  };

  const handleBiometrics = (): void => {
    if (biometricAvailable) {
      if (!checkForBiometricsIds) {
        setBiometricsVisible(true);
      } else {
        handleBiometricsPrompt();
      }
    } else {
    }
  };

  const handleBiometricsPrompt = (): void => {
    RnBiometrics.simplePrompt({
      cancelButtonText: Constants.CANCEL,
      promptMessage:
        biometricType == Constants.BIO_FACEID
          ? Constants.FACE_ID_PROMPT_MESSAGE
          : Constants.TOUCH_ID_PROMPT_MESSAGE,
    })
      .then(
        (resultObject: Interfaces.BiometricsSimplePromptResponseInterface) => {
          const {success} = resultObject;

          success && navigation.navigate(Constants.HOME);
        },
      )
      .catch((error: any): void => {
        const message: string = error?.[Constants.ZERO] ?? '';

        const checkForMessage: boolean = Boolean(message);

        const toastPopupData: Interfaces.ToastPopupDataInterface = {
          message: message,
          title: Constants.ERROR,
          type: StatusCodes.ERROR,
        };

        checkForMessage && dispatch(Actions.storeToastPopup(toastPopupData));
      });
  };

  const renderLoginWithDifferentAccount = (): React.JSX.Element => {
    const handleLoginWithDifferentAccount = async (): Promise<void> => {
      Functions.clearAsyncStorageAndRedux();

      const resetAction: CommonActions.Action = CommonActions.reset({
        index: Constants.ZERO,
        routes: [{name: Constants.SIGN_IN}],
      });

      navigation.dispatch(resetAction);
    };

    return (
      <Pressable
        onPress={(): void => {
          handleLoginWithDifferentAccount();
        }}
        style={SignInWelcomeBackStyles.loginWithDifferentAccountContainer}>
        <Text
          style={Styles.textView(
            RFPercentage(1.6),
            'Roboto-Bold',
            colors.primary,
            RFPercentage(2),
            'center',
          )}>
          {Constants.LOGIN_WITH_DIFFERENT_ACCOUNT}
        </Text>
      </Pressable>
    );
  };

  const renderBiometrics = () => {
    const onDismiss = (): void => {
      setBiometricsVisible(false);

      navigation.navigate(Constants.HOME);
    };

    const handleActivateAPI = (): void => {
      let requestData: Interfaces.UpdateBiometricsInfoRequestInterface = {
        user_id: userId,
      };

      switch (biometricType) {
        case Constants.BIO_BIOMETRICS:
        case Constants.BIO_TOUCHID:
          requestData = {...requestData, face_id: faceId, touch_id: true};
          break;

        case Constants.BIO_FACEID:
          requestData = {...requestData, face_id: true, touch_id: touchId};
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

                setBiometricsVisible(false);

                navigation.navigate(Constants.HOME);
                break;

              default:
                break;
            }
          },
        ),
      );
    };

    return (
      <Biometrics
        fetchingStatus={fetchingStatus}
        mode={biometricType}
        onDismiss={(): void => {
          onDismiss();
        }}
        onRetain={(): void => {
          handleActivateAPI();
        }}
        visible={biometricsVisible}
      />
    );
  };

  return (
    <View style={Styles.screenContainer(colors.inverseSurface)}>
      <AuthScreenBackground />
      <View style={CommonStyles.screenAbsoluteContainer}>
        <AuthHeader
          onClose={(): void => {
            navigation.navigate(Constants.SIGN_IN);
          }}
        />
        {renderSignInWelcomeBack()}
        {renderSignInWithButton()}
        {renderLoginWithDifferentAccount()}
        {renderBiometrics()}
      </View>
    </View>
  );
};

export default SignInWelcomeBack;
