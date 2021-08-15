/**
 *  Imports
 */
 import {
    GET_GAME_BETS_SUCCESS
} from "../actionConstants";

/** Initial State  */
const INITIAL_STATE = {
    gameBetsList: [],
    selectedGameBets: {}
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_GAME_BETS_SUCCESS:
            return { ...state, gameBetsList: [...action.data.response] };
        default:
            return state;
    }
}
