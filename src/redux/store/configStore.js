import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { sessionService } from "redux-react-session";
import LogRocket from "logrocket";
import ReduxThunk from "redux-thunk";

import rootReducer from "../reducers";
const __DEV__ = true

let middleware = [ReduxThunk];

const logger = createLogger({
  predicate: (getState, action) => __DEV__,
  collapsed: true
});
middleware = [...middleware, logger, LogRocket.reduxMiddleware()];

const createRNReduxStore = applyMiddleware(...middleware)(createStore);

const store = createRNReduxStore(rootReducer);

sessionService.initSessionService(store, { redirectPath: "/login", driver: 'LOCALSTORAGE' });

export default store;
