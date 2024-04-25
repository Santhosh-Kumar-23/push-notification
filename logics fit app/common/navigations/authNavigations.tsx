import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ForgetPassword from '../../screens/authScreens/forgetPassword';
import OnBoardings from '../../screens/authScreens/onBoardings';
import Otp from '../../screens/authScreens/otp';
import ResetPassword from '../../screens/authScreens/resetPassword';
import SignIn from '../../screens/authScreens/signIn';
import SignInWelcomeBack from '../../screens/authScreens/signInWelcomeBack';
import SignUp from '../../screens/authScreens/signUp';
import Splash from '../../screens/authScreens/splash';
import * as Constants from '../utils/constants';

const AuthNavigations = (): React.JSX.Element => {
  // Navigation Variables
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Group>
      <Stack.Screen
        component={ForgetPassword}
        name={Constants.FORGET_PASSWORD}
      />
      <Stack.Screen component={OnBoardings} name={Constants.ONBOARDINGS} />
      <Stack.Screen component={ResetPassword} name={Constants.RESET_PASSWORD} />
      <Stack.Screen component={Otp} name={Constants.OTP} />
      <Stack.Screen component={SignIn} name={Constants.SIGN_IN} />
      <Stack.Screen
        component={SignInWelcomeBack}
        initialParams={{isBackAlert: false, isNew: false}}
        name={Constants.SIGN_IN_WELCOME_BACK}
      />
      <Stack.Screen
        component={SignUp}
        initialParams={{isBackAlert: false}}
        name={Constants.SIGN_UP}
      />
      <Stack.Screen component={Splash} name={Constants.SPLASH} />
    </Stack.Group>
  );
};

export default AuthNavigations;
