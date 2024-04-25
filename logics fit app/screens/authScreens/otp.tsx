import {useFocusEffect} from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {FC, useCallback, useState} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
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
import useBiometrics from '../../common/hooks/biomertics';
import * as Styles from '../../common/styles';
import * as Constants from '../../common/utils/constants';
import * as Functions from '../../common/utils/functions';
import * as Enums from '../../configs/ts/enums';
import * as Interfaces from '../../configs/ts/interfaces';
import * as Actions from '../../redux/rootAction';
import OtpStyles from '../../styles/authStyles/otp';

const Otp: FC = (props: any) => {
  // Props Variables
  const {navigation} = props;

  // UseState Variables
  const [helperOtp, setHelperOtp] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [otp, setOTP] = useState<string>('');
  const [timer, setTimer] = useState<number>(Constants.OTP_TIMER);

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
  const {StatusCodes} = Enums;
  const {CommonStyles, ButtonStyles} = Styles;
  const biometricAvailable: boolean = biometrics.available;
  const fetchingStatus: boolean = otherReduxStates.fetchingStatus;
  const user: null | Interfaces.UserInterface = appReduxStates.user;
  const userEmail: string = user?.email ?? '';
  const checkForUserEmail: boolean = Boolean(userEmail);
  const userId: number = user?.id ?? Constants.ZERO;
  let intervalId: any,
    userOtp: string = user?.otp?.toString() ?? '';

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
    setHelperOtp(userOtp);

    setIsError(false);

    setOTP('');

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
      <View style={OtpStyles.logoContainer}>
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

  const renderOtp = (): React.JSX.Element => {
    return (
      <View style={Styles.padding(RFPercentage(3.6), 0)}>
        <Text
          style={Styles.textView(
            RFPercentage(3.79),
            'Saira-Bold',
            colors.surface,
            RFPercentage(4.548),
          )}>
          {Constants.CODE_VERIFICATION}
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
          {checkForUserEmail
            ? Constants.OTP_CONTENT.replace(
                /your registered email/g,
                Functions.maskString(userEmail),
              )
            : Constants.OTP_CONTENT}
        </Text>
        {renderOtpInputs()}
      </View>
    );
  };

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
              ? OtpStyles.inputFieldErrorContainer
              : OtpStyles.inputFieldContainer
          }
          keyboardType={Constants.TI_KT_NUMBER_PAD}
          onCodeChanged={(code: string): void => {
            setOTP(code);
          }}
          pinCount={Constants.FOUR}
          style={Styles.imageView(RFPercentage(10), RFPercentage(26))}
        />
        {checkForOtpEmpty && (
          <View style={Styles.padding(RFPercentage(2.5), 0)}>
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
          <View style={Styles.padding(RFPercentage(2.5), 0)}>
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

  const renderVerifyButton = (): React.JSX.Element => {
    const handleVerify = (): void => {
      Keyboard.dismiss();

      const checkForOtp: boolean =
        Boolean(otp) && otp.length == Constants.FOUR && otp == helperOtp;

      if (checkForOtp) {
        setIsError(false);

        handleVerifyAPI();
      } else {
        setIsError(true);
      }
    };

    const handleVerifyAPI = (): void => {
      const requestData: Interfaces.VerifyOtpRequestInterface = {
        otp: Number(otp),
        user_id: userId,
      };

      ENV.currentEnvironment == Constants.DEVELOPMENT &&
        console.log('VERIFY OTP REQUEST DATA::: ', requestData);

      dispatch(
        Actions.verifyOtp(
          requestData,
          (response: Interfaces.APIResponseInterface): void => {
            const responseData: Interfaces.VerifyOtpResponseInterface =
              response.data;

            const responseType: number = response.type;

            switch (responseType) {
              case StatusCodes.SUCCESS:
                const token: string = responseData.token || '';

                const user: Interfaces.UserInterface = responseData.user_data;

                const checkForBiometricsIds: boolean =
                  Functions.handleUserBiometricsIds(user);

                const userId: number = user.id;

                Functions.handleUserLoginAsync(token, userId);

                dispatch(Actions.storeUser(user));

                if (biometricAvailable && !checkForBiometricsIds) {
                  navigation.navigate(Constants.SIGN_IN_WELCOME_BACK, {
                    isNew: true,
                  });
                } else {
                  navigation.navigate(Constants.HOME);
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
          loading={fetchingStatus && !loader}
          mode={Constants.B_MODE_ELEVATED}
          onPress={(): void => {
            handleVerify();
          }}
          style={[
            Styles.backgroundColor(colors.primary),
            ButtonStyles.defaultStyle,
          ]}
          textColor={colors.secondary}>
          {fetchingStatus && !loader ? Constants.LOADING : Constants.VERIFY}
        </Button>
      </View>
    );
  };

  const renderResend = (): React.JSX.Element => {
    const checkForTimer: boolean = timer > Constants.ZERO;

    const handleResendAPI = (): void => {
      setLoader(true);

      const requestData: Interfaces.ResendOtpRequestInterface = {
        user_id: userId,
      };

      ENV.currentEnvironment == Constants.DEVELOPMENT &&
        console.log('RESEND OTP REQUEST DATA::: ', requestData);

      dispatch(
        Actions.resendOtp(
          Endpoints.RESET_PASSWORD,
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
      <View style={OtpStyles.resendContainer}>
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
          <View style={OtpStyles.otpContainer}>
            {renderOtp()}
            <View>
              {renderVerifyButton()}
              {renderResend()}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Otp;
