/**
 * @function Calls the service and then dispatch action Object as a response to reducer.
 * @param service - Name of the Service that handles all the input parameters required to be pass in service.
 * @param actionTypeStart - type : action start
 * @param actionTypeSuccess - type : action Success
 * @param actionTypeFailure - type : action Failure
 * @returns {function()}
 * @constructor
 */
import { toastr } from "react-redux-toastr";
import React from "react";

export default function DispatchActionToReducer(
  service,
  actionTypeStart,
  actionTypeSuccess,
  actionTypeFailure,
  callback
) {
  return dispatch => {
    dispatch({
      type: actionTypeStart
    });
    service
      .then(result => {
        if (result && (result.status === 200 || result.status === 201)) {
          dispatch({
            type: actionTypeSuccess,
            data: result.data
          });
          if (callback) callback(null, result);
        } else {
          dispatch({
            type: actionTypeFailure,
            error: result
          });
        }
      })
      .catch(error => {
        if (!error) {
          toastr.error("Page not found");
          dispatch({
            type: actionTypeFailure,
            error
          });
          if (callback) callback("Page not found");
          return;
        }

        let errorStringTitle = "Oops! Something went wrong.";
        let errorString = error.message || error.error;
        toastr.error(errorStringTitle, {
          component: () => (
            <div dangerouslySetInnerHTML={{ __html: errorString }} />
          )
        });
        dispatch({
          type: actionTypeFailure,
          error
        });
        
        if (callback) callback(error);
      });
  };
}

export function SimpleDispatchActionToReducer(type, data, callback) {
  return dispatch => {
    dispatch({ type, data });
    if (callback) callback();
  };
}
