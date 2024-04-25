import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import Updation from '../../screens/appScreens/Updation';
import ChangePassword from '../../screens/appScreens/changePassword';
import Home from '../../screens/appScreens/home';
import Notifications from '../../screens/appScreens/notifications';
import Profile from '../../screens/appScreens/profile';
import ProfileUpdate from '../../screens/appScreens/profileUpdate';
import Subscribe from '../../screens/appScreens/subscribe';
import Subscriptions from '../../screens/appScreens/subscriptions';
import * as Constants from '../utils/constants';

const AppNavigations = (): React.JSX.Element => {
  // Navigation Variables
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Group>
      <Stack.Screen
        component={ChangePassword}
        name={Constants.CHANGE_PASSWORD}
      />
      <Stack.Screen
        component={Home}
        initialParams={{defaultIndex: null}}
        name={Constants.HOME}
      />
      <Stack.Screen component={Notifications} name={Constants.NOTIFICATIONS} />
      <Stack.Screen
        component={Profile}
        name={Constants.PROFILE}
        options={(): NativeStackNavigationOptions => ({
          gestureEnabled: false,
        })}
      />
      <Stack.Screen component={ProfileUpdate} name={Constants.PROFILE_UPDATE} />
      <Stack.Screen component={Subscribe} name={Constants.SUBSCRIBE} />
      <Stack.Screen
        component={Subscriptions}
        initialParams={{isRenew: false}}
        name={Constants.SUBSCRIPTIONS}
      />
      <Stack.Screen component={Updation} name={Constants.UPDATION} />
    </Stack.Group>
  );
};

export default AppNavigations;
