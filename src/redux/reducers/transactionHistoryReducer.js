/**
 *  Imports
 */
 import {
    GET_TRANSACTIONS_HISTORY_SUCCESS,
    SET_TRANSACTIONS_HISTORY_DATA
} from "../actionConstants";

/** Initial State  */
const INITIAL_STATE = {
    transactionHistory: [],
    selectedTransactionHistory: {}
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_TRANSACTIONS_HISTORY_SUCCESS:
            return { ...state, transactionHistory: [...action.data.response] };
        case SET_TRANSACTIONS_HISTORY_DATA:
            return { ...state, selectedTransactionHistory: { ...action.data } };
        default:
            return state;
    }
}
