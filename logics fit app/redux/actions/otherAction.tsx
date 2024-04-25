import {OrientationType} from 'react-native-orientation-locker';
import * as Interfaces from '../../configs/ts/interfaces';
import * as ReduxTypes from '../rootTypes';

// Other Actions

export const storeAPIFetchingStatus = (
  fetchingStatus: boolean,
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.FETCHING_STATUS,
    payload: fetchingStatus,
  };
};

export const storeBackOnline = (
  backOnline: boolean,
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.BACK_ONLINE,
    payload: backOnline,
  };
};

export const storeNetworkStatus = (
  networkStatus: boolean,
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.NETWORK_STATUS,
    payload: networkStatus,
  };
};

export const storeOrientationType = (
  orientationType: OrientationType,
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.ORIENTATION_TYPE,
    payload: orientationType,
  };
};
export const storeToastPopup = (
  toastPopup: null | Interfaces.ToastPopupDataInterface,
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.TOAST_POPUP,
    payload: toastPopup,
  };
};
