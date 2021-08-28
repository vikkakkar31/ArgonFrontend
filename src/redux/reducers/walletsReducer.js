/**
 *  Imports
 */
import {
    GET_WALLETS_SUCCESS,
    SET_WALLETS_DATA
} from "../actionConstants";

/** Initial State  */
const INITIAL_STATE = {
    walletsList: [],
    selectedWallet: {}
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_WALLETS_SUCCESS:
            return { ...state, walletsList: [...action.data] };
        case SET_WALLETS_DATA:
            return { ...state, selectedWallet: { ...action.data } };
        default:
            return state;
    }
}
