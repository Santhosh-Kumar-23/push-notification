import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import * as ENV from '../../env';
import * as Constants from '../common/utils/constants';
import * as Interfaces from '../configs/ts/interfaces';
import * as Types from '../configs/ts/types';
import * as Actions from '../redux/rootAction';
import Store from '../redux/store';
import Fetch from './Fetch';

class HandleRequestService {
  private async handleRequestHeaders(
    methodType: Types.APIMethodType,
    endPoint: string,
    requestData:
      | FormData
      | null
      | Interfaces.APIRequestDeviceInterface
      | Types.KeyStrValAllType,
    onResponse: Interfaces.APIResponseHandlerInterface,
    showToastPopup: boolean = false,
  ): Promise<void> {
    Store.dispatch(Actions.storeAPIFetchingStatus(true));

    const bearerToken: string =
      (await AsyncStorage.getItem(Constants.BEARER_TOKEN)) || '';

    const checkForRequestData: boolean = Boolean(requestData);

    const checkForFormData: boolean = requestData instanceof FormData;

    ENV.currentEnvironment == Constants.DEVELOPMENT &&
      console.log('JWT TOKEN::: ', bearerToken);

    let requestHeader: Interfaces.APIRequestHeaderInterface = {
      method: methodType,
      headers: {
        Accept: '*/*',
        'Content-Type': checkForFormData
          ? 'multipart/form-data'
          : 'application/json',
        Authorization: Constants.BEARER + ' ' + bearerToken,
      },
    };

    if (checkForRequestData) {
      if (checkForFormData) {
        requestData?.append('device_id', DeviceInfo.getDeviceId());

        requestData?.append('device_type', Platform.OS);
      } else {
        requestData = {
          ...requestData,
          device_id: DeviceInfo.getDeviceId(),
          device_type: Platform.OS,
        };
      }

      ENV.currentEnvironment == Constants.DEVELOPMENT &&
        console.log('REQUEST DATA DEVICE INFO UPDATION::: ', requestData);

      requestHeader.body = checkForFormData
        ? requestData
        : JSON.stringify(requestData);
    }

    Fetch.handleFetchRequest(
      `${ENV.baseURL}${endPoint}`,
      requestHeader,
      onResponse,
      showToastPopup,
    );
  }

  delete = (
    endPoint: string,
    onResponse: Interfaces.APIResponseHandlerInterface,
    showToastPopup: boolean = false,
  ): void => {
    this.handleRequestHeaders(
      Constants.DELETE_METHOD,
      endPoint,
      null,
      onResponse,
      showToastPopup,
    );
  };

  get = (
    endPoint: string,
    requestData:
      | FormData
      | null
      | Interfaces.APIRequestDeviceInterface
      | Types.KeyStrValAllType,
    onResponse: Interfaces.APIResponseHandlerInterface,
    showToastPopup: boolean = false,
  ): void => {
    this.handleRequestHeaders(
      Constants.GET_METHOD,
      endPoint,
      requestData,
      onResponse,
      showToastPopup,
    );
  };

  patch = (
    endPoint: string,
    requestData:
      | FormData
      | Interfaces.APIRequestDeviceInterface
      | Types.KeyStrValAllType,
    onResponse: Interfaces.APIResponseHandlerInterface,
    showToastPopup: boolean = false,
  ): void => {
    this.handleRequestHeaders(
      Constants.PATCH_METHOD,
      endPoint,
      requestData,
      onResponse,
      showToastPopup,
    );
  };

  post = (
    endPoint: string,
    requestData:
      | FormData
      | Interfaces.APIRequestDeviceInterface
      | Types.KeyStrValAllType,
    onResponse: Interfaces.APIResponseHandlerInterface,
    showToastPopup: boolean = false,
  ): void => {
    this.handleRequestHeaders(
      Constants.POST_METHOD,
      endPoint,
      requestData,
      onResponse,
      showToastPopup,
    );
  };

  put = (
    endPoint: string,
    requestData:
      | FormData
      | Interfaces.APIRequestDeviceInterface
      | Types.KeyStrValAllType,
    onResponse: Interfaces.APIResponseHandlerInterface,
    showToastPopup: boolean = false,
  ): void => {
    this.handleRequestHeaders(
      Constants.PUT_METHOD,
      endPoint,
      requestData,
      onResponse,
      showToastPopup,
    );
  };
}

const RequestService: HandleRequestService = new HandleRequestService();

export default RequestService;
