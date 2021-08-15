import { sessionService } from "redux-react-session";
import {
    GET_WALLETS_START,
    GET_WALLETS_SUCCESS,
    GET_WALLETS_FAILURE,
    SET_WALLETS_DATA
} from "../actionConstants";

import dispatchActionToReducer, {
    SimpleDispatchActionToReducer
} from "../actionDispatcher";

import {
    getWallets as getWalletsService
} from "../services";

export const setWallets = (data, callback) => {
    return SimpleDispatchActionToReducer(SET_WALLETS_DATA, data, callback);
};

export const getWallets = (query, callback) => {
    return dispatchActionToReducer(
        getWalletsService(query),
            GET_WALLETS_START,
            GET_WALLETS_SUCCESS,
            GET_WALLETS_FAILURE,
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