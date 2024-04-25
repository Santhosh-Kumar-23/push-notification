import AsyncStorage from '@react-native-async-storage/async-storage';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import moment from 'moment';
import {BackHandler, PermissionsAndroid, Platform} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import ImageCropPicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import PushNotification from 'react-native-push-notification';
import ENV from '../../../env';
import * as AppConfigs from '../../configs/appConfigs';
import * as Enums from '../../configs/ts/enums';
import * as Interfaces from '../../configs/ts/interfaces';
import * as Actions from '../../redux/rootAction';
import Store from '../../redux/store';
import * as Constants from './constants';
import * as HelperNavigation from './helperNavigation';

export const acronym = (txt: string): string => {
  return txt
    .match(/(?<=(\s|^))[a-z]/gi)!
    .join('')
    .toUpperCase();
};

export const clearAsyncStorageAndRedux = async (): Promise<void> => {
  let keys: readonly string[] = await AsyncStorage.getAllKeys();

  keys = keys.filter(
    (lol: string) => !Constants.EXCEPTION_KEYS_FOR_ASYNC_STORAGE.includes(lol),
  );

  await AsyncStorage.multiRemove(keys);

  Store.dispatch(Actions.clearReduxStates());
};

export const checkForAppNotificationPermission = (): boolean => {
  let permissionGranted: boolean = false;

  switch (Platform.OS) {
    case Constants.ANDROID:
      (async (): Promise<void> => {
        permissionGranted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      })();
      break;

    default:
      permissionGranted = false;
      break;
  }

  return permissionGranted;
};

export const convertUnit = (value: number, conversionUnit: string): number => {
  let convertedValue: number;

  switch (conversionUnit) {
    case Constants.FT_UNIT:
      convertedValue = Math.round(value * Constants.FEET_VALUE);
      break;

    case Constants.LBS_UNIT:
      convertedValue = Math.round(value * Constants.LBS_VALUE);
      break;

    default:
      convertedValue = value;
      break;
  }

  return convertedValue;
};

export const displayNotification = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
): Promise<void> => {
  PushNotification.createChannel(
    {
      channelId: Constants.DEFAULT,
      channelName: Constants.DEFAULT_CHANNEL,
    },
    () => {},
  );

  Boolean(remoteMessage?.notification) &&
    PushNotification.localNotification({
      channelId: Constants.DEFAULT,
      title: remoteMessage.notification?.title ?? Constants.NOTIFICATIONS,
      message: remoteMessage.notification?.body ?? Constants.NOTIFICATIONS,
      ...remoteMessage,
    });
};

export const handleDob = (
  text: string,
  separator: string = Constants.FORWARD_SLASH_SYM,
): string => {
  const updatedTest: string = text.replace(/\D/g, '').slice(0, 8);

  const reg: RegExp = /^(\d{2})?(\d{2})?(\d{0,4})?/;

  const dob: string = updatedTest.replace(
    reg,
    (_: string, dd: any, mm: any, yyyy: any) => {
      let dob = '';

      if (dd) dob += dd + separator;

      if (mm) dob += mm + separator;

      if (yyyy) dob += yyyy;

      return dob;
    },
  );

  return dob;
};

export const handleDobValidation = (
  dob: string,
  format: string = Constants.DDMMYYYY,
): boolean => {
  const checkForValidDob: boolean = Boolean(dob)
    ? moment(dob, format).isAfter(moment()) || !moment(dob, format).isValid()
    : false;

  return checkForValidDob;
};

export const handleEmailRegExp = (txt: string): boolean => {
  const reg: RegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return !reg.test(txt);
};

export const handleExitApp = (): void => {
  switch (Platform.OS) {
    case Constants.ANDROID:
      BackHandler.exitApp();
      break;

    case Constants.IOS:
      RNExitApp.exitApp();
      break;

    default:
      break;
  }
};

export const handleNotificationRedirections = async (
  notificationData:
    | Interfaces.NotificationCardDataInterface
    | {[key: string]: string | object}
    | null,
): Promise<void> => {
  const type: string | object = notificationData?.type ?? '';

  switch (type) {
    case Constants.CARDIO:
      HelperNavigation.navigate(Constants.HOME, {
        defaultIndex: Constants.THREE,
      });
      break;

    case Constants.NUTRITION:
      HelperNavigation.navigate(Constants.HOME, {defaultIndex: Constants.ONE});
      break;

    case Constants.WORK_OUT:
      HelperNavigation.navigate(Constants.HOME, {defaultIndex: Constants.TWO});
      break;

    default:
      HelperNavigation.navigate(Constants.NOTIFICATIONS);
      break;
  }
};

export const handlePasswordRegExp = (txt: string): boolean => {
  const reg: RegExp = /[0-9a-zA-Z]{8,}/;

  return !reg.test(txt);
};

export const handleUserBiometricsIds = (
  user: null | Interfaces.UserInterface,
): boolean => {
  const faceId: boolean = user?.face_id ?? false;

  const touchId: boolean = user?.touch_id ?? false;

  const checkForBiometricsIds: boolean =
    Platform.OS == Constants.IOS ? faceId || touchId : touchId;

  return checkForBiometricsIds;
};

export const handleUserLoginAsync = (
  token: string,
  userId: null | number | string,
): void => {
  const checkForToken: boolean = Boolean(token);

  const checkForUserId: boolean = Boolean(userId);

  checkForToken && AsyncStorage.setItem(Constants.BEARER_TOKEN, token);

  checkForUserId &&
    AsyncStorage.setItem(Constants.USER_ID, JSON.stringify(userId));
};

