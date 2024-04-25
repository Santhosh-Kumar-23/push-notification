import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback} from 'react';
import {Image, View} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import {MD3Theme, useTheme} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
import ENV from '../../../env';
import * as Assets from '../../assets';
import * as Styles from '../../common/styles';
import * as Constants from '../../common/utils/constants';
import * as Functions from '../../common/utils/functions';
import * as AppConfigs from '../../configs/appConfigs';
import * as Enums from '../../configs/ts/enums';
import * as Interfaces from '../../configs/ts/interfaces';
import * as Actions from '../../redux/rootAction';
import SplashStyles from '../../styles/authStyles/splash';

const Splash: FC = (props: any) => {
  // Props Variables
  const {navigation} = props;

  // Other Variables
  const {colors}: MD3Theme = useTheme();
  const RnBiometrics = new ReactNativeBiometrics(AppConfigs.biomerticsConfigs);
  const {StatusCodes} = Enums;
  const {CommonStyles} = Styles;

  // Hooks Functions
  useFocusEffect(
    useCallback(() => {
      let isFocus: boolean = true;

      getDetailsAPI();

      return (): void => {
        isFocus = false;
      };
    }, []),
  );

  // Functions
  const getDetailsAPI = async (): Promise<void> => {
    const bearerToken: string =
      (await AsyncStorage.getItem(Constants.BEARER_TOKEN)) || '';
    const checkForBearerToken: boolean = Boolean(bearerToken);

    ENV.currentEnvironment == Constants.DEVELOPMENT &&
      console.log('ASYNC JWT TOKEN::: ', bearerToken);

    let isOnBoardComplete: boolean | string =
      (await AsyncStorage.getItem(Constants.IS_ON_BOARD_COMPLETE)) || false;
    isOnBoardComplete = isOnBoardComplete ? Boolean(isOnBoardComplete) : false;

    ENV.currentEnvironment == Constants.DEVELOPMENT &&
      console.log('ASYNC IS ON BOARD COMPLETE::: ', isOnBoardComplete);

    let userId: null | number | string = await AsyncStorage.getItem(
      Constants.USER_ID,
    );
    userId = userId ? Number(userId) : null;
    const checkForUserId: boolean = Boolean(userId);

    ENV.currentEnvironment == Constants.DEVELOPMENT &&
      console.log('ASYNC USER ID::: ', userId);

    const checkForLoginStatus: boolean = checkForBearerToken && checkForUserId;

    ENV.currentEnvironment == Constants.DEVELOPMENT &&
      console.log('USER LOGIN STATUS::: ', checkForLoginStatus);

    if (isOnBoardComplete && !checkForLoginStatus) {
      navigation.navigate(Constants.SIGN_IN);
    } else {
      const requestData: Interfaces.GetDetailsRequestInterface = {
        user_id: userId,
      };

      ENV.currentEnvironment == Constants.DEVELOPMENT &&
        console.log('GET DETAILS REQUEST DATA::: ', requestData);

      props.getDetails(
        requestData,
        async (response: Interfaces.APIResponseInterface): Promise<void> => {
          const responseData: Interfaces.GetDetailsResponseInterface =
            response.data;

          const responseType: number = response.type;

          switch (responseType) {
            case StatusCodes.SUCCESS:
              if (checkForUserId) {
                const biometrics: Interfaces.BiometricsDetailsInterface =
                  await RnBiometrics.isSensorAvailable();

                const biometricAvailable: boolean =
                  biometrics?.available ?? false;

                const token: string = responseData.token || '';

                const user: Interfaces.UserInterface = responseData.user_data;

                const checkForBiometricsIds: boolean =
                  Functions.handleUserBiometricsIds(user);

                Functions.handleUserLoginAsync(token, userId);

                props.storeUser(user);

                if (biometricAvailable && checkForBiometricsIds) {
                  navigation.navigate(Constants.SIGN_IN_WELCOME_BACK, {
                    isBackAlert: true,
                    isNew: false,
                  });
                } else {
                  navigation.navigate(Constants.HOME);
                }
              } else {
                const onBoardings: Interfaces.OnBoardDataInterface[] =
                  responseData.intro_sliders || [];

                props.storeOnBoardings(onBoardings);

                navigation.navigate(Constants.ONBOARDINGS);
              }
              break;

            default:
              break;
          }
        },
      );
    }
  };

  return (
    <View style={Styles.screenContainer(colors.background)}>
      <View style={CommonStyles.screenSubContainer}>
        <View style={SplashStyles.screenCenter}>
          <Image
            resizeMode={Constants.CONTAIN}
            source={Assets.LOGO}
            style={Styles.imageView(RFPercentage(18.3), RFPercentage(19))}
          />
        </View>
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch: any): any => {
  return {
    getDetails: (
      requestData: Interfaces.GetDetailsRequestInterface,
      onResponse: Interfaces.APIResponseHandlerInterface,
    ): void => {
      dispatch(Actions.getDetails(requestData, onResponse));
    },
    storeOnBoardings: (
      onBoardings: Interfaces.OnBoardDataInterface[],
    ): void => {
      dispatch(Actions.storeOnBoardings(onBoardings));
    },
    storeUser: (user: null | Interfaces.UserInterface): void => {
      dispatch(Actions.storeUser(user));
    },
  };
};

export default connect(null, mapDispatchToProps)(Splash);
