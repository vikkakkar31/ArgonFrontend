import axios from "axios";
import { sessionService } from "redux-react-session";
import hostConfig from "../../config/hostConfig";
import 'regenerator-runtime/runtime';
import { toastr } from "react-redux-toastr";

export const apiCall = async ({
  method,
  url,
  data = null,
  responseType
}) => {
  const urls = `${hostConfig.apiBaseUrl}/api${url}`;
  function apiPromise(token) {
    return axios({
      method,
      url: urls,
      data: { ...data },
      responseType,
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        Authorization: token
      }
    });
  }

  return sessionService
    .loadSession()
    .then(currentSession => {
      return currentSession.sessionToken;
    })
    .catch(err => {
      console.log("API ERROR 1:", err);
      throw err;
    })
    .then(token => {
      return apiPromise(token);
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      if (
        err &&
        err.response &&
        err.response.data
      ) {
        console.log("API ERROR:", err.response.data);
        toastr.error("Error accessing this data", err);
        throw err.response.data;
      } else {
        throw err;
      }
    });
};

export const apiNoTokenCall = async ({
  method,
  url,
  data = null,
  responseType
}) => {
  const urls = `${hostConfig.apiBaseUrl}/api/${url}`;
  function apiPromise() {
    return axios({
      method,
      url: urls,
      data: { ...data },
      responseType,
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*'
      }
    });
  }
  return apiPromise()
    .then(res => {
      console.log("res", res);
      return res;
    })
    .catch(err => {
      console.log("API ERROR:", err.response.data);
      // throw err.response.data.errors;
      throw err.response.data;
    });
};

function encodeUriComponentWithKey(key, value) {
  return `${key}=${encodeURIComponent(value)}`;
}
function createQueryParamComponent(key, value) {
  let csv = '';
  if (value) {
    if (Array.isArray(value)) {
      csv = value.map((valueItem) => encodeUriComponentWithKey(key, valueItem)).join('&');
    } else {
      csv = `${key}=${encodeURIComponent(value)}`;
    }
  }
  return csv;
}
export function createQueryParams(params) {
  const queryParams = Object.keys(params).map((key) => createQueryParamComponent(key, params[key]))
    // Remove the null, zero, undefined and empty string values
    .filter(Boolean);

  if (queryParams.length) {
    return `?${queryParams.join('&')}`;
  }
  return '';
}
