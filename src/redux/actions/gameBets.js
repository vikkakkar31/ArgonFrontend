import { sessionService } from "redux-react-session";
import {
    GET_GAME_BETS_START,
    GET_GAME_BETS_SUCCESS,
    GET_GAME_BETS_FAILURE
} from "../actionConstants";

import dispatchActionToReducer, {
    SimpleDispatchActionToReducer
} from "../actionDispatcher";

import {
    getGameBets as getGameBetsService
} from "../services";

export const getGameBets = (query, callback) => {
    return dispatchActionToReducer(
        getGameBetsService(query),
        GET_GAME_BETS_START,
        GET_GAME_BETS_SUCCESS,
        GET_GAME_BETS_FAILURE,
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