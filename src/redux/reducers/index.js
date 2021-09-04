import { Action, Reducer, combineReducers } from "redux";
import { sessionReducer } from "redux-react-session";
import { reducer as toastrReducer } from "react-redux-toastr";
import user from "./userReducer";
import wallets from "./walletsReducer";
import transactionHistory from "./transactionHistoryReducer"
import games from "./gamesReducer";
import gameBets from "./gameBetsReducer";
import loader from "./loaderReducer";

const appReducer = combineReducers({
  user,
  loader,
  wallets,
  transactionHistory,
  games,
  gameBets,
  session: sessionReducer,
  toastr: toastrReducer,
});

const rootReducer = (state, action) => {
  let newState = state;

  // if (action.type === LOGOUT) {
  //   newState = {};
  // }

  return appReducer(newState, action);
};

/** export this module */
export default rootReducer;
