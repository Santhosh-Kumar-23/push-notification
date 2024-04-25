import {Store, StoreEnhancer, applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk, {withExtraArgument} from 'redux-thunk';
import * as ENV from '../../env';
import * as Constants from '../common/utils/constants';
import rootReducer from './rootReducer';

const middleware: StoreEnhancer<
  {
    dispatch: {};
  },
  {}
> =
  ENV.currentEnvironment == Constants.DEVELOPMENT
    ? applyMiddleware(logger, withExtraArgument(thunk))
    : applyMiddleware(withExtraArgument(thunk));

const store: Store = createStore(rootReducer, middleware);

export default store;
