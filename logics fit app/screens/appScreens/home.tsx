import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  BackHandler,
  Image,
  ImageSourcePropType,
  PermissionsAndroid,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import {
  Appbar,
  BottomNavigation,
  Button,
  Dialog,
  MD3Theme,
  Portal,
  useTheme,
} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import ENV from '../../../env';
import * as Assets from '../../assets';
import Dp from '../../common/components/dp';
import Network from '../../common/components/network';
import * as Styles from '../../common/styles';
import * as Colors from '../../common/utils/colors';
import * as Constants from '../../common/utils/constants';
import * as Functions from '../../common/utils/functions';
import * as Enums from '../../configs/ts/enums';
import * as Interfaces from '../../configs/ts/interfaces';
import * as Actions from '../../redux/rootAction';
import HomeStyles from '../../styles/appStyles/home';
import Cardio from './cardio';
import Dashboard from './dashboard';
import Nutrition from './nutrition';
import Update from './update';
import WorkOut from './workOut';

const Home = (props: any): React.JSX.Element => {
  // Props Variables
  const {navigation, route} = props;
  const defaultIndex: null | number = route?.params?.defaultIndex ?? null;

  // UseState Variables
  const [currentIndex, setCurrentIndex] = useState<number>(Constants.ZERO);
  const [exitAppVisible, setExitAppVisible] = useState<boolean>(false);

  // Other Variables
  const dispatch: any = useDispatch();
  const appReduxStates: Interfaces.AppReducerStateInterface = useSelector(
    (state: Interfaces.RootReducersStateInterface) => state.app,
  );
  const {colors}: MD3Theme = useTheme();
  const {StatusCodes} = Enums;
  const {AppBarStyles, CommonStyles} = Styles;
  const checkForDefaultIndex: boolean =
    Boolean(defaultIndex) || defaultIndex == Constants.ZERO;
  const routes: Interfaces.BottomNavigationRouteInterface[] = [
    {
      disabled: false,
      key: Constants.KEY_DASHBOARD,
      title: Constants.DASHBOARD,
    },
    {
      disabled: false,
      key: Constants.KEY_NUTRITION,
      title: Constants.NUTRITION,
    },
    {
      disabled: false,
      key: Constants.KEY_WORK_OUT,
      title: Constants.WORK_OUT,
    },
    {
      disabled: false,
      key: Constants.KEY_CARDIO,
      title: Constants.CARDIO,
    },
    {disabled: false, key: Constants.KEY_UPDATE, title: Constants.UPDATE},
  ];
  const user: null | Interfaces.UserInterface = appReduxStates.user;
  const newNotificationsCounts: number =
    user?.new_notifications ?? Constants.ZERO;
  const checkForNewNotificationsCounts: boolean = Boolean(
    newNotificationsCounts,
  );
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
    }, [exitAppVisible]),
  );

  useFocusEffect(
    useCallback(() => {
      let isFocus: boolean = true;

      requestNotificationPermission();

      return (): void => {
        isFocus = false;
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      let isFocus: boolean = true;

      if (checkForDefaultIndex) {
        setCurrentIndex(defaultIndex ?? Constants.ZERO);

        setTimeout(() => {
          navigation.setParams({defaultIndex: null});
        }, Constants.THOUSAND);
      }

      return (): void => {
        isFocus = false;
      };
    }, [defaultIndex]),
  );

  // Functions
  const backAction = (): boolean => {
    setExitAppVisible(true);

    return true;
  };

  const requestNotificationPermission = async (): Promise<void> => {
    switch (Platform.OS) {
      case Constants.ANDROID:
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );

        granted == PermissionsAndroid.RESULTS.GRANTED &&
          requestUserPermission();
        break;

      case Constants.IOS:
        requestUserPermission();
        break;

      default:
        break;
    }
  };

  const requestUserPermission = async (): Promise<void> => {
    const authStatus: FirebaseMessagingTypes.AuthorizationStatus =
      await messaging().requestPermission({
        providesAppNotificationSettings: true,
      });

    const enabled: boolean =
      authStatus == messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus == messaging.AuthorizationStatus.PROVISIONAL;

    Boolean(enabled) && getFCMToken();
  };

  const getFCMToken = async (): Promise<void> => {
    const fcmToken: string = await messaging().getToken();

    const checkForFcmToken: boolean = Boolean(fcmToken);

    ENV.currentEnvironment == Constants.DEVELOPMENT &&
      console.log('MESSAGING - FCM TOKEN::: ', fcmToken);

    checkForFcmToken && handleUpdateUserAPI(fcmToken);
  };

  const handleUpdateUserAPI = (fcmToken: string): void => {
    const requestData: Interfaces.UpdateUserRequestInterface = {
      fcm_token: fcmToken,
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
              break;
          }
        },
      ),
    );
  };

  const renderHeader = (): React.JSX.Element => {
    const dp: string = user?.user_image ?? '';

    const name: string = user?.name ?? '';

    const renderDp = (): React.JSX.Element => {
      return (
        <Pressable
          onPress={(): void => {
            navigation.navigate(Constants.PROFILE);
          }}>
          <Dp dp={dp} label={name} size={RFPercentage(4)} />
        </Pressable>
      );
    };

    const renderNotificationIcon = (): React.JSX.Element => {
      return (
        <Pressable
          onPress={(): void => {
            navigation.navigate(Constants.NOTIFICATIONS);
          }}
          style={Styles.padding(RFPercentage(0.4), RFPercentage(0.6))}>
          <Image
            resizeMode={Constants.COVER}
            source={Assets.NOTIFICATION}
            style={Styles.imageView(RFPercentage(2.4), RFPercentage(2.4))}
            tintColor={colors.surface}
          />
          {checkForNewNotificationsCounts && (
            <View
              style={[
                CommonStyles.centered,
                Styles.backgroundColor(colors.primary),
                Styles.imageView(RFPercentage(1.6), RFPercentage(1.6)),
                HomeStyles.newNotificationsCountsContainer,
              ]}>
              <Text
                style={Styles.textView(
                  RFPercentage(0.8),
                  'Roboto-Bold',
                  colors.surface,
                  RFPercentage(0.938),
                  'center',
                )}>
                {newNotificationsCounts}
              </Text>
            </View>
          )}
        </Pressable>
      );
    };

    return (
      <Appbar.Header
        mode={Constants.AB_M_SMALL}
        statusBarHeight={Constants.ZERO}
        style={[
          AppBarStyles.defaultHeaderStyle,
          Styles.padding(RFPercentage(1.6), RFPercentage(0.8)),
        ]}>
        {renderDp()}
        <Appbar.Content
          style={Styles.paddingHorizontal(RFPercentage(1), RFPercentage(1))}
          titleStyle={Styles.textView(
            RFPercentage(2.2),
            'Roboto-Regular',
            colors.surface,
            RFPercentage(2.8),
            'left',
          )}
          title={name}
        />
        {renderNotificationIcon()}
      </Appbar.Header>
    );
  };

  const renderBottomNavigation = (): React.JSX.Element => {
    const handleIndexChange = (index: number): void => {
      const currentRoute: Interfaces.BottomNavigationRouteInterface =
        routes[index];

      const {disabled} = currentRoute;

      !disabled && setCurrentIndex(index);
    };

    const renderIcon = (
      iconProps: Interfaces.BottomNavigationPropertyPropsInterface,
    ): React.ReactNode => {
      const {color, route} = iconProps;

      const disabled: boolean = route.disabled || false;

      let imageSource: ImageSourcePropType;

      switch (route.key) {
        case Constants.KEY_CARDIO:
          imageSource = Assets.CARDIO;
          break;

        case Constants.KEY_DASHBOARD:
        default:
          imageSource = Assets.DASHBOARD;
          break;

        case Constants.KEY_NUTRITION:
          imageSource = Assets.NUTRITION;
          break;

        case Constants.KEY_WORK_OUT:
          imageSource = Assets.WORK_OUT;
          break;

        case Constants.KEY_UPDATE:
          imageSource = Assets.UPDATE;
          break;
      }

      return (
        <Image
          key={route.key}
          source={imageSource}
          style={Styles.imageView(RFPercentage(2.4), RFPercentage(2.4))}
          tintColor={disabled ? colors.surfaceDisabled : color}
        />
      );
    };

    const renderLabel = (
      labelProps: Interfaces.BottomNavigationPropertyPropsInterface,
    ): React.ReactNode => {
      const {color, route} = labelProps;

      const disabled: boolean = route.disabled || false;

      return (
        <Text
          key={route.key}
          style={Styles.textView(
            RFPercentage(1.2),
            'Roboto-Bold',
            disabled ? colors.surfaceDisabled : color,
            RFPercentage(1.6),
            'center',
          )}>
          {route.title}
        </Text>
      );
    };

    const renderScene = (
      sceneProps: Interfaces.BottomNavigationScenePropsInterface,
    ): React.ReactNode => {
      const {route} = sceneProps;

      switch (route.key) {
        case Constants.KEY_CARDIO:
          return <Cardio {...props} />;

        case Constants.KEY_DASHBOARD:
          return <Dashboard {...props} />;

        case Constants.KEY_NUTRITION:
          return <Nutrition {...props} />;

        case Constants.KEY_WORK_OUT:
          return <WorkOut {...props} />;

        case Constants.KEY_UPDATE:
          return <Update {...props} />;

        default:
          return <></>;
      }
    };

    return (
      <BottomNavigation
        activeColor={colors.surface}
        barStyle={[
          Styles.backgroundColor(colors.primary),
          HomeStyles.bottomNavigationBarContainer,
        ]}
        inactiveColor={colors.secondary}
        labeled={true}
        navigationState={{index: currentIndex, routes}}
        onIndexChange={(index: number) => handleIndexChange(index)}
        renderIcon={(
          iconProps: Interfaces.BottomNavigationPropertyPropsInterface,
        ): React.ReactNode => renderIcon(iconProps)}
        renderLabel={(
          labelProps: Interfaces.BottomNavigationPropertyPropsInterface,
        ): React.ReactNode => renderLabel(labelProps)}
        renderScene={(
          sceneProps: Interfaces.BottomNavigationScenePropsInterface,
        ): React.ReactNode => renderScene(sceneProps)}
        shifting={false}
        sceneAnimationEnabled={true}
        sceneAnimationType={Constants.SHIFTING}
        theme={{colors: {secondaryContainer: Colors.TRANSPARENT}}}
      />
    );
  };

  const renderExitApp = (): React.JSX.Element => {
    const onCancel = (): void => {
      setExitAppVisible(false);
    };

    const onOk = (): void => {
      setExitAppVisible(false);

      Functions.handleExitApp();
    };

    return (
      <Portal>
        <Dialog
          onDismiss={(): void => {
            onCancel();
          }}
          style={Styles.backgroundColor(colors.background)}
          visible={exitAppVisible}>
          <Dialog.Title
            style={Styles.textView(
              RFPercentage(1.8),
              'Roboto-Bold',
              colors.primary,
            )}>
            {Constants.EXIT_APP}
          </Dialog.Title>
          <Dialog.Content>
            <Text
              style={Styles.textView(
                RFPercentage(1.4),
                'Roboto-Regular',
                colors.surface,
              )}>
              {Constants.EXIT_APP_TEXT}
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
        {renderBottomNavigation()}
        {renderExitApp()}
      </View>
    </Network>
  );
};

export default Home;
