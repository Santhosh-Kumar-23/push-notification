import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import * as Constants from '../utils/constants';

const useAppNotificationPermission = (): boolean => {
  // UseState Variables
  const [appNotificationPermission, setAppNotificationPermission] =
    useState<boolean>(false);

  useEffect(() => {
    switch (Platform.OS) {
      case Constants.ANDROID:
      case Constants.IOS:
        messaging()
          .hasPermission()
          .then((authStatus: FirebaseMessagingTypes.AuthorizationStatus) => {
            const enabled: boolean =
              authStatus == messaging.AuthorizationStatus.AUTHORIZED ||
              authStatus == messaging.AuthorizationStatus.PROVISIONAL;

            setAppNotificationPermission(enabled);
          });
        break;

      default:
        setAppNotificationPermission(false);
        break;
    }
  });

  return appNotificationPermission;
};

export default useAppNotificationPermission;
