import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useState} from 'react';
import {
  Image,
  ImagePropsBase,
  ImageSourcePropType,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Appbar, Button, MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import ENV from '../../../env';
import * as Assets from '../../assets';
import Network from '../../common/components/network';
import SkeletonPlaceholder from '../../common/components/skeletonPlaceholder';
import * as Styles from '../../common/styles';
import * as Constants from '../../common/utils/constants';
import * as Functions from '../../common/utils/functions';
import * as Enums from '../../configs/ts/enums';
import * as Interfaces from '../../configs/ts/interfaces';
import * as Actions from '../../redux/rootAction';
import ChangePasswordStyles from '../../styles/appStyles/changePassword';

const ChangePassword: FC = (props: any) => {
  // Props Variables
  const {navigation} = props;

  // UseState Variables
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
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
  const {AppBarStyles, ButtonStyles, CommonStyles, TextInputStyles} = Styles;
  const fetchingStatus: boolean = otherReduxStates.fetchingStatus;
  const loader: boolean = refreshing;
  const user: null | Interfaces.UserInterface = appReduxStates.user;

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
    setConfirmPassword('');

    setCurrentPassword('');

    setIsError(false);

    setPassword('');
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
          title={Constants.CHANGE_PASSWORD}
        />
      </Appbar.Header>
    );
  };

  const onRefresh = (): void => {
    setRefreshing(true);

    setTimeout(() => {
      handleUseStatesReset();

      setRefreshing(false);
    }, Constants.SET_TIMEOUT_2500);
  };

  const renderChangePassword = (): React.JSX.Element => {
    const renderCurrentPassword = (): React.JSX.Element => {
      const checkForCurrentPasswordEmpty: boolean = !currentPassword && isError;

      const checkForValidCurrentPassword: boolean =
        Boolean(currentPassword) &&
        Functions.handlePasswordRegExp(currentPassword);

      const checkForCurrentPasswordError: boolean =
        checkForCurrentPasswordEmpty || checkForValidCurrentPassword;

      return (
        <View style={Styles.padding(0, RFPercentage(1))}>
          {!loader ? (
            <Text
              style={Styles.textView(
                RFPercentage(1.8),
                'Roboto-Bold',
                colors.surface,
                RFPercentage(1.875),
              )}>
              {Constants.CURRENT_PASSWORD}
            </Text>
          ) : (
            <SkeletonPlaceholder>
              <View style={ChangePasswordStyles.skeletonLabelContainer} />
            </SkeletonPlaceholder>
          )}
          <View style={Styles.padding(0, RFPercentage(1))}>
            {!loader ? (
              <>
                <View
                  style={[
                    Styles.backgroundColor(colors.surface),
                    Styles.borderColor(
                      checkForCurrentPasswordError
                        ? colors.error
                        : colors.outline,
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
                        setCurrentPassword(txt);
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
                      value={currentPassword}
                    />
                  </View>
                </View>
                {checkForCurrentPasswordEmpty && (
                  <View style={Styles.padding(RFPercentage(2.5), 0)}>
                    <Text
                      style={Styles.textView(
                        RFPercentage(1.4),
                        'Roboto-Regular',
                        colors.error,
                      )}>
                      {Constants.CURRENT_PASSWORD_ERROR}
                    </Text>
                  </View>
                )}
                {checkForValidCurrentPassword && (
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
            ) : (
              <SkeletonPlaceholder>
                <View style={ChangePasswordStyles.skeletonTextInputContainer} />
              </SkeletonPlaceholder>
            )}
          </View>
        </View>
      );
    };

    const renderNewPassword = (): React.JSX.Element => {
      const renderPassword = (): React.JSX.Element => {
        const checkForPasswordEmpty: boolean = !password && isError;

        const checkForValidPassword: boolean =
          Boolean(password) && Functions.handlePasswordRegExp(password);

        const checkForPasswordError: boolean =
          checkForPasswordEmpty || checkForValidPassword;

        return !loader ? (
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
        ) : (
          <SkeletonPlaceholder>
            <View style={ChangePasswordStyles.skeletonTextInputContainer} />
          </SkeletonPlaceholder>
        );
      };

      const renderConfirmPassword = (): React.JSX.Element => {
        const checkForConfirmPassword: boolean = Boolean(confirmPassword);

        const checkForConfirmPasswordEmpty: boolean =
          !confirmPassword && isError;

        const checkForEqualPassword: boolean =
          checkForConfirmPassword && confirmPassword == password;

        const checkForValidConfirmPassword: boolean =
          checkForConfirmPassword &&
          password.length >= Constants.EIGHT &&
          !checkForEqualPassword;

        const checkForConfirmPasswordError: boolean =
          checkForConfirmPasswordEmpty || checkForValidConfirmPassword;

        return !loader ? (
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
        ) : (
          <SkeletonPlaceholder>
            <View style={ChangePasswordStyles.skeletonTextInputContainer} />
          </SkeletonPlaceholder>
        );
      };

      return (
        <View style={Styles.padding(0, RFPercentage(1))}>
          {!loader ? (
            <Text
              style={Styles.textView(
                RFPercentage(1.8),
                'Roboto-Bold',
                colors.surface,
                RFPercentage(1.875),
              )}>
              {Constants.NEW_PASSWORD}
            </Text>
          ) : (
            <SkeletonPlaceholder>
              <View style={ChangePasswordStyles.skeletonLabelContainer} />
            </SkeletonPlaceholder>
          )}
          <View style={Styles.padding(0, RFPercentage(1))}>
            {renderPassword()}
            {renderConfirmPassword()}
          </View>
        </View>
      );
    };

    return (
      <View style={ChangePasswordStyles.container}>
        {renderCurrentPassword()}
        {renderNewPassword()}
      </View>
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

  const renderChangeButton = (): React.JSX.Element => {
    const handleChange = (): void => {
      Keyboard.dismiss();

      const checkForCurrentPassword: boolean =
        Boolean(currentPassword) &&
        !Functions.handlePasswordRegExp(currentPassword);

      const checkForPassword: boolean =
        Boolean(password) && !Functions.handlePasswordRegExp(password);

      const checkForConfirmPassword: boolean = confirmPassword == password;

      if (
        checkForCurrentPassword &&
        checkForPassword &&
        checkForConfirmPassword
      ) {
        setIsError(false);

        handleChangeAPI();
      } else {
        setIsError(true);
      }
    };

    const handleChangeAPI = (): void => {
      const userId: number = user?.id ?? Constants.ZERO;

      const requestData: Interfaces.ChangePasswordRequestInterface = {
        confirmPassword,
        oldPassword: currentPassword,
        password,
        user_id: userId,
      };

      ENV.currentEnvironment == Constants.DEVELOPMENT &&
        console.log('CHANGE PASSWORD REQUEST DATA::: ', requestData);

      dispatch(
        Actions.changePassword(
          requestData,
          (response: Interfaces.APIResponseInterface): void => {
            const responseType: number = response.type;

            switch (responseType) {
              case StatusCodes.SUCCESS:
                navigation.pop();
                break;

              default:
                break;
            }
          },
        ),
      );
    };

    return !loader ? (
      <View style={ChangePasswordStyles.buttonContainer}>
        <Button
          contentStyle={ButtonStyles.defaultContentStyle}
          labelStyle={ButtonStyles.defaultLabelStyle}
          loading={fetchingStatus}
          mode={Constants.B_MODE_ELEVATED}
          onPress={(): void => {
            handleChange();
          }}
          style={[
            Styles.backgroundColor(colors.primary),
            ButtonStyles.defaultStyle,
          ]}
          textColor={colors.secondary}>
          {fetchingStatus ? Constants.LOADING : Constants.CHANGE}
        </Button>
      </View>
    ) : (
      <View style={Styles.margin(RFPercentage(3.6), RFPercentage(0.9))}>
        <SkeletonPlaceholder>
          <View style={CommonStyles.skeletonButtonContainer} />
        </SkeletonPlaceholder>
      </View>
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
          style={CommonStyles.defaultFlex}>
          <ScrollView
            contentContainerStyle={CommonStyles.defaultFlexGrow}
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
            {renderChangePassword()}
            {renderChangeButton()}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Network>
  );
};

export default ChangePassword;
