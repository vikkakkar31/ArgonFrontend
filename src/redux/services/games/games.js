import { apiCall, apiNoTokenCall, createQueryParams } from "../index";
import API from "../serviceList";


export function getGames(queryParm) {
    let query = createQueryParams(queryParm);
    return apiCall({
        method: "GET",
        url: `${API.getGames}${query}`,
    });
}

export function addGame(reqData) {
    return apiNoTokenCall({
      method: "POST",
      url: `${API.addGame}`,
      data: reqData
    });
  }