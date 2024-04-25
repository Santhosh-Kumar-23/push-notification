import * as Constants from '../../common/utils/constants';
import * as Interfaces from '../../configs/ts/interfaces';
import * as ReduxTypes from '../rootTypes';

// App Reducer

const appReducerState: Interfaces.AppReducerStateInterface = {
  cardios: [],
  dashboardNutritions: [],
  dashboardNutritionsDetails: {lastUpdate: '', totalCalories: Constants.ZERO},
  forgotPassword: null,
  notifications: {
    notifications: [],
    pageIndex: Constants.ZERO,
    pageSize: Constants.ZERO,
    totalRecords: Constants.ZERO,
  },
  nutritions: [],
  onBoardings: [],
  subscription: null,
  subscriptions: [],
  user: null,
  userInfo: null,
  workouts: [],
};

const AppReducer = (
  state: Interfaces.AppReducerStateInterface = appReducerState,
  action: Interfaces.ActionsInterface,
): Interfaces.AppReducerStateInterface => {
  switch (action.type) {
    case ReduxTypes.CARDIOS:
      return {...state, cardios: action.payload};

    case ReduxTypes.DASHBOARD_NUTRITIONS:
      return {...state, dashboardNutritions: action.payload};

    case ReduxTypes.DASHBOARD_NUTRITIONS_DETAILS:
      return {...state, dashboardNutritionsDetails: action.payload};

    case ReduxTypes.FORGET_PASSWORD:
      return {...state, forgotPassword: action.payload};

    case ReduxTypes.NOTIFICATIONS:
      return {...state, notifications: action.payload};

    case ReduxTypes.NUTRITIONS:
      return {...state, nutritions: action.payload};

    case ReduxTypes.ON_BOARDINGS:
      return {...state, onBoardings: action.payload};

    case ReduxTypes.SUBSCRIPTION:
      return {
        ...state,
        subscription: action.payload,
      };

    case ReduxTypes.SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: action.payload,
      };

    case ReduxTypes.USER:
      return {
        ...state,
        user: action.payload,
      };

    case ReduxTypes.USER_INFO:
      return {...state, userInfo: action.payload};

    case ReduxTypes.WORKOUTS:
      return {...state, workouts: action.payload};

    default:
      return state;
  }
};

export default AppReducer;
