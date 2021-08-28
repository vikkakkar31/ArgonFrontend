/**
 *  Imports
 */
import {
    GET_TRANSACTIONS_HISTORY_SUCCESS,
    SET_TRANSACTIONS_HISTORY_DATA,
    GET_USER_REQUEST_SUCCESS,
    UPDATE_USER_REQUEST_SUCCESS
} from "../actionConstants";

/** Initial State  */
const INITIAL_STATE = {
    transactionHistory: [],
    selectedTransactionHistory: {},
    userRequests: [],
    updateRequest: {}
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_TRANSACTIONS_HISTORY_SUCCESS:
            return { ...state, transactionHistory: [...action.data] };
        case SET_TRANSACTIONS_HISTORY_DATA:
            return { ...state, selectedTransactionHistory: { ...action.data } };
        case GET_USER_REQUEST_SUCCESS:
            return { ...state, userRequests: [...action.data] };
        case UPDATE_USER_REQUEST_SUCCESS:
            return { ...state, updateRequest: { ...action.data } }
        default:
            return state;
    }
}
