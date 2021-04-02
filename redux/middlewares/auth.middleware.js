import * as authTypes from '../types/auth.types';
import { removeItem, saveItem } from '../storage/index';
import {setToken} from '../http/settings';




export const storageManagerMiddleware = store => next => action => {
    if (action.type === authTypes.LOGIN_FAILED || action.type === authTypes.AUTHENTICATION_ERROR
        || authTypes.LOGOUT_SUCCESSFUL) {
        removeItem('token');

    }
    if (action.type === authTypes.LOGIN_SUCCESSFUL) {
        // saveItem(action.data.token, 'token');
        // setToken(action.data.token);
    }
    return next(action);
}