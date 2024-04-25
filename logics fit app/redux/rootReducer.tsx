import {combineReducers} from 'redux';
import * as Interfaces from '../configs/ts/interfaces';
import AppReducer from './reducers/appReducer';
import OtherReducer from './reducers/otherReducer';
import * as ReduxTypes from './rootTypes';

const rootReducers: any = combineReducers({
  app: AppReducer,
  other: OtherReducer,
});

function rootReducer(
  state: object | Interfaces.RootReducersStateInterface,
  action: Interfaces.ActionsInterface,
): any {
  ReduxTypes.LOGOUT == action.type && [(state = {})];

  return rootReducers(state, action);
}

export default rootReducer;
