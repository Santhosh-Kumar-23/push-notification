import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useState} from 'react';
import {
  BackHandler,
  Image,
  ImageSourcePropType,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {Button, MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import ENV from '../../../env';
import * as Assets from '../../assets';
import AuthHeader from '../../common/components/authHeader';
import AuthScreenBackground from '../../common/components/authScreenBackground';
import useBiometrics from '../../common/hooks/biomertics';
import * as Styles from '../../common/styles';
import * as Constants from '../../common/utils/constants';
import * as Functions from '../../common/utils/functions';
import * as Enums from '../../configs/ts/enums';
import * as Interfaces from '../../configs/ts/interfaces';
import * as Actions from '../../redux/rootAction';
import SignInStyles from '../../styles/authStyles/signIn';

const SignIn: FC = (props: any) => {
  // Props Variables
  const {navigation} = props;

  // UseState Variables
  const [email, setEmail] = useState<string>('');
  const [exitCount, setExitCount] = useState<number>(Constants.ZERO);
  const [isError, setIsError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');

  // Other Variables
  const biometrics: Interfaces.BiometricsDetailsInterface = useBiometrics();
  const dispatch: any = useDispatch();
  const otherReduxStates: Interfaces.OtherReducerStateInterface = useSelector(
    (state: Interfaces.RootReducersStateInterface) => state.other,
  );
  const {colors}: MD3Theme = useTheme();
  const {StatusCodes} = Enums;
  const {ButtonStyles, CommonStyles, TextInputStyles} = Styles;
  const biometricAvailable: boolean = biometrics.available;
  const fetchingStatus: boolean = otherReduxStates.fetchingStatus;

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

      handleUseStatesReset();

      return (): void => {
        isFocus = false;
      };
    }, []),
  );

  // Functions
  const backAction = (): boolean => {
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

    return true;
  };

  const handleUseStatesReset = (): void => {
    setEmail('');

    setExitCount(Constants.ZERO);

    setIsError(false);

    setPassword('');
  };

  const renderSignIn = (): React.JSX.Element => {
    const renderEmail = (): React.JSX.Element => {
      const checkForEmailEmpty: boolean = !email && isError;

      const checkForValidEmail: boolean =
        Boolean(email) && Functions.handleEmailRegExp(email);

      const checkForEmailError: boolean =
        checkForEmailEmpty || checkForValidEmail;

      return (
        <>
          <View
            style={[
              Styles.backgroundColor(colors.surface),
              Styles.borderColor(
                checkForEmailError ? colors.error : colors.outline,
              ),
              TextInputStyles.defautContainerStyle,
            ]}>
            <View style={TextInputStyles.defaultIconContainerStyle}>
              {renderIcon(Assets.EMAIL)}
            </View>
            <View style={TextInputStyles.defaultTextInputContainerStyle}>
              <TextInput
                autoCapitalize={Constants.TI_CAP_NONE}
                autoComplete={Constants.TI_COM_EMAIL}
                keyboardType={Constants.TI_KT_EMAIL_ADDRESS}
                onChangeText={(txt: string): void => {
                  setEmail(txt);
                }}
                placeholder={Constants.EMAIL}
                placeholderTextColor={colors.onSurface}
                style={Styles.textView(
                  RFPercentage(1.4),
                  'Roboto-Regular',
                  colors.inverseSurface,
                  RFPercentage(1.68),
                )}
                value={email}
              />
            </View>
          </View>
          {checkForEmailEmpty && (
            <View style={Styles.padding(RFPercentage(2.5), 0)}>
              <Text
                style={Styles.textView(
                  RFPercentage(1.4),
                  'Roboto-Regular',
                  colors.error,
                )}>
                {Constants.EMAIL_ERROR}
              </Text>
            </View>
          )}
          {checkForValidEmail && (
            <View style={Styles.padding(RFPercentage(2.5), 0)}>
              <Text
                style={Styles.textView(
                  RFPercentage(1.4),
                  'Roboto-Regular',
                  colors.error,
                )}>
                {Constants.EMAIL_INVALID_ERROR}
              </Text>
            </View>
          )}
        </>
      );
    };

    const renderPassword = (): React.JSX.Element => {
      const checkForPasswordEmpty: boolean = !password && isError;

      const checkForValidPassword: boolean =
        Boolean(password) && Functions.handlePasswordRegExp(password);

      const checkForPasswordError: boolean =
        checkForPasswordEmpty || checkForValidPassword;

      return (
        <>
          <View
            style={[
              Styles.backgroundColor(colors.surface),
              Styles.borderColor(
                checkForPasswordError ? colors.error : colors.outline,
              ),
              TextInputStyles.defautContainerStyle,
            ]}>
            <View style={TextInputStyles.defaultIconContainerStyle}>
              {renderIcon(Assets.LOCK)}
            </View>
            <View style={TextInputStyles.defaultTextInputContainerStyle}>
              <TextInput
                autoCapitalize={Constants.TI_CAP_NONE}
                autoComplete={Constants.TI_COM_CURRENT_PASDWORD}
                keyboardType={Constants.TI_KT_DEFAULT}
                onChangeText={(txt: string): void => {
                  setPassword(txt);
                }}
                placeholder={Constants.PASSWORD}
                placeholderTextColor={colors.onSurface}
                secureTextEntry={true}
                style={Styles.textView(
                  RFPercentage(1.4),
                  'Roboto-Regular',
                  colors.inverseSurface,
                  RFPercentage(1.68),
                )}
                value={password}
              />
            </View>
          </View>
          {checkForPasswordEmpty && (
            <View style={Styles.padding(RFPercentage(2.5), 0)}>
              <Text
                style={Styles.textView(
                  RFPercentage(1.4),
                  'Roboto-Regular',
                  colors.error,
                )}>
                {Constants.PASSWORD_ERROR}
              </Text>
            </View>
          )}
          {checkForValidPassword && (
            <View style={Styles.padding(RFPercentage(2.5), 0)}>
              <Text
                style={Styles.textView(
                  RFPercentage(1.4),
                  'Roboto-Regular',
                  colors.error,
                )}>
                {Constants.PASSWORD_INVALID_ERROR}
              </Text>
            </View>
          )}
        </>
      );
    };

    const renderIcon = (source: ImageSourcePropType): React.ReactNode => {
      return (
        <Image
          resizeMode={Constants.COVER}
          source={source}
          style={TextInputStyles.defaultIconStyle}
        />
      );
    };

    return (
      <View style={SignInStyles.signInContainer}>
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
            {renderEmail()}
            {renderPassword()}
          </View>
        </View>
      </View>
    );
  };

  const renderSignInButton = (): React.JSX.Element => {
    const handleSignIn = (): void => {
      Keyboard.dismiss();

      const checkForEmail: boolean =
        Boolean(email) && !Functions.handleEmailRegExp(email);

      const checkForPassword: boolean =
        Boolean(password) && !Functions.handlePasswordRegExp(password);

      if (checkForEmail && checkForPassword) {
        setIsError(false);

        handleSignInAPI();
      } else {
        setIsError(true);
      }
    };

    const handleSignInAPI = (): void => {
      const requestData: Interfaces.SignInRequestInterface = {
        email,
        password,
      };

      ENV.currentEnvironment == Constants.DEVELOPMENT &&
        console.log('LOGIN REQUEST DATA::: ', requestData);

      dispatch(
        Actions.login(
          requestData,
          (response: Interfaces.APIResponseInterface): void => {
            const responseData: Interfaces.SignInResponseInterface =
              response.data;

            const responseType: number = response.type;

            switch (responseType) {
              case StatusCodes.SUCCESS:
                const otp: number | undefined = responseData.otp;

                const checkForOtp: boolean = Boolean(otp);

                const token: string = responseData.token || '';

                const checkForToken: boolean = Boolean(token);

                const user: Interfaces.UserInterface = responseData.user_data;

                const userStatus: string = user.user_status;

                if (checkForOtp && userStatus == Constants.IN_ACTIVE) {
                  const toastPopupData: Interfaces.ToastPopupDataInterface = {
                    message: response.message || Constants.COMMON_SUCCESS,
                    title: response.title,
                    type: response.type,
                  };

                  dispatch(Actions.storeToastPopup(toastPopupData));

                  dispatch(Actions.storeUser(user));

                  navigation.navigate(Constants.OTP);
                } else if (checkForToken && userStatus == Constants.ACTIVE) {
                  const checkForBiometricsIds: boolean =
                    Functions.handleUserBiometricsIds(user);

                  const userId: number = user.id;

                  Functions.handleUserLoginAsync(token, userId);

                  dispatch(Actions.storeUser(user));

                  let navigateScreen: string = Constants.HOME;

                  if (biometricAvailable && !checkForBiometricsIds) {
                    navigateScreen = Constants.SIGN_IN_WELCOME_BACK;
                  } else {
                    navigateScreen = Constants.HOME;
                  }

                  navigation.navigate(navigateScreen);
                } else {
                }
                break;

              default:
                break;
            }
          },
        ),
      );
    };

    return (
      <View style={Styles.padding(RFPercentage(3.6), RFPercentage(1))}>
        <Button
          contentStyle={ButtonStyles.defaultContentStyle}
          labelStyle={ButtonStyles.defaultLabelStyle}
          loading={fetchingStatus}
          mode={Constants.B_MODE_ELEVATED}
          onPress={(): void => {
            handleSignIn();
          }}
          style={[
            Styles.backgroundColor(colors.primary),
            ButtonStyles.defaultStyle,
          ]}
          textColor={colors.secondary}>
          {fetchingStatus ? Constants.LOADING : Constants.SIGN_IN}
        </Button>
      </View>
    );
  };

  const renderForgetPassword = (): React.JSX.Element => {
    return (
      <View style={Styles.padding(RFPercentage(3.6), RFPercentage(1))}>
        <Pressable
          onPress={(): void => {
            navigation.navigate(Constants.FORGET_PASSWORD);
          }}>
          <Text
            style={Styles.textView(
              RFPercentage(1.6),
              'Roboto-Regular',
              colors.primary,
              RFPercentage(2),
              'center',
            )}>
            {Constants.FORGET_PASSWORD}?
          </Text>
        </Pressable>
      </View>
    );
  };

  const renderSignUp = (): React.JSX.Element => {
    return (
      <View style={SignInStyles.signUpContainer}>
        <Text
          style={Styles.textView(
            RFPercentage(1.6),
            'Roboto-Regular',
            colors.surface,
            RFPercentage(2),
            'center',
          )}>
          {Constants.DIDNT_HAVE_ANY_ACCOUNT}
        </Text>
        <Pressable
          onPress={(): void => {
            navigation.navigate(Constants.SIGN_UP);
          }}
          style={Styles.padding(RFPercentage(0.4), 0)}>
          <Text
            style={Styles.textView(
              RFPercentage(1.6),
              'Roboto-Bold',
              colors.primary,
              RFPercentage(2),
            )}>
            {Constants.SIGN_UP_HERE}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={Styles.screenContainer(colors.inverseSurface)}>
      <AuthScreenBackground />
      <View style={CommonStyles.screenAbsoluteContainer}>
        <KeyboardAvoidingView
          behavior={
            Platform.OS == Constants.IOS
              ? Constants.KAV_BEHAVIOUR_PADDING
              : Constants.KAV_BEHAVIOUR_HEIGHT
          }
          style={CommonStyles.defaultFlex}>
          <ScrollView
            contentContainerStyle={CommonStyles.defaultFlexGrow}
            keyboardShouldPersistTaps={Constants.SCROLL_PERSIST_TAPS_HANDLED}
            showsVerticalScrollIndicator={false}>
            <AuthHeader
              onClose={(): void => {
                backAction();
              }}
            />
            {renderSignIn()}
            {renderSignInButton()}
            {renderForgetPassword()}
            {renderSignUp()}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default SignIn;
