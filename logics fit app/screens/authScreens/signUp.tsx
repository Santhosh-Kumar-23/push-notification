import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useState} from 'react';
import {
  BackHandler,
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
import {showMessage} from 'react-native-flash-message';
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
import SignUpStyles from '../../styles/authStyles/signUp';

const SignUp: FC = (props: any) => {
  // Props Variables
  const {navigation, route} = props;
  const isBackAlert = route?.params?.isBackAlert ?? false;

  // UseState Variables
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [exitCount, setExitCount] = useState<number>(Constants.ZERO);
  const [isError, setIsError] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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

  const handleUseStatesReset = (): void => {
    setConfirmPassword('');

    setEmail('');

    setIsError(false);

    setName('');

    setPassword('');
  };

  const renderSignUp = (): React.JSX.Element => {
    const renderName = (): React.JSX.Element => {
      const checkForNameEmpty: boolean = !name && isError;

      const checkForNameError: boolean = checkForNameEmpty;

      return (
        <>
          <View
            style={[
              Styles.backgroundColor(colors.surface),
              Styles.borderColor(
                checkForNameError ? colors.error : colors.outline,
              ),
              TextInputStyles.defautContainerStyle,
            ]}>
            <View style={TextInputStyles.defaultIconContainerStyle}>
              {renderIcon(Assets.USER)}
            </View>
            <View style={TextInputStyles.defaultTextInputContainerStyle}>
              <TextInput
                autoCapitalize={Constants.TI_CAP_WORDS}
                autoComplete={Constants.TI_COM_NAME}
                keyboardType={Constants.TI_KT_DEFAULT}
                onChangeText={(txt: string): void => {
                  setName(txt);
                }}
                placeholder={Constants.NAME}
                placeholderTextColor={colors.onSurface}
                style={Styles.textView(
                  RFPercentage(1.4),
                  'Roboto-Regular',
                  colors.inverseSurface,
                  RFPercentage(1.68),
                )}
                value={name}
              />
            </View>
          </View>
          {checkForNameEmpty && (
            <View style={Styles.padding(RFPercentage(2.5), 0)}>
              <Text
                style={Styles.textView(
                  RFPercentage(1.4),
                  'Roboto-Regular',
                  colors.error,
                )}>
                {Constants.NAME_ERROR}
              </Text>
            </View>
          )}
        </>
      );
    };

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
      <View style={SignUpStyles.signUpContainer}>
        <View style={Styles.padding(RFPercentage(3.6), 0)}>
          <Text
            style={Styles.textView(
              RFPercentage(3.79),
              'Saira-Bold',
              colors.surface,
              RFPercentage(4.548),
            )}>
            {Constants.SIGN_UP}
          </Text>
          <View style={Styles.padding(0, RFPercentage(1))}>
            {renderName()}
            {renderEmail()}
            {renderPassword()}
            {renderConfirmPassword()}
          </View>
        </View>
      </View>
    );
  };

  const renderSignUpButton = (): React.JSX.Element => {
    const handleSignUp = (): void => {
      Keyboard.dismiss();

      const checkForName: boolean = Boolean(name);

      const checkForEmail: boolean =
        Boolean(email) && !Functions.handleEmailRegExp(email);

      const checkForPassword: boolean =
        Boolean(password) && !Functions.handlePasswordRegExp(password);

      const checkForConfirmPassword: boolean = confirmPassword == password;

      if (
        checkForName &&
        checkForEmail &&
        checkForPassword &&
        checkForConfirmPassword
      ) {
        setIsError(false);

        handleSignUpAPI();
      } else {
        setIsError(true);
      }
    };

    const handleSignUpAPI = (): void => {
      const requestData: Interfaces.SignUpRequestInterface = {
        confirmPassword,
        email,
        name,
        password,
      };

      ENV.currentEnvironment == Constants.DEVELOPMENT &&
        console.log('REGISTER REQUEST DATA::: ', requestData);

      dispatch(
        Actions.register(
          requestData,
          (response: Interfaces.APIResponseInterface): void => {
            const responseData: Interfaces.SignUpResponseInterface =
              response.data;

            const responseType: number = response.type;

            switch (responseType) {
              case StatusCodes.SUCCESS:
                const user: Interfaces.UserInterface = responseData.user_data;

                dispatch(Actions.storeUser(user));

                navigation.navigate(Constants.OTP);
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
            handleSignUp();
          }}
          style={[
            Styles.backgroundColor(colors.primary),
            ButtonStyles.defaultStyle,
          ]}
          textColor={colors.secondary}>
          {fetchingStatus ? Constants.LOADING : Constants.SIGN_UP}
        </Button>
      </View>
    );
  };

  const renderSignIn = (): React.JSX.Element => {
    return (
      <View style={SignUpStyles.signInContainer}>
        <Text
          style={Styles.textView(
            RFPercentage(1.6),
            'Roboto-Regular',
            colors.surface,
            RFPercentage(2),
            'center',
          )}>
          {Constants.IF_YOU_HAVE_AN_ACCOUNT}
        </Text>
        <Pressable
          onPress={(): void => {
            navigation.navigate(Constants.SIGN_IN);
          }}
          style={Styles.padding(RFPercentage(0.4), 0)}>
          <Text
            style={Styles.textView(
              RFPercentage(1.6),
              'Roboto-Bold',
              colors.primary,
              RFPercentage(2),
            )}>
            {Constants.SIGN_IN_HERE}
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
            {renderSignUp()}
            {renderSignUpButton()}
            {renderSignIn()}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default SignUp;
