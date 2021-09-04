import { apiCall, apiNoTokenCall, createQueryParams } from "../index";
import API from "../serviceList";


export function getTodayResult(queryParm) {
  let query = createQueryParams(queryParm);
  return apiCall({
    method: "GET",
    url: `${API.getTodayResult}${query}`,
  });
}

export function getGames(queryParm) {
  let query = createQueryParams(queryParm);
  return apiCall({
    method: "GET",
    url: `${API.getGames}${query}`,
  });
}
export function getGamesBets(queryParm) {
  let query = createQueryParams(queryParm);
  return apiCall({
    method: "GET",
    url: `${API.getGamesBets}${query}`,
  });
}
export function addGame(reqData) {
  return apiCall({
    method: "POST",
    url: `${API.addGame}`,
    data: reqData
  });
}
export function updateGameResults(reqData) {
  return apiCall({
    method: "PUT",
    url: `${API.updateGameResults}/${reqData._id}`,
    data: reqData
  });
}
export function getGamesResult(queryParm) {
  let query = createQueryParams(queryParm);
  return apiCall({
    method: "GET",
    url: `${API.getGamesResult}${query}`,
  });
}