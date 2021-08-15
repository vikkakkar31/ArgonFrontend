import { apiCall, createQueryParams } from "../index";
import API from "../serviceList";


export function getGameBets(queryParm) {
    let query = createQueryParams(queryParm);
    return apiCall({
        method: "GET",
        url: `${API.getGameBets}${query}`,
    });
}