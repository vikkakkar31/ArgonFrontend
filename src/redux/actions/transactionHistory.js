import { sessionService } from "redux-react-session";
import {
    GET_TRANSACTIONS_HISTORY_START,
    GET_TRANSACTIONS_HISTORY_SUCCESS,
    GET_TRANSACTIONS_HISTORY_FAILURE,
    SET_TRANSACTIONS_HISTORY_DATA
} from "../actionConstants";

import dispatchActionToReducer, {
    SimpleDispatchActionToReducer
} from "../actionDispatcher";

import {
    getTransactionHistory as getTransactionHistoryService
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