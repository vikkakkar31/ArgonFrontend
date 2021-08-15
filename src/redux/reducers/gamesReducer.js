/**
 *  Imports
 */
 import {
    GET_GAMES_SUCCESS
} from "../actionConstants";

/** Initial State  */
const INITIAL_STATE = {
    gamesList: [],
    selectedGames: {}
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_GAMES_SUCCESS:
            return { ...state, gamesList: [...action.data.response] };
        default:
            return state;
    }
}
