import { sessionService } from "redux-react-session";
import {
    GET_TRANSACTIONS_HISTORY_START,
    GET_TRANSACTIONS_HISTORY_SUCCESS,
    GET_TRANSACTIONS_HISTORY_FAILURE,
    SET_TRANSACTIONS_HISTORY_DATA,
    GET_USER_REQUEST_START,
    GET_USER_REQUEST_SUCCESS,
    GET_USER_REQUEST_FAILURE,
    UPDATE_USER_REQUEST_START,
    UPDATE_USER_REQUEST_SUCCESS,
    UPDATE_USER_REQUEST_FAILURE,
} from "../actionConstants";

import dispatchActionToReducer, {
    SimpleDispatchActionToReducer
} from "../actionDispatcher";

import {
    getTransactionHistory as getTransactionHistoryService,
    getUserRequest as getUserRequestService,
    updateUserRequest as updateUserRequestService
} from "../services";

export const setTransactionHistory = (data, callback) => {
    return SimpleDispatchActionToReducer(SET_TRANSACTIONS_HISTORY_DATA, data, callback);
};

export const getTransactionHistory = (query, callback) => {
    return dispatchActionToReducer(
        getTransactionHistoryService(query),
        GET_TRANSACTIONS_HISTORY_START,
        GET_TRANSACTIONS_HISTORY_SUCCESS,
        GET_TRANSACTIONS_HISTORY_FAILURE,
        (error, res) => {
            if (error) return;
            else if (res !== undefined) {
                if (callback) callback(null, res);
            } else {
                console.log("undefined response");
            }
        }
    );
};
export const getUserRequest = (query, callback) => {
    return dispatchActionToReducer(
        getUserRequestService(query),
        GET_USER_REQUEST_START,
        GET_USER_REQUEST_SUCCESS,
        GET_USER_REQUEST_FAILURE,
        (error, res) => {
            if (error) return;
            else if (res !== undefined) {
                console.log(res, "resdata");
                if (callback) callback(null, res);
            } else {
                console.log("undefined response");
            }
        }
    );
}
export const updateUserRequest = (updatData, callback) => {
    return dispatchActionToReducer(
        updateUserRequestService(updatData),
        UPDATE_USER_REQUEST_START,
        UPDATE_USER_REQUEST_SUCCESS,
        UPDATE_USER_REQUEST_FAILURE,
        (error, res) => {
            if (error) return;
            else if (res !== undefined) {
                if (callback) callback(null, res);
            } else {
                console.log("undefined response");
            }
        }
    );
}