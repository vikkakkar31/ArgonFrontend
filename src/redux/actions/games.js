import { sessionService } from "redux-react-session";
import {
    GET_GAMES_START,
    GET_GAMES_SUCCESS,
    GET_GAMES_FAILURE,
    GET_GAMES_BETS_START,
    GET_GAMES_BETS_SUCCESS,
    GET_GAMES_BETS_FAILURE,
    ADD_GAMES_START,
    ADD_GAMES_SUCCESS,
    ADD_GAMES_FAILURE,
    UPDATE_GAME_RESULTS_START,
    UPDATE_GAME_RESULTS_SUCCESS,
    UPDATE_GAME_RESULTS_FAILURE,
    GET_GAME_RESULTS_START,
    GET_GAME_RESULTS_SUCCESS,
    GET_GAME_RESULTS_FAILURE,
    GET_TODAY_RESULT_START,
    GET_TODAY_RESULT_SUCCESS,
    GET_TODAY_RESULT_FAILURE,
} from "../actionConstants";

import dispatchActionToReducer, {
    SimpleDispatchActionToReducer
} from "../actionDispatcher";

import {
    getGames as getGamesService,
    getTodayResult as getTodayResultService,
    addGame as addGameService,
    getGamesBets as getGamesBetsService,
    updateGameResults as updateGameResultsService,
    getGamesResult as getGamesResultService,
} from "../services";

export const getGames = (query, callback) => {
    return dispatchActionToReducer(
        getGamesService(query),
        GET_GAMES_START,
        GET_GAMES_SUCCESS,
        GET_GAMES_FAILURE,
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
export const getTodayResult = (query, callback) => {
    return dispatchActionToReducer(
        getTodayResultService(query),
        GET_TODAY_RESULT_START,
        GET_TODAY_RESULT_SUCCESS,
        GET_TODAY_RESULT_FAILURE,
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

export function addGame(body, callback) {
    return dispatchActionToReducer(
        addGameService(body),
        ADD_GAMES_START,
        ADD_GAMES_SUCCESS,
        ADD_GAMES_FAILURE,
        (error, res) => {
            if (error) return;
            else if (res !== undefined) {
                if (callback) callback(error, res);
            } else {
                console.log("undefined response");
            }
        }
    );
}

export function updateGameResults(body, callback) {
    return dispatchActionToReducer(
        updateGameResultsService(body),
        UPDATE_GAME_RESULTS_START,
        UPDATE_GAME_RESULTS_SUCCESS,
        UPDATE_GAME_RESULTS_FAILURE,
        (error, res) => {
            if (error) return;
            else if (res !== undefined) {
                if (callback) callback(error, res);
            } else {
                console.log("undefined response");
            }
        }
    );
}

export const getGamesBets = (query, callback) => {
    return dispatchActionToReducer(
        getGamesBetsService(query),
        GET_GAMES_BETS_START,
        GET_GAMES_BETS_SUCCESS,
        GET_GAMES_BETS_FAILURE,
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
export const getGameResults = (query, callback) => {
    return dispatchActionToReducer(
        getGamesResultService(query),
        GET_GAME_RESULTS_START,
        GET_GAME_RESULTS_SUCCESS,
        GET_GAME_RESULTS_FAILURE,
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
