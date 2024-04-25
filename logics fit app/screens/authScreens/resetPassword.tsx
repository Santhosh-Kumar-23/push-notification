import {CommonActions, useFocusEffect} from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {FC, useCallback, useState} from 'react';
import {
  Image,
  ImagePropsBase,
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
import {
  ActivityIndicator,
  Button,
  MD3Theme,
  useTheme,
} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import ENV from '../../../env';
import * as Endpoints from '../../api/Endpoints';
import * as Assets from '../../assets';
import * as Styles from '../../common/styles';
import * as Constants from '../../common/utils/constants';
import * as Functions from '../../common/utils/functions';
import * as Enums from '../../configs/ts/enums';
import * as Interfaces from '../../configs/ts/interfaces';
import * as Actions from '../../redux/rootAction';
import ResetPasswordStyles from '../../styles/authStyles/resetPassword';

const ResetPassword: FC = (props: any) => {
  // Props Variables
  const {navigation} = props;

  // UseState Variables
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [helperOtp, setHelperOtp] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [timer, setTimer] = useState<number>(Constants.OTP_TIMER);

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
  const {ButtonStyles, CommonStyles, TextInputStyles} = Styles;
  const fetchingStatus: boolean = otherReduxStates.fetchingStatus;
  const forgotPassword: Interfaces.ForgotPasswordInterface | null =
    appReduxStates.forgotPassword;
  const email: string = forgotPassword?.email ?? '';
  const checkForEmail: boolean = Boolean(email);
  let intervalId: any,
    resetOtp: string = forgotPassword?.otp?.toString() ?? '';

  // Hooks Functions
  useFocusEffect(
    useCallback(() => {
      let isFocus: boolean = true;

      handleUseStatesReset();

      return (): void => {
        isFocus = false;
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      let isFocus: boolean = true;

      handleTimer();

      return (): void => {
        isFocus = false;

        clearInterval(intervalId);
      };
    }, []),
  );

  // Functions
  const handleUseStatesReset = (): void => {
    setConfirmPassword('');

    setHelperOtp(resetOtp);

    setIsError(false);

    setOtp('');

    setPassword('');

    setTimer(Constants.OTP_TIMER);
  };

  const handleTimer = (): void => {
    if (timer > Constants.ZERO) {
      intervalId = setInterval(() => {
        setTimer((t: number): number =>
          t > Constants.ZERO ? t - Constants.ONE : Constants.ZERO,
        );
      }, Constants.TIMER_INTERVAL);
    } else {
      clearInterval(intervalId);
    }
  };

  const renderLogo = (): React.JSX.Element => {
    return (
      <View style={ResetPasswordStyles.logoContainer}>
        <View>
          <Image
            resizeMode={Constants.CONTAIN}
            source={Assets.LOGO}
            style={Styles.imageView(RFPercentage(15.9), RFPercentage(16.4))}
          />
        </View>
      </View>
    );
  };

  const renderResetPassword = (): React.JSX.Element => {
    const renderOtpInputs = (): React.JSX.Element => {
      const checkForOtpEmpty: boolean = !otp && isError;

      const checkForValidOtp: boolean =
        Boolean(otp) && (otp.length != Constants.FOUR || otp != helperOtp);

      const checkForOtpError: boolean = checkForOtpEmpty || checkForValidOtp;

      return (
        <View style={CommonStyles.centered}>
          <OTPInputView
            autoFocusOnLoad={false}
            codeInputFieldStyle={
              checkForOtpError
                ? ResetPasswordStyles.inputFieldErrorContainer
                : ResetPasswordStyles.inputFieldContainer
            }
            keyboardType={Constants.TI_KT_NUMBER_PAD}
            onCodeChanged={(code: string): void => {
              setOtp(code);
            }}
            pinCount={Constants.FOUR}
            style={Styles.imageView(RFPercentage(10), RFPercentage(26))}
          />
          {checkForOtpEmpty && (
            <View
              style={[
                Styles.padding(RFPercentage(2.5), 0),
                Styles.paddingVertical(RFPercentage(1.25), 0),
              ]}>
              <Text
                style={Styles.textView(
                  RFPercentage(1.4),
                  'Roboto-Regular',
                  colors.error,
                )}>
                {Constants.OTP_ERROR}
              </Text>
            </View>
          )}
          {checkForValidOtp && (
            <View
              style={[
                Styles.padding(RFPercentage(2.5), 0),
                Styles.paddingVertical(RFPercentage(1.25), 0),
              ]}>
              <Text
                style={Styles.textView(
                  RFPercentage(1.4),
                  'Roboto-Regular',
                  colors.error,
                )}>
                {Constants.OTP_INVALID_ERROR}
              </Text>
            </View>
          )}
        </View>
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
                autoComplete={Constants.TI_COM_NEW_PASDWORD}
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

    const renderConfirmPassword = (): React.JSX.Element => {
      const checkForConfirmPassword: boolean = Boolean(confirmPassword);

      const checkForConfirmPasswordEmpty: boolean = !confirmPassword && isError;

      const checkForEqualPassword: boolean =
        checkForConfirmPassword && confirmPassword == password;

      const checkForValidConfirmPassword: boolean =
        checkForConfirmPassword &&
        password.length >= Constants.EIGHT &&
        !checkForEqualPassword;

      const checkForConfirmPasswordError: boolean =
        checkForConfirmPasswordEmpty || checkForValidConfirmPassword;

      return (
        <>
          <View
            style={[
              Styles.backgroundColor(colors.surface),
              Styles.borderColor(
                checkForConfirmPasswordError ? colors.error : colors.outline,
              ),
              TextInputStyles.defautContainerStyle,
            ]}>
            <View style={TextInputStyles.defaultIconContainerStyle}>
              {renderIcon(Assets.LOCK)}
            </View>
            <View
              style={[
                TextInputStyles.defaultTextInputContainerStyle,
                checkForEqualPassword && Styles.flex(0.9),
              ]}>
              <TextInput
                autoCapitalize={Constants.TI_CAP_NONE}
                autoComplete={Constants.TI_COM_CURRENT_PASDWORD}
                keyboardType={Constants.TI_KT_DEFAULT}
                onChangeText={(txt: string): void => {
                  setConfirmPassword(txt);
                }}
                placeholder={Constants.CONFIRM_PASSWORD}
                placeholderTextColor={colors.onSurface}
                secureTextEntry={true}
                style={Styles.textView(
                  RFPercentage(1.4),
                  'Roboto-Regular',
                  colors.inverseSurface,
                  RFPercentage(1.68),
                )}
                value={confirmPassword}
              />
            </View>
            {checkForEqualPassword && (
              <View style={TextInputStyles.defaultIconContainerStyle}>
                {renderIcon(Assets.TICK, colors.primary)}
              </View>
            )}
          </View>
          {checkForConfirmPasswordEmpty ? (
            <View style={Styles.padding(RFPercentage(2.5), 0)}>
              <Text
                style={Styles.textView(
                  RFPercentage(1.4),
                  'Roboto-Regular',
                  colors.error,
                )}>
                {Constants.CONFIRM_PASSWORD_ERROR}
              </Text>
            </View>
          ) : (
            checkForValidConfirmPassword && (
              <View style={Styles.padding(RFPercentage(2.5), 0)}>
                <Text
                  style={Styles.textView(
                    RFPercentage(1.4),
                    'Roboto-Regular',
                    colors.error,
                  )}>
                  {Constants.CONFIRM_PASSWORD_INVALID_ERROR}
                </Text>
              </View>
            )
          )}
        </>
      );
    };

    const renderIcon = (
      source: ImageSourcePropType,
      tintColor: ImagePropsBase['tintColor'] = undefined,
    ): React.ReactNode => {
      return (
        <Image
          resizeMode={Constants.COVER}
          source={source}
          style={TextInputStyles.defaultIconStyle}
          tintColor={tintColor}
        />
      );
    };

    return (
      <View style={Styles.padding(RFPercentage(3.6), 0)}>
        <Text
          style={Styles.textView(
            RFPercentage(3.79),
            'Saira-Bold',
            colors.surface,
            RFPercentage(4.548),
          )}>
          {Constants.RESET_PASSWORD}
        </Text>
        <Text
          style={[
            Styles.padding(0, RFPercentage(1)),
            Styles.textView(
              RFPercentage(1.6),
              'Roboto-Regular',
              colors.surface,
              RFPercentage(1.875),
            ),
          ]}>
          {checkForEmail
            ? Constants.OTP_CONTENT.replace(
                /your registered email/g,
                Functions.maskString(email),
              )
            : Constants.OTP_CONTENT}
        </Text>
        {renderOtpInputs()}
        {renderPassword()}
        {renderConfirmPassword()}
      </View>
    );
  };

  const renderResetButton = (): React.JSX.Element => {
    const handleReset = (): void => {
      Keyboard.dismiss();

      const checkForConfirmPassword: boolean = confirmPassword == password;

      const checkForOtp: boolean =
        Boolean(otp) && otp.length == Constants.FOUR && otp == helperOtp;

      const checkForPassword: boolean =
        Boolean(password) && !Functions.handlePasswordRegExp(password);

      if (checkForConfirmPassword && checkForOtp && checkForPassword) {
        setIsError(false);

        handleResetAPI();
      } else {
        setIsError(true);
      }
    };

    const handleResetAPI = (): void => {
      const requestData: Interfaces.ResetPasswordRequestInterface = {
        confirmPassword,
        email,
        otp: Number(otp),
        password,
      };

      ENV.currentEnvironment == Constants.DEVELOPMENT &&
        console.log('RESET PASSWORD REQUEST DATA::: ', requestData);

      dispatch(
        Actions.resetPassword(
          requestData,
          (response: Interfaces.APIResponseInterface): void => {
            const responseType: number = response.type;

            switch (responseType) {
              case StatusCodes.SUCCESS:
                const resetAction: CommonActions.Action = CommonActions.reset({
                  index: Constants.ZERO,
                  routes: [{name: Constants.SIGN_IN}],
                });

                navigation.dispatch(resetAction);
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
          loading={fetchingStatus && !loader}
          mode={Constants.B_MODE_ELEVATED}
          onPress={(): void => {
            handleReset();
          }}
          style={[
            Styles.backgroundColor(colors.primary),
            ButtonStyles.defaultStyle,
          ]}
          textColor={colors.secondary}>
          {fetchingStatus && !loader ? Constants.LOADING : Constants.RESET}
        </Button>
      </View>
    );
  };

  const renderResend = (): React.JSX.Element => {
    const checkForTimer: boolean = timer > Constants.ZERO;

    const handleResendAPI = (): void => {
      setLoader(true);

      const requestData: Interfaces.ResendOtpRequestInterface = {
        email,
      };

      ENV.currentEnvironment == Constants.DEVELOPMENT &&
        console.log('RESEND OTP REQUEST DATA::: ', requestData);

      dispatch(
        Actions.resendOtp(
          Endpoints.FORGET_PASSWORD,
          requestData,
          (response: Interfaces.APIResponseInterface): void => {
            const responseData: Interfaces.ResendOtpResponseInterface =
              response.data;

            const responseType: number = response.type;

            switch (responseType) {
              case StatusCodes.SUCCESS:
                const otp: number = responseData.otp;

                setHelperOtp(otp.toString());

                setLoader(false);

                setTimer(Constants.OTP_TIMER);
                break;

              default:
                setLoader(false);
                break;
            }
          },
        ),
      );
    };

    return (
      <View style={ResetPasswordStyles.resendContainer}>
        <Text
          style={Styles.textView(
            RFPercentage(1.6),
            'Roboto-Regular',
            colors.surface,
            RFPercentage(2),
            'center',
          )}>
          {Constants.DIDNT_RECEIVED_THE_CODE}
        </Text>
        <Pressable
          disabled={checkForTimer || loader}
          onPress={(): void => {
            handleResendAPI();
          }}
          style={Styles.padding(RFPercentage(loader ? 0.6 : 0.4), 0)}>
          {loader ? (
            <ActivityIndicator />
          ) : (
            <Text
              style={Styles.textView(
                RFPercentage(1.6),
                'Roboto-Bold',
                checkForTimer ? colors.surfaceDisabled : colors.primary,
                RFPercentage(2),
              )}>
              {`${Constants.RESEND}${
                checkForTimer ? ` ${secondsToMin(timer)}` : ''
              }`}
            </Text>
          )}
        </Pressable>
      </View>
    );
  };

  const secondsToMin = (time: number): string => {
    const min: number = Math.floor(time / Constants.SIXTY);

    const minutes: number | string =
      min >= Constants.ONE
        ? String(min).length == Constants.ONE
          ? `0${min}`
          : min
        : Constants.TWO_ZERO;

    const sec: number = time - min * Constants.SIXTY;

    const seconds =
      sec >= Constants.ONE
        ? String(sec).length == Constants.ONE
          ? `0${sec}`
          : sec
        : Constants.TWO_ZERO;

    return minutes + ':' + seconds;
  };

  return (
    <View style={Styles.screenContainer(colors.background)}>
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
          {renderLogo()}
          <View style={ResetPasswordStyles.resetPasswordContainer}>
            {renderResetPassword()}
            <View>
              {renderResetButton()}
              {renderResend()}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ResetPassword;
