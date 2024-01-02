/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';

import messaging from '@react-native-firebase/messaging';
import PushNotification,{Importance} from 'react-native-push-notification';
import UploadScreen from './src/screens/UploadScreen';
import Navigation from './src/navigation/navigation';
import {PermissionsAndroid} from 'react-native';

function App() {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  const [state, setState] = useState('Your FCM Token :');

  //forground notification
  PushNotification.createChannel({
    channelId: 'fcm_default_channel',
    channelName: 'push_notification',
    soundName: "default",
    importance: Importance.HIGH,
    vibrate: true,
    playSound: true, // (optional) default: true

  });

  useEffect(() => {
    //backgroound notification and app kill
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      //forefround
      PushNotification.configure({
        onRegister: function (token) {
          console.log('TOKEN:', token);
        },

        onNotification: function (notification) {
          if (notification.foreground) {
            console.log(notification.foreground, 'nottt', remoteMessage);
            PushNotification.localNotification({
              message: remoteMessage.notification.title,
              channelId: 'fcm_default_channel',
              vibrate: true,
            });
          }
        },

        // permissions: {
        //   alert: true,
        //   badge: true,
        //   sound: true,
        // },

        // popInitialNotification: true,

        // requestPermissions: true,
      });
    });
    return unsubscribe;
  }, []);

  //get fcm token

  useEffect(async() => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      setState(fcmToken);
      console.log('FCM TOKEN:::::::::', fcmToken);
    }
  },[]);

  return (
    <View style={Styles.Cointainer}>
      <StatusBar backgroundColor={'ghostwhite'} barStyle={'dark-content'} />
      <Navigation />
      {/* <Text style={Styles.paragraph}>
        Push Notification With firebase configuration
      </Text> */}

      {/* <TouchableOpacity style={Styles.touch} onPress={() => checkToken()}>
        <Text style={{color: 'white', textAlign: 'center'}}>Get Fcm Token</Text>
      </TouchableOpacity> */}

      {/* <Text
        style={[
          Styles.paragraph,
          {
            fontSize: 10,
            color: 'black',
            marginHorizontal: 20,
            marginVertical: 20,
          },
        ]}>
        {state}
      </Text> */}

      {/* <UploadScreen /> */}
    </View>
  );
}

const Styles = StyleSheet.create({
  Cointainer: {
    flex: 1,
  },
  touch: {
    backgroundColor: 'blue',
    padding: 10,
    elevation: 5,
    width: '100%',
    marginVertical: 20,
    // borderRadius: 5,
    // marginLeft:100
  },
  paragraph: {
    textAlign: 'center',
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default App;
