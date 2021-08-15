/**
 *  Imports
 */

import { sessionService } from "redux-react-session";
import LogRocket from "logrocket";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_START,
  LOGOUT,
  SELECTED_USER,
  USER_REGISTRATION_START,
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAILURE,
  USER_UPDATE_START,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  USER_GET_START,
  USER_GET_SUCCESS,
  USER_GET_FAILURE,
  USER_TRANSACTIONS_GET_START,
  USER_TRANSACTIONS_GET_SUCCESS,
  USER_TRANSACTIONS_GET_FAILURE,
} from "../actionConstants";

import dispatchActionToReducer, {
  SimpleDispatchActionToReducer
} from "../actionDispatcher";
import {
  login as loginService,
  registerUser as registerUserService,
  forgotPassword as forgotPasswordService,
  updateUser as updateProfileService,
  getUser as getUserListService,
  getFilteredUserList as getFilteredUserListService, 
  getUserTransactions as getUserTransactionsService
} from "../services";

export const login = (email, password, callback) => {
  return dispatchActionToReducer(
    loginService(email, password),
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    (error, res) => {
      if (error) return;
      else if (res !== undefined) {
        sessionService
          .saveSession({
            sessionId: `${res.data.token}`,
            sessionToken: `${res.data.token}`
          })
          .then(() => {
            sessionService
              .saveUser({
                ...res.data
              })
              .then(() => {
                if (callback) callback(res);
              });
          });
      } else {
        console.log("undefined response");
      }
    }
  );
};

export const logout = (callback) => {
  return SimpleDispatchActionToReducer(LOGOUT, null, callback);
};

export function register(body, callback) {
  return dispatchActionToReducer(
    registerUserService(body),
    USER_REGISTRATION_START,
    USER_REGISTRATION_SUCCESS,
    USER_REGISTRATION_FAILURE,
    (error, res) => {
      if (error) return;
      else if (res !== undefined) {
        sessionService
          .saveSession({
            sessionId: `${res.data.token}`,
            sessionToken: `${res.data.token}`
          })
          .then(() => {
            sessionService
              .saveUser({
                ...res.data
              })
              .then(() => {
                if (callback) callback();
              });
          });
      } else {
        console.log("undefined response");
      }
    }
  );
}
export const updateProfile = (body, callback) => {
  return dispatchActionToReducer(
    updateProfileService(body),
    USER_UPDATE_START,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAILURE,
    (error, res) => {
      if (error) return;
      else if (res !== undefined) {
        sessionService
          .saveUser({
            ...res.data
          })
          .then(() => {
            if (callback) callback(error, res);
          });
      } else {
        console.log("undefined response");
      }
    }
  );
};
export function forgotPassword(email, callback) {
  return dispatchActionToReducer(
    forgotPasswordService(email),
    FORGOT_PASSWORD_START,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    (error, res) => {
      if (error) return;
      else if (res !== undefined) {
        if (callback) callback(error, res);
      } else {
        console.log("undefined response");
      }
    }
    //callback
  );
}
export const getUserList = (queryParam, callback) => {
  return dispatchActionToReducer(
    getUserListService(queryParam),
    USER_GET_START,
    USER_GET_SUCCESS,
    USER_GET_FAILURE,
    (error, res) => {
      if (error) return;
      else if (res !== undefined) {
        if (callback) callback(error, res);
      } else {
        console.log("undefined response");
      }
    }
  );
};

export const getFilteredUserList = (reqData, callback) => {
  return dispatchActionToReducer(
    getFilteredUserListService(reqData),
    USER_GET_START,
    USER_GET_SUCCESS,
    USER_GET_FAILURE,
    (error, res) => {
      if (error) return;
      else if (res !== undefined) {
        if (callback) callback(error, res);
      } else {
        console.log("undefined response");
      }
    }
  );
};
export const getUserTransactions = (reqData, callback) => {
  return dispatchActionToReducer(
    getUserTransactionsService(reqData),
    USER_TRANSACTIONS_GET_START,
    USER_TRANSACTIONS_GET_SUCCESS,
    USER_TRANSACTIONS_GET_FAILURE,
    (error, res) => {
      if (error) return;
      else if (res !== undefined) {
        if (callback) callback(error, res);
      } else {
        console.log("undefined response");
      }
    }
  );
};

export const setSelectedUser = (data, callback) => {
  return SimpleDispatchActionToReducer(SELECTED_USER, data, callback);
};