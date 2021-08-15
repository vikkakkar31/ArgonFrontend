import { sessionService } from "redux-react-session";
import { apiCall, apiNoTokenCall, createQueryParams } from "../index";
import hostConfig from "./../../../config/hostConfig";
import API from "../serviceList";

export function login(email, password) {
  return apiNoTokenCall({
    method: "POST",
    url: `${API.login}`,
    data: {
      "email": email,
      "password": password
    }
  });
}

export function registerUser(reqData) {
  return apiNoTokenCall({
    method: "POST",
    url: `${API.register}`,
    data: reqData
  });
}

export function updateUser(reqData) {
  return apiCall({
    method: "PUT",
    url: `${API.updateUser}`,
    data: reqData
  });
}

export function forgotPassword(email) {
  let url = `${API.forgotpassword}`;
  return apiNoTokenCall({
    method: "POST",
    url: url,
    data: { 
      'email': email,
      "origin" : `${hostConfig.origin}` 
    }
  });
}
export function getUser(queryParm) {
  let query = createQueryParams(queryParm);
  return apiCall({
    method: "GET",
    url: `${API.usersList}${query}`,
  });
}

export function getFilteredUserList(reqData) {
  return apiCall({
    method: "POST",
    url: `${API.usersFilteredList}`,
    data: reqData
  });
}
export function getUserTransactions(reqData) {
  return apiCall({
    method: "POST",
    url: `${API.usersTransactionsList}`,
    data: reqData
  });
}