export const handleUserSubscription = (
  user: null | Interfaces.UserInterface,
): boolean => {
  const subscription: null | Interfaces.SubscriptionCardDataInterface =
    user?.subscription ?? null;

  const checkForSubscription: boolean =
    Boolean(subscription) &&
    Object.keys({...subscription}).length > Constants.ZERO;

  const subscriptionStatus: null | string = user?.subscription_status ?? null;

  const checkForSubscriptionStatus: boolean =
    Boolean(subscriptionStatus) && subscriptionStatus == Constants.SUBSCRIBED;

  const checkForUserSubscription: boolean =
    checkForSubscription && checkForSubscriptionStatus;

  return checkForUserSubscription;
};

export const maskString = (
  value: string,
  maskCharacter: string = Constants.START_SYM,
): string => {
  const reg: RegExp = /^(.)(.*)(.@.*)$/;

  const maskedValue: string = value.replace(
    reg,
    (_: string, a: any, b: any, c: any) =>
      a + b.replace(/./g, maskCharacter) + c,
  );

  return maskedValue;
};

export const openGallery = (
  imagePickerConfigs: any,
  onUpload: (files: any) => void,
): void => {
  const {StatusCodes} = Enums;

  const handleMultipleFiles = (response: ImageOrVideo[]): void => {
    const files: ImageOrVideo[] = response;

    const checkForFileSizes: boolean = files.every(
      (fileData: ImageOrVideo): boolean => {
        const fileSize: number = fileData.size;

        const fileSizeInMB: number =
          fileSize /
          Constants.THOUSAND_TWENTY_FOUR /
          Constants.THOUSAND_TWENTY_FOUR;

        const checkForFileSize: boolean = fileSizeInMB < Constants.FIVE;

        return checkForFileSize;
      },
    );

    if (checkForFileSizes) {
      let customFiles: Interfaces.FileDataInterface[] = [];

      files.flatMap((fileData: ImageOrVideo) => {
        const fileName: string =
          fileData.filename ||
          fileData.path.split('/').pop() ||
          Constants.PROFILE_PIC;

        const fileSize: number = fileData.size;

        const customFileData: Interfaces.FileDataInterface = {
          date: fileData.modificationDate || fileData.creationDate,
          fileDetails: fileData,
          name: fileName,
          size: fileSize,
          type: fileData.mime,
          uri: fileData.path,
        };

        customFiles.push(customFileData);
      });

      ENV.currentEnvironment == Constants.DEVELOPMENT &&
        console.log('CUSTOM FILES::: ', JSON.stringify(customFiles));

      onUpload(customFiles);
    } else {
      const toastPopupData: Interfaces.ToastPopupDataInterface = {
        message: Constants.FILE_SIZE_ERROR,
        title: Constants.ERROR,
        type: StatusCodes.ERROR,
      };

      Store.dispatch(Actions.storeToastPopup(toastPopupData));
    }
  };

  const handleSingleFile = (response: ImageOrVideo): void => {
    const fileData: ImageOrVideo = response;

    const fileName: string =
      fileData.filename ||
      fileData.path.split('/').pop() ||
      Constants.PROFILE_PIC;

    const fileSize: number = fileData.size;

    const fileSizeInMB: number =
      fileSize /
      Constants.THOUSAND_TWENTY_FOUR /
      Constants.THOUSAND_TWENTY_FOUR;

    const checkForFileSize: boolean = fileSizeInMB < Constants.FIVE;

    if (checkForFileSize) {
      const customFileData: Interfaces.FileDataInterface = {
        date: fileData.modificationDate || fileData.creationDate,
        fileDetails: fileData,
        name: fileName,
        size: fileSize,
        type: fileData.mime,
        uri: fileData.path,
      };

      ENV.currentEnvironment == Constants.DEVELOPMENT &&
        console.log('CUSTOM FILE DATA::: ', customFileData);

      onUpload(customFileData);
    } else {
      const toastPopupData: Interfaces.ToastPopupDataInterface = {
        message: Constants.FILE_SIZE_ERROR,
        title: Constants.ERROR,
        type: StatusCodes.ERROR,
      };

      Store.dispatch(Actions.storeToastPopup(toastPopupData));
    }
  };

  ImageCropPicker.openPicker({
    ...AppConfigs.imagePickerConfigs,
    ...imagePickerConfigs,
  })
    .then((response: any): void | PromiseLike<void> => {
      ENV.currentEnvironment == Constants.DEVELOPMENT &&
        console.log('GALLERY RESPONSE::: ', response);

      const checkForMultiple: boolean = imagePickerConfigs?.multiple ?? false;

      if (checkForMultiple) {
        handleMultipleFiles(response);
      } else {
        handleSingleFile(response);
      }
    })
    .catch((error: any) => {
      const errorCode: string = error?.code ?? '';

      switch (errorCode) {
        case 'E_PICKER_CANCELLED':
          break;

        default:
          const checkForErrorCode: boolean = Boolean(errorCode);

          const toastPopupData: Interfaces.ToastPopupDataInterface = {
            message: `${JSON.stringify(error)}${
              checkForErrorCode
                ? `\n\n${Constants.ERROR_CODE}: ${errorCode}`
                : ''
            }`,
            title: Constants.ERROR,
            type: StatusCodes.ERROR,
          };

          Store.dispatch(Actions.storeToastPopup(toastPopupData));
          break;
      }
    });
};
