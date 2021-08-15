import { sessionService } from "redux-react-session";
import {
    GET_GAMES_START,
    GET_GAMES_SUCCESS,
    GET_GAMES_FAILURE,
    ADD_GAMES_START,
    ADD_GAMES_SUCCESS,
    ADD_GAMES_FAILURE
} from "../actionConstants";

import dispatchActionToReducer, {
    SimpleDispatchActionToReducer
} from "../actionDispatcher";

import {
    getGames as getGamesService,
    addGame as addGameService
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