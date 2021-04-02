import * as authTypes from "../types/auth.types";
import { headersCreator, baseUrl } from "../http/settings";
import axios from "axios";
import { setDocument, updateDocument } from "./document.action";
import { UPDATE_MY_INFO } from "../types/entity.type";
import { PUT } from "../types/http.types";
const index_name = "users";

const verification_signup_url = `${baseUrl}/${index_name}/signup/verification`;
const set_email_verification_url = `${baseUrl}/${index_name}/verification/email`;
const reset_password_verification_url = `${baseUrl}/${index_name}/verification/password`;
const set_email_url = `${baseUrl}/${index_name}/set/email`;
const set_password_url = `${baseUrl}/${index_name}/set/password`;
const reset_password_if_forgot_url = `${baseUrl}/${index_name}/reset/password`;
const resend_token_for_signup_url = `${baseUrl}/${index_name}/verification/resend`;

const generic_auth_operations_config = {
  credentials: {},
  with_token: true,
  url: "",
  failled_action: "",
  success_action: "",
  started_action: "",
};
const generic_auth_operations_actions = (
  config = generic_auth_operations_config,
  dispatch
) => {
  return (dispatch) => {
    let headers = {};
    if (config.with_token) {
      headers = headersCreator();
    }
    dispatch({ type: authTypes.RESET });
    dispatch({ type: config.started_action });
    return axios
      .post(config.url, config.credentials, { headers: headers })
      .then((data) => {
        dispatch({ type: config.success_action, ...data });
      })
      .catch((err) => {
        if (err.response) {
          dispatch({ type: config.failled_action, errors: err.response.data });
        } else {
          dispatch({ type: config.failled_action });
        }
      });
  };
};

export const verify_token_after_signup = (token) => {
  return generic_auth_operations_actions({
    with_token: false,
    credentials: { token: token },
    url: verification_signup_url,
    failled_action: authTypes.VERIFICATION_SIGNUP_FAILLED,
    success_action: authTypes.VERIFICATION_SIGNUP_SUCCESS,
    started_action: authTypes.VERIFICATION_SIGNUP_STARTED,
  });
};

export const verify_token_after_set_email = (token) => {
  return generic_auth_operations_actions({
    credentials: { token: token },
    url: set_email_verification_url,
    failled_action: authTypes.SET_EMAIL_VERIFICATION_FAILLED,
    success_action: authTypes.SET_EMAIL_VERIFICATION_SUCCESS,
    started_action: authTypes.SET_EMAIL_VERIFICATION_STARTED,
  });
};

export const verify_token_after_reset_password = (token) => {
  return generic_auth_operations_actions({
    with_token: false,
    credentials: { token: token },
    url: reset_password_verification_url,
    failled_action: authTypes.RESET_PASSWORD_VERIFICATION_FAILLED,
    success_action: authTypes.RESET_PASSWORD_VERIFICATION_SUCCESS,
    started_action: authTypes.RESET_PASSWORD_VERIFICATION_STARTED,
  });
};

export const set_email = (newEmail, oldEmail) => {
  return generic_auth_operations_actions({
    credentials: { newEmail: newEmail, oldEmail: oldEmail },
    url: set_email_url,
    failled_action: authTypes.SET_EMAIL_FAILLED,
    success_action: authTypes.SET_EMAIL_SUCCESS,
    started_action: authTypes.SET_EMAIL_STARTED,
  });
};

export const set_password = (oldPassword, newPassword) => {
  return generic_auth_operations_actions({
    credentials: { oldPassword: oldPassword, newPassword: newPassword },
    url: set_password_url,
    failled_action: authTypes.SET_PASSWORD_FAILLED,
    success_action: authTypes.SET_PASSWORD_SUCCESS,
    started_action: authTypes.SET_PASSWORD_STARTED,
  });
};

export const reset_password_if_forgot = (email) => {
  return generic_auth_operations_actions({
    with_token: false,
    credentials: { mail: email },
    url: reset_password_if_forgot_url,
    failled_action: authTypes.RESET_PASSWORD_FAILLED,
    success_action: authTypes.RESET_PASSWORD_SUCCESS,
    started_action: authTypes.RESET_PASSWORD_STARTED,
  });
};

export const resend_token_for_signup = (email) => {
  return generic_auth_operations_actions({
    with_token: false,
    credentials: { mail: email },
    url: resend_token_for_signup_url,
    failled_action: authTypes.RESEND_TOKEN_FOR_SIGNUP_FAILLED,
    success_action: authTypes.RESEND_TOKEN_FOR_SIGNUP_SUCCESS,
    started_action: authTypes.RESEND_TOKEN_FOR_SIGNUP_STARTED,
  });
};

export const signup = (credential) => {
  return (dispatch) => {
    dispatch({ type: authTypes.RESET });
    dispatch({ type: authTypes.SIGNUP_STARTED });

    return axios
      .post(`${baseUrl}/${index_name}/signup`, credential)
      .then((data) => {
        dispatch({ type: authTypes.SIGNUP_SUCCESS, data: data });
      })
      .catch((err) => {
        if (err.response) {
          dispatch({
            type: authTypes.SIGNUP_FAILLED,
            errors: err.response.data,
          });
        } else {
          dispatch({ type: authTypes.SIGNUP_FAILLED });
        }
      });
  };
};

export const loadUser = () => {
  return (dispatch, getState) => {
    dispatch({ type: authTypes.RESET });
    dispatch({ type: authTypes.USER_LOADING });
    const token = getState().auth.token;
    let headers = headersCreator();

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    return fetch(`${baseUrl}/${index_name}/user`, { headers })
      .then((res) => {
        if (res.status < 500) {
          return res.json().then((data) => {
            return { status: res.status, data };
          });
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: authTypes.USER_LOADED, user: res.data });
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          dispatch({ type: authTypes.AUTHENTICATION_ERROR, data: res.data });
          throw res.data;
        }
      });
  };
};

export const login = (pseudo, password) => {
  return (dispatch, getState) => {
    let body = { pseudo, password };
    let headers = headersCreator();
    dispatch({ type: authTypes.RESET });
    dispatch({ type: authTypes.USER_LOGIING });
    return axios
      .post(`${baseUrl}/${index_name}/login`, body, { headers: headers })
      .then((response) => {
        dispatch({ type: authTypes.LOGIN_SUCCESSFUL, data: response.data });
        //update my user informations
        dispatch(
          updateDocument({
            entity: UPDATE_MY_INFO,
            item: response.data.user,
            id: response.data.user._id,
          })
        );
      })
      .catch((err) => {
        dispatch({
          type: authTypes.LOGIN_FAILED,
          errors: err.response ? err.response.data : err,
        });
      });
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    let headers = headersCreator();
    return fetch(`${baseUrl}/${index_name}/logout`, {
      headers,
      body: "",
      method: "POST",
    })
      .then((res) => {
        if (res.status === 204) {
          return { status: res.status, data: {} };
        } else if (res.status < 500) {
          return res.json().then((data) => {
            return { status: res.status, data };
          });
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then((res) => {
        if (res.status === 204) {
          dispatch({ type: authTypes.LOGOUT_SUCCESSFUL });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({ type: authTypes.AUTHENTICATION_ERROR, data: res.data });
          throw res.data;
        }
      });
  };
};
