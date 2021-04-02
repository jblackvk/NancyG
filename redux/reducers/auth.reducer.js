import * as authTypes from "../types/auth.types";

const initialState = {
  isAuthenticated: null,
  isRegistered: null,
  weak_auth_actions_errors: null,
  IsWeakAuthActionOk: null,
  signup_errors: null,
  login_errors: null,
  loading: false,
  user: null,
  nancyId: null,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case authTypes.RESET:
      return {
        ...state,
        loading: false,
        login_errors: null,
        signup_errors: null,
        weak_auth_actions_errors: null,
      };

    case authTypes.USER_LOGIING:
      return { ...state, loading: true };

    case authTypes.USER_LOADING:
      return { ...state, loading: true };

    case authTypes.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.user,
      };

    case authTypes.LOGIN_SUCCESSFUL:
      return {
        ...state,
        ...action.data,
        token: action.data.token,
        isAuthenticated: true,
        loading: false,
        errors: null,
        nancyId: action.data.communaute ? action.data.communaute._id : "0",
      };

    case authTypes.AUTHENTICATION_ERROR:
      try {
        //console.log(action.data.errors['error']['errors'][0]);
      } catch {}
      return { ...state, login_errors: action.data, loading: false };
    case authTypes.LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        login_errors: action.errors,
        isAuthenticated: false,
      };
    case authTypes.LOGOUT_SUCCESSFUL:
      return {
        ...state,
        errors: action.data,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case authTypes.NETWORK_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        isBeenAutenticating: false,
      };
    case authTypes.SIGNUP_FAILLED:
      return {
        ...state,
        loading: false,
        signup_errors: action.errors,
      };
    case authTypes.SIGNUP_STARTED: {
      return {
        ...state,
        loading: true,
      };
    }
    case authTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.data,
        isRegistered: true,
      };
    }
    default:
      if (action.type.startsWith("WEAK_AUTH")) {
        if (action.type.includes("SUCCESS")) {
          if (action.type.includes("SIGNUP")) {
            return {
              ...state,
              weak_auth_actions_errors: null,
              loading: false,
              weak_action_data: action.data,
              IsWeakAuthActionOk: true,
              token: action.data.token,
              nancyId: action.data.communaute ? action.data.communaute._id : "0",
              user: action.data.user,
            };
          }
          return {
            ...state,
            weak_auth_actions_errors: null,
            loading: false,
            weak_action_data: action.data,
            IsWeakAuthActionOk: true,
          };
        } else if (action.type.includes("FAILLED")) {
          return {
            ...state,
            weak_auth_actions_errors: action.errors,
            loading: false,
            IsWeakAuthActionOk: false,
          };
        } else if (action.type.includes("STARTED")) {
          return {
            ...state,
            weak_auth_actions_errors: null,
            loading: true,
            IsWeakAuthActionOk: null,
          };
        }
      }
      return state;
  }
}
