/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {createContext, useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import PushNotification from 'react-native-push-notification';
import AboutScreen from './src/deepLinkingScreens/aboutScreen';
import HomeScreen from './src/deepLinkingScreens/homeScreen';
import SettingsScreen from './src/deepLinkingScreens/settingScreen';

export const NotificationContext = createContext();

function App() {
  const [notificationPaylaod, setNoticationPaylaod] = useState();
  const Stack = createStackNavigator();

  //notification pop up permission (Initial)
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  useEffect(() => {
    backgroundNotification();
    foregroundNotification();
    getFcmToken();
  }, []);

  //you should create channel for foreground notification (mandatory)

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('FCM TOKEN:::::::::', fcmToken);
    } else {
      console.log('No fcm token');
    }
  };

  const backgroundNotification = () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  };

  const foregroundNotification = async () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // (required) if you print message in foreground
      PushNotification.createChannel(
        {
          channelId: 'fcm_default_channel',
          channelName: 'push_notification',
        },
        () => {},
      );

      console.log('Foreground', remoteMessage);
      Boolean(remoteMessage?.notification) &&
        PushNotification.localNotification({
          message: remoteMessage.notification.title,
          title: remoteMessage.notification?.title,
          channelId: 'fcm_default_channel',
        });

      // (optional) Called when Token is generated (iOS and Android)
    });
    return unsubscribe;
  };

  //deep linking set up
  const linking = {
    prefixes: ['myapp://'],
    config: {
      initialRouteName: 'Home',
      screens: {
        settings: 'settings',
        about: 'about',
      },
    },

    async getInitialURL() {
      const message = await messaging().getInitialNotification();
      console.log('MESSAGE', message);
      setNoticationPaylaod(message);

      return message?.data?.link;
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <NotificationContext.Provider
        value={{notificationPaylaod, setNoticationPaylaod}}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="settings" component={SettingsScreen} />
          <Stack.Screen name="about" component={AboutScreen} />
        </Stack.Navigator>
      </NotificationContext.Provider>
    </NavigationContainer>
  );
}

export default App;
