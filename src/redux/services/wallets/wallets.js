import { apiCall, createQueryParams } from "../index";
import API from "../serviceList";


export function getWallets(queryParm) {
    let query = createQueryParams(queryParm);
    return apiCall({
        method: "GET",
        url: `${API.getWallets}${query}`,
    });
}

export function updateWallets(queryParm) {
    let query = createQueryParams(queryParm);
    return apiCall({
        method: "PUT",
        url: `${API.updateWallets}${query}`,
    });
}