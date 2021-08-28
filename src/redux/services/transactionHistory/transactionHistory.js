import { apiCall, createQueryParams } from "../index";
import API from "../serviceList";


export function getTransactionHistory(queryParm) {
    let query = createQueryParams(queryParm);
    return apiCall({
        method: "GET",
        url: `${API.getTransactionHistory}${query}`,
    });
}
export function getUserRequest(queryParm) {
    let query = createQueryParams(queryParm);
    return apiCall({
        method: "GET",
        url: `${API.getUserRequest}${query}`,
    });
}
export function updateUserRequest(userData) {
    return apiCall({
        method: "PUT",
        url: `${API.approveRequest}`,
        data: userData
    });
}