/**
 *  Imports
 */
import {
    GET_GAMES_SUCCESS,
    GET_GAMES_BETS_SUCCESS
} from "../actionConstants";

/** Initial State  */
const INITIAL_STATE = {
    gamesList: [],
    gameBets: [],
    selectedGames: {}
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_GAMES_SUCCESS:
            return { ...state, gamesList: [...action.data] };
        case GET_GAMES_BETS_SUCCESS:
            return { ...state, gameBets: [...action.data] };
        default:
            return state;
    }
}
