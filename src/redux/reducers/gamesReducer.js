/**
 *  Imports
 */
import {
    GET_GAMES_SUCCESS,
    GET_GAMES_BETS_SUCCESS,
    GET_GAME_RESULTS_SUCCESS,
    UPDATE_GAME_RESULTS_SUCCESS,
    GET_TODAY_RESULT_SUCCESS,
} from "../actionConstants";

/** Initial State  */
const INITIAL_STATE = {
    gamesList: [],
    gameBets: [],
    gameResults: [],
    updateGameResults: {},
    selectedGames: {},
    todayResult: {}
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_GAMES_SUCCESS:
            return { ...state, gamesList: [...action.data.response] };
        case GET_GAMES_BETS_SUCCESS:
            return { ...state, gameBets: [...action.data] };
        case GET_GAME_RESULTS_SUCCESS:
            return { ...state, gameResults: [...action.data] };
        case UPDATE_GAME_RESULTS_SUCCESS:
            return { ...state, updateGameResults: [...action.data] };
        case GET_TODAY_RESULT_SUCCESS:
            return { ...state, todayResult: [...action.data] };
        default:
            return state;
    }
}
