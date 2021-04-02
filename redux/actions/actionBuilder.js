import { headersCreator } from "../http/settings";

import axios from "axios";
import {
  GET,
  DELETE,
  POST,
  PUT,
  INTERNET_ERROR,
  UNKOWN_ERROR,
  RESPONSE_WAS_NOT_RECIEVED,
} from "../types/http.types";
import { buildActionType } from "../types/utils";
import { STARTED, SUCCESS, FAILLED } from "../types/status.type";
import {normalizersId} from "../normalizer/core";

export const defaultActionMeta = {
  onSuccess: (data) => {},
  onFailled: (error) => {},
  notifMessage: (data, error) => {},
};



const ErrorTransformer = (error) => {
  if (error.response) {
    return {
      body: error.response.data,
      status: error.response.status,
    };
  } else if (error.request) {
    //response was not recieved
    return {
      body: {},
      status: RESPONSE_WAS_NOT_RECIEVED,
    };
  } else {
    if (error.message === "Network Error") {
      return {
        body: {},
        status: INTERNET_ERROR,
      };
    } else {
      return {
        body: {},
        status: UNKOWN_ERROR,
      };
    }
  }
};

const getheader = (getState, multipart = false) => {
  // const token =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTk4OTFmYjUxMGQ3NTAwMjQ0ZjcyZDYiLCJpYXQiOjE1ODkyMTMwNDEsImV4cCI6MTU4OTI0OTA0MX0.guSdfDDqNHqGOC1TpAjDXHG5UsTCPqNr2sYOcZhcAZ0';
  // try {
  //   var rtoken = getState().authReducer.token;
  //   token = rtoken ? rtoken : token;

  // } catch {}
  var token = getState().authReducer.token;
  let headers = headersCreator(multipart);

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

const getApiType = (entity, method) => {
  return {
    stated_type: buildActionType({
      entity: entity,
      httpmethod: method,
      status: STARTED,
    }),
    sucess_type: buildActionType({
      entity: entity,
      httpmethod: method,
      status: SUCCESS,
    }),
    failled_type: buildActionType({
      entity: entity,
      httpmethod: method,
      status: FAILLED,
    }),
  };
};

export function GetAction({
  url,
  params = {},
  entity,
  normalizerId = normalizersId.default,
  onSuccess = (data) => {},
  onFailled = (error) => {},
  notifMessage = (data, error) => {},
}) {
  const meta = {
    onSuccess,
    onFailled,
    notifMessage,
    entity,
    normalizerId,
    method: GET,
  };
  const { stated_type, failled_type, sucess_type } = getApiType(entity, GET);
  return (dispatch, getState) => {
    dispatch({ type: stated_type, meta, loading: true });
    return axios
      .get(url, { headers: getheader(getState), params: params })
      .then((response) => {
        dispatch({
          type: sucess_type,
          loading: false,
          data: response.data,
          meta: meta,
        });
      })
      .catch((error) => {
        dispatch({
          error: ErrorTransformer(error),
          type: failled_type,
          meta: meta,
        });
      });
  };
}

export function DeleteAction({
  url,
  entity,
  normalizerId = normalizersId.default,
  onSuccess = (data) => {},
  onFailled = (error) => {},
  notifMessage = (data, error) => {},
}) {
  const meta = {
    onSuccess,
    onFailled,
    notifMessage,
    entity,
    normalizerId,
    method: DELETE,
  };
  const { stated_type, failled_type, sucess_type } = getApiType(entity, DELETE);
  return (dispatch, getState) => {
    dispatch({ type: stated_type, meta, loading: true });
    return axios
      .delete(url, { headers: getheader(getState) })
      .then((response) => {
        dispatch({
          type: sucess_type,
          loading: false,
          data: response.data,
          meta: meta,
        });
      })
      .catch((error) => {
        dispatch({
          error: ErrorTransformer(error),
          type: failled_type,
          meta: meta,
        });
      });
  };
}

export function PostAction({
  url,
  data,
  multipart,
  entity,
  normalizerId = normalizersId.default,
  onSuccess = (data) => {},
  onFailled = (error) => {},
  notifMessage = (data, error) => {},
}) {
  const meta = {
    onSuccess,
    onFailled,
    notifMessage,
    entity,
    normalizerId,
    method: POST,
  };
  const { stated_type, failled_type, sucess_type } = getApiType(entity, POST);

  return (dispatch, getState) => {
    dispatch({ type: stated_type, meta, loading: true });
    var multipart2 = multipart ? multipart : false;
    //data = multipart2 ? createForm(data) : data;
    return axios
      .post(url, data, { headers: getheader(getState, multipart2) })
      .then((response) => {
        dispatch({
          type: sucess_type,
          loading: false,
          data: response.data,
          meta: meta,
        });
      })
      .catch((error) => {
        dispatch({
          error: ErrorTransformer(error),
          type: failled_type,
          meta: meta,
        });
      });
  };
}

export function PutAction({
  url,
  data,
  entity,
  normalizerId = normalizersId.default,
  onSuccess = (data) => {},
  onFailled = (error) => {},
  notifMessage = (data, error) => {
    return null;
  },
}) {
  const meta = {
    onSuccess,
    onFailled,
    notifMessage,
    normalizerId,
    entity,
    method: PUT,
  };

  const { stated_type, failled_type, sucess_type } = getApiType(entity, PUT);
  return (dispatch, getState) => {
    dispatch({ type: stated_type, meta, loading: true });
    return axios
      .put(url, data, { headers: getheader(getState) })
      .then((response) => {
        dispatch({
          type: sucess_type,
          loading: false,
          data: response.data,
          meta: meta,
        });
      })
      .catch((error) => {
        dispatch({
          error: ErrorTransformer(error),
          type: failled_type,
          meta: meta,
        });
      });
  };
}
