import { apiCall, createQueryParams } from "../index";
import API from "../serviceList";


export function getTransactionHistory(queryParm) {
    let query = createQueryParams(queryParm);
    return apiCall({
        method: "GET",
        url: `${API.getTransactionHistory}${query}`,
    });
}