import * as Constants from '../../common/utils/constants';
import * as Interfaces from '../../configs/ts/interfaces';
import * as ReduxTypes from '../rootTypes';

// Other Reducer

const otherReducerState: Interfaces.OtherReducerStateInterface = {
  backOnline: false,
  fetchingStatus: false,
  networkStatus: true,
  orientationType: Constants.PORTRAIT,
  toastPopup: null,
};

const OtherReducer = (
  state: Interfaces.OtherReducerStateInterface = otherReducerState,
  action: Interfaces.ActionsInterface,
): Interfaces.OtherReducerStateInterface => {
  switch (action.type) {
    case ReduxTypes.BACK_ONLINE:
      return {...state, backOnline: action.payload};

    case ReduxTypes.FETCHING_STATUS:
      return {...state, fetchingStatus: action.payload};

    case ReduxTypes.NETWORK_STATUS:
      return {...state, networkStatus: action.payload};

    case ReduxTypes.ORIENTATION_TYPE:
      return {...state, orientationType: action.payload};

    case ReduxTypes.TOAST_POPUP:
      return {...state, toastPopup: action.payload};

    default:
      return state;
  }
};

export default OtherReducer;
