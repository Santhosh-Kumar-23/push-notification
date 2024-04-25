import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Button, MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import ENV from '../../../env';
import * as Assets from '../../assets';
import AuthHeader from '../../common/components/authHeader';
import AuthScreenBackground from '../../common/components/authScreenBackground';
import * as Styles from '../../common/styles';
import * as Constants from '../../common/utils/constants';
import * as Functions from '../../common/utils/functions';
import * as Enums from '../../configs/ts/enums';
import * as Interfaces from '../../configs/ts/interfaces';
import * as Actions from '../../redux/rootAction';
import ForgetPasswordStyles from '../../styles/authStyles/forgetPassword';

const ForgetPassword: FC = (props: any) => {
  // Props Variables
  const {navigation} = props;

  // UseState Variables
  const [email, setEmail] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  // Other Variables
  const dispatch: any = useDispatch();
  const otherReduxStates: Interfaces.OtherReducerStateInterface = useSelector(
    (state: Interfaces.RootReducersStateInterface) => state.other,
  );
  const {colors}: MD3Theme = useTheme();
  const {StatusCodes} = Enums;
  const {ButtonStyles, CommonStyles, TextInputStyles} = Styles;
  const fetchingStatus: boolean = otherReduxStates.fetchingStatus;

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

  // Functions
  const handleUseStatesReset = (): void => {
    setEmail('');

    setIsError(false);
  };

  const renderForgetPassword = (): React.JSX.Element => {
    const renderEmail = (): React.JSX.Element => {
      const checkForEmailEmpty: boolean = !email && isError;

      const checkForValidEmail: boolean =
        Boolean(email) && Functions.handleEmailRegExp(email);

      const checkForEmailError: boolean =
        checkForEmailEmpty || checkForValidEmail;

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

    return (
      <View style={ForgetPasswordStyles.forgetPasswordContainer}>
        <View style={Styles.padding(RFPercentage(3.6), 0)}>
          <Text
            style={Styles.textView(
              RFPercentage(3.79),
              'Saira-Bold',
              colors.surface,
              RFPercentage(4.548),
            )}>
            {Constants.FORGET_PASSWORD}
          </Text>
          <View style={Styles.padding(0, RFPercentage(1))}>
            {renderEmail()}
          </View>
        </View>
      </View>
    );
  };

  const renderSendButton = (): React.JSX.Element => {
    const handleSend = (): void => {
      Keyboard.dismiss();

      const checkForEmail: boolean =
        Boolean(email) && !Functions.handleEmailRegExp(email);

      if (checkForEmail) {
        setIsError(false);

        handleSendAPI();
      } else {
        setIsError(true);
      }
    };

    const handleSendAPI = (): void => {
      const requestData: Interfaces.ForgotPasswordRequestInterface = {
        email,
      };

      ENV.currentEnvironment == Constants.DEVELOPMENT &&
        console.log('FORGOT PASSWORD REQUEST DATA::: ', requestData);

      dispatch(
        Actions.forgetPassword(
          requestData,
          (response: Interfaces.APIResponseInterface): void => {
            const responseData: Interfaces.ForgotPasswordResponseInterface =
              response.data;

            const responseType: number = response.type;

            switch (responseType) {
              case StatusCodes.SUCCESS:
                const resetOtp: number = responseData.otp;

                const forgotPassword: Interfaces.ForgotPasswordInterface = {
                  email,
                  otp: resetOtp,
                };

                dispatch(Actions.storeForgotPassword(forgotPassword));

                navigation.navigate(Constants.RESET_PASSWORD);
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
            handleSend();
          }}
          style={[
            Styles.backgroundColor(colors.primary),
            ButtonStyles.defaultStyle,
          ]}
          textColor={colors.secondary}>
          {fetchingStatus ? Constants.LOADING : Constants.SEND}
        </Button>
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
            <AuthHeader />
            {renderForgetPassword()}
            {renderSendButton()}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default ForgetPassword;
