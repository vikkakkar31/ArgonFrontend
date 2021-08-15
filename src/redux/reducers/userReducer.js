/**
 *  Imports
 */
import {
  LOGIN_SUCCESS,
  USER_GET_SUCCESS,
  USER_TRANSACTIONS_GET_SUCCESS,
  SELECTED_USER
} from "../actionConstants";

/** Initial State  */
const INITIAL_STATE = {
  login: {
    data: {},
    error: {}
  },
  userList: [],
  userTransationList: [],
  selectedUser: {}
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, login: { error: {}, data: { ...action.data } } };
    case USER_GET_SUCCESS:
      return { ...state, userList: [...action.data] };
    case USER_TRANSACTIONS_GET_SUCCESS:
      return { ...state, userTransationList: [...action.data] };
    case SELECTED_USER:
      return { ...state, selectedUser: { ...action.data } };
    default:
      return state;
  }
}
