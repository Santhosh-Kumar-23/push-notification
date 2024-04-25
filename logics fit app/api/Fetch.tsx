import {CommonActions} from '@react-navigation/native';
import ENV from '../../env';
import * as Constants from '../common/utils/constants';
import * as Functions from '../common/utils/functions';
import * as HelperNavigation from '../common/utils/helperNavigation';
import * as Enums from '../configs/ts/enums';
import * as Interfaces from '../configs/ts/interfaces';
import * as Actions from '../redux/rootAction';
import Store from '../redux/store';

class HandleFetchRequest {
  handleFetchRequest = (
    endPoint: string,
    headers: Interfaces.APIRequestHeaderInterface,
    onResponse: Interfaces.APIResponseHandlerInterface,
    showToastPopup: boolean,
  ): void => {
    // Other Variables
    const {StatusCodes} = Enums;
    const reduxStates: Interfaces.RootReducersStateInterface = Store.getState();
    const {
      other: {networkStatus},
    } = reduxStates;
    let toastPopupData: Interfaces.ToastPopupDataInterface = {
      message: Constants.COMMON_ERROR,
      title: Constants.ERROR,
      type: StatusCodes.ERROR,
    };

    ENV.currentEnvironment == Constants.DEVELOPMENT &&
      console.log('ENDPOINT::: ', endPoint);

    ENV.currentEnvironment == Constants.DEVELOPMENT &&
      console.log('HEADERS::: ', JSON.stringify(headers));

    if (networkStatus) {
      fetch(endPoint, headers)
        .then(
          (res: Response): Promise<Interfaces.APIResponseInterface> =>
            handleResponse(res),
        )
        .then((successResponse: Interfaces.APIResponseInterface): void => {
          ENV.currentEnvironment == Constants.DEVELOPMENT &&
            console.log('THEN RESPONSE::: ', JSON.stringify(successResponse));

          handleSuccessResponse(successResponse, onResponse, showToastPopup);
        })
        .catch((errorResponse: any): void => {
          ENV.currentEnvironment == Constants.DEVELOPMENT &&
            console.log('CATCH ERROR::: ', errorResponse);

          toastPopupData = {
            ...toastPopupData,
            message: Constants.COMMON_ERROR,
          };

          Store.dispatch(Actions.storeToastPopup(toastPopupData));
        })
        .finally((): void => {
          Store.dispatch(Actions.storeAPIFetchingStatus(false));
        });
    } else {
      toastPopupData = {
        ...toastPopupData,
        message: Constants.CHECK_NETWORK_CONNECTION,
      };

      Store.dispatch(Actions.storeToastPopup(toastPopupData));
    }
  };
}

const handleResponse = async (
  response: Response,
): Promise<Interfaces.APIResponseInterface> => {
  const {StatusCodes} = Enums;

  const {status}: Response = response;

  const resJson: Interfaces.APIResponseInterface = await response.json();

  switch (status) {
    case StatusCodes.UNAUTHORIZED:
      backToSignIn();
      break;

    default:
      break;
  }

  return resJson;
};

const backToSignIn = async (): Promise<void> => {
  Functions.clearAsyncStorageAndRedux();

  const resetAction: CommonActions.Action = CommonActions.reset({
    index: Constants.ZERO,
    routes: [{name: Constants.SIGN_IN}],
  });

  HelperNavigation.navigateDispatch(resetAction);
};

const handleSuccessResponse = (
  successResponse: Interfaces.APIResponseInterface,
  onResponse: Interfaces.APIResponseHandlerInterface,
  showToastPopup: boolean,
) => {
  const {StatusCodes} = Enums;

  let {error, message, title, type} = successResponse;

  let toastPopupData: Interfaces.ToastPopupDataInterface = {
    message: '',
    title,
    type,
  };

  switch (type) {
    case StatusCodes.NEW:
    case StatusCodes.SUCCESS:
      if (showToastPopup) {
        toastPopupData = {
          ...toastPopupData,
          message: message || Constants.COMMON_SUCCESS,
        };

        Store.dispatch(Actions.storeToastPopup(toastPopupData));
      }
      break;

    default:
      toastPopupData = {
        ...toastPopupData,
        message: error || message || Constants.COMMON_ERROR,
      };

      Store.dispatch(Actions.storeToastPopup(toastPopupData));
      break;
  }

  onResponse(successResponse);
};

const FetchRequest: HandleFetchRequest = new HandleFetchRequest();

export default FetchRequest;
