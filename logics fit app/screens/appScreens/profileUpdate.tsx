import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Appbar, Button, Divider, MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import ENV from '../../../env';
import Network from '../../common/components/network';
import SkeletonPlaceholder from '../../common/components/skeletonPlaceholder';
import * as Styles from '../../common/styles';
import * as Constants from '../../common/utils/constants';
import * as Functions from '../../common/utils/functions';
import * as Enums from '../../configs/ts/enums';
import * as Interfaces from '../../configs/ts/interfaces';
import * as Actions from '../../redux/rootAction';
import ProfileUpdateStyles from '../../styles/appStyles/profileUpdate';

const ProfileUpdate: FC = (props: any) => {
  // Props Variables
  const {navigation} = props;

  // UseState Variables
  const [dob, setDob] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [weight, setWeight] = useState<string>('');

  // Other Variables
  const dispatch: any = useDispatch();
  const {colors}: MD3Theme = useTheme();
  const {StatusCodes} = Enums;
  const {AppBarStyles, CommonStyles, ButtonStyles} = Styles;
  const appReduxStates: Interfaces.AppReducerStateInterface = useSelector(
    (state: Interfaces.RootReducersStateInterface) => state.app,
  );
  const otherReduxStates: Interfaces.OtherReducerStateInterface = useSelector(
    (state: Interfaces.RootReducersStateInterface) => state.other,
  );
  const fetchingStatus: boolean = otherReduxStates.fetchingStatus;
  const user: null | Interfaces.UserInterface = appReduxStates.user;
  const checkForSubscription: boolean = Functions.handleUserSubscription(user);
  const userDob: string = user?.dob ?? '';
  const userEmail: string = user?.email ?? '';
  const userHeight: string = user?.height ? user.height.toString() : '';
  const userId: number = user?.id ?? Constants.ZERO;
  const userName: string = user?.name ?? '';
  const userWeight: string = user?.weight ? user.weight.toString() : '';
  const loader: boolean = refreshing;

  // Hooks Functions
  useFocusEffect(
    useCallback(() => {
      let isFocus: boolean = true;

      loadUseStates();

      return (): void => {
        isFocus = false;
      };
    }, []),
  );

  // Functions
  const loadUseStates = (): void => {
    setDob(userDob);

    setEmail(userEmail);

    setHeight(userHeight);

    setIsError(false);

    setName(userName);

    setWeight(userWeight);
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
          title={Constants.MY_PROFILE}
        />
      </Appbar.Header>
    );
  };

  const onRefresh = (): void => {
    setRefreshing(true);

    setTimeout(() => {
      loadUseStates();

      setRefreshing(false);
    }, Constants.SET_TIMEOUT_2500);
  };

  const renderUserInfo = (): React.JSX.Element => {
    const renderName = (): React.JSX.Element => {
      const checkForNameEmpty: boolean = !name && isError;

      return (
        <>
          <Text
            style={Styles.textView(
              RFPercentage(1.4),
              'Roboto-Regular',
              colors.onSurface,
              RFPercentage(1.406),
            )}>
            {Constants.NAME}
          </Text>
          <View style={ProfileUpdateStyles.textInputMainContainer}>
            <View style={ProfileUpdateStyles.textInputContainer}>
              <TextInput
                autoCapitalize={Constants.TI_CAP_WORDS}
                autoComplete={Constants.TI_COM_NAME}
                keyboardType={Constants.TI_KT_DEFAULT}
                onChangeText={(txt: string): void => {
                  setName(txt);
                }}
                placeholder={Constants.NAME}
                placeholderTextColor={colors.onTertiary}
                style={[
                  Styles.textView(
                    RFPercentage(1.2),
                    'Roboto-Regular',
                    colors.surface,
                  ),
                  Styles.padding(0, 0),
                ]}
                value={name}
              />
            </View>
            {checkForNameEmpty && renderWarning()}
          </View>
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
          <Text
            style={Styles.textView(
              RFPercentage(1.4),
              'Roboto-Regular',
              colors.onSurface,
              RFPercentage(1.406),
            )}>
            {Constants.EMAIL}
          </Text>
          <View style={ProfileUpdateStyles.textInputMainContainer}>
            <View style={ProfileUpdateStyles.textInputContainer}>
              <TextInput
                autoCapitalize={Constants.TI_CAP_NONE}
                autoComplete={Constants.TI_COM_EMAIL}
                editable={false}
                keyboardType={Constants.TI_KT_EMAIL_ADDRESS}
                onChangeText={(txt: string): void => {
                  setEmail(txt);
                }}
                placeholder={Constants.EMAIL}
                placeholderTextColor={colors.onTertiary}
                style={[
                  Styles.textView(
                    RFPercentage(1.2),
                    'Roboto-Regular',
                    colors.surface,
                  ),
                  Styles.padding(0, 0),
                ]}
                value={email}
              />
            </View>
            {checkForEmailError && renderWarning()}
          </View>
        </>
      );
    };

    const renderDob = (): React.JSX.Element => {
      const checkForDobEmpty: boolean = !dob && isError;

      const checkForValidDob: boolean = Functions.handleDobValidation(dob);

      const checkForDobError: boolean = checkForSubscription
        ? checkForDobEmpty || checkForValidDob
        : false;

      return (
        <>
          <Text
            style={Styles.textView(
              RFPercentage(1.4),
              'Roboto-Regular',
              colors.onSurface,
              RFPercentage(1.406),
            )}>
            {Constants.BIRTH_OF_DATE}
          </Text>
          <View style={ProfileUpdateStyles.textInputMainContainer}>
            <View style={ProfileUpdateStyles.textInputContainer}>
              <TextInput
                autoCapitalize={Constants.TI_CAP_NONE}
                autoComplete={Constants.TI_COM_BIRTH_DATE_FULL}
                editable={checkForSubscription}
                keyboardType={Constants.TI_KT_NUMBER_PAD}
                maxLength={Constants.TEN}
                onChangeText={(txt: string) => {
                  const userDob: string = Functions.handleDob(txt);

                  setDob(userDob);
                }}
                placeholder={Constants.DDMMYYYY}
                placeholderTextColor={colors.onTertiary}
                style={[
                  Styles.textView(
                    RFPercentage(1.2),
                    'Roboto-Regular',
                    colors.surface,
                  ),
                  Styles.padding(0, 0),
                ]}
                value={dob}
              />
            </View>
            {checkForDobError && renderWarning()}
          </View>
        </>
      );
    };

    return !loader ? (
      <View style={ProfileUpdateStyles.cardContainer}>
        {renderName()}
        {renderDivider()}
        {renderEmail()}
        {renderDivider()}
        {renderDob()}
      </View>
    ) : (
      <SkeletonPlaceholder>
        <View style={ProfileUpdateStyles.skeletonUserInfoContainer} />
      </SkeletonPlaceholder>
    );
  };

  const renderHeightWeight = (): React.JSX.Element => {
    const renderHeight = (): React.JSX.Element => {
      const checkForHeightEmpty: boolean = checkForSubscription
        ? !height && isError
        : false;

      return (
        <>
          <Text
            style={Styles.textView(
              RFPercentage(1.4),
              'Roboto-Regular',
              colors.onSurface,
              RFPercentage(1.406),
            )}>
            {Constants.HEIGHT}
          </Text>
          <View style={ProfileUpdateStyles.textInputMainContainer}>
            <View style={ProfileUpdateStyles.textInputContainer}>
              <TextInput
                autoCapitalize={Constants.TI_CAP_NONE}
                autoComplete={Constants.TI_COM_OFF}
                editable={checkForSubscription}
                keyboardType={Constants.TI_KT_NUMBER_PAD}
                maxLength={Constants.THREE}
                onChangeText={(txt: string) => {
                  setHeight(txt);
                }}
                placeholder={Constants.HEIGHT}
                placeholderTextColor={colors.onTertiary}
                style={[
                  Styles.textView(
                    RFPercentage(1.2),
                    'Roboto-Regular',
                    colors.surface,
                  ),
                  Styles.padding(0, 0),
                ]}
                value={height}
              />
            </View>
            {renderUnit(Constants.CM_UNIT)}
            {checkForHeightEmpty && renderWarning()}
          </View>
        </>
      );
    };

    const renderWeight = (): React.JSX.Element => {
      const checkForWeightEmpty: boolean = checkForSubscription
        ? !weight && isError
        : false;

      return (
        <>
          <Text
            style={Styles.textView(
              RFPercentage(1.4),
              'Roboto-Regular',
              colors.onSurface,
              RFPercentage(1.406),
            )}>
            {Constants.WEIGHT}
          </Text>
          <View style={ProfileUpdateStyles.textInputMainContainer}>
            <View style={ProfileUpdateStyles.textInputContainer}>
              <TextInput
                autoCapitalize={Constants.TI_CAP_NONE}
                autoComplete={Constants.TI_COM_OFF}
                editable={checkForSubscription}
                keyboardType={Constants.TI_KT_NUMBER_PAD}
                maxLength={Constants.THREE}
                onChangeText={(txt: string) => {
                  setWeight(txt);
                }}
                placeholder={Constants.WEIGHT}
                placeholderTextColor={colors.onTertiary}
                style={[
                  Styles.textView(
                    RFPercentage(1.2),
                    'Roboto-Regular',
                    colors.surface,
                  ),
                  Styles.padding(0, 0),
                ]}
                value={weight}
              />
            </View>
            {renderUnit(Constants.KG_UNIT)}
            {checkForWeightEmpty && renderWarning()}
          </View>
        </>
      );
    };

    const renderUnit = (unit: string): React.JSX.Element => {
      return (
        <View
          style={[CommonStyles.centered, Styles.padding(RFPercentage(1), 0)]}>
          <Text
            style={Styles.textView(
              RFPercentage(1.4),
              'Roboto-Regular',
              colors.primary,
            )}>
            {unit}
          </Text>
        </View>
      );
    };

    return !loader ? (
      <View
        style={[
          ProfileUpdateStyles.cardContainer,
          Styles.marginVertical(0, RFPercentage(2)),
        ]}>
        {renderHeight()}
        {renderDivider()}
        {renderWeight()}
      </View>
    ) : (
      <SkeletonPlaceholder>
        <View style={ProfileUpdateStyles.skeletonHeightWeightContainer} />
      </SkeletonPlaceholder>
    );
  };

  const renderDivider = (): React.JSX.Element => {
    return <Divider style={Styles.margin(0, RFPercentage(1))} />;
  };

  const renderWarning = (): React.JSX.Element => {
    return (
      <View style={[CommonStyles.centered, Styles.padding(RFPercentage(1), 0)]}>
        <MaterialIcons
          color={colors.error}
          name={Constants.VI_MI_WARNING}
          size={RFPercentage(2)}
        />
      </View>
    );
  };

  const renderUpdateButton = (): React.JSX.Element => {
    const handleUpdate = (): void => {
      Keyboard.dismiss();
      const checkForDob: boolean =
        Boolean(dob) && !Functions.handleDobValidation(dob);

      const checkForName: boolean = Boolean(name);

      const checkForEmail: boolean =
        Boolean(email) && !Functions.handleEmailRegExp(email);

      const checkForHeight: boolean = Boolean(height);

      const checkForWeight: boolean = Boolean(weight);

      const checkForUpdateWithoutSubscription: boolean =
        checkForName && checkForEmail;

      const checkForUpdateWithSubscription: boolean =
        checkForUpdateWithoutSubscription &&
        checkForHeight &&
        checkForWeight &&
        checkForDob;

      const checkForUpdate: boolean = checkForSubscription
        ? checkForUpdateWithSubscription
        : checkForUpdateWithoutSubscription;

      if (checkForUpdate) {
        setIsError(false);

        let requestData: Interfaces.UpdateUserRequestInterface = {
          user_id: userId,
        };

        if (checkForSubscription) {
          requestData = {
            ...requestData,
            dob,
            email,
            height: Number(height),
            name,
            weight: Number(weight),
          };
        } else {
          requestData = {
            ...requestData,
            email,
            name,
          };
        }

        handleUpdateUserAPI(requestData);
      } else {
        setIsError(true);
      }
    };

    const handleUpdateUserAPI = (
      requestData: Interfaces.UpdateUserRequestInterface,
    ): void => {
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
      <View style={ProfileUpdateStyles.buttonContainer}>
        <Button
          contentStyle={ButtonStyles.defaultContentStyle}
          labelStyle={ButtonStyles.defaultLabelStyle}
          loading={fetchingStatus}
          mode={Constants.B_MODE_ELEVATED}
          onPress={(): void => {
            handleUpdate();
          }}
          style={[
            Styles.backgroundColor(colors.primary),
            ButtonStyles.defaultStyle,
          ]}
          textColor={colors.secondary}>
          {fetchingStatus ? Constants.LOADING : Constants.UPDATE}
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
            <View style={ProfileUpdateStyles.container}>
              {renderUserInfo()}
              {renderHeightWeight()}
            </View>
            {renderUpdateButton()}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Network>
  );
};

export default ProfileUpdate;
