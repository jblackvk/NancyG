import * as httpTypes from '../types/http.types';
import * as statusType from '../types/status.type';
import * as loaderType from '../types/loader.types';
import {normalizerMap, errorNormalizer} from '../normalizer/core';
import {createNotification} from '../actions/notification.action';
import {upLoader, downLoader} from '../actions/loader.actions';
import {setDocument} from '../actions/document.action';
import {API} from '../types/utils';

/**
 *
 * @param {*} action
 */
const guestLoaderType = action => {
  if (
    action.type.includes(httpTypes.PUT) ||
    action.type.includes(httpTypes.POST) ||
    action.type.includes(httpTypes.DELETE)
  ) {
    return loaderType.PUSH;
  } else if (action.type.includes(httpTypes.GET)) {
    return loaderType.FETCH;
  }

  return null;
};

/**
 *
 * @param {*} dispatch
 * @param {*} action
 */

const onFailledHandler = (dispatch, action) => {
  //normalize errors
  var normalizedError = errorNormalizer(action.error);

  //request has falled
  try {
    action.meta.onFailled(normalizedError);
  } catch (error) {
    
  }

  //create notification

  var notificationText = action.meta.notifMessage(null, normalizedError);

  //trow it if we need
  if (notificationText && notificationText !== '') {
    dispatch(
      createNotification(
        notificationText,
        statusType.NOTIF_FAILLED,
        action.meta.entity,
      ),
    );
  }

  //down the loader
  var type = guestLoaderType(action);

  if (type) {
    dispatch(downLoader(action.meta.entity, type));
  }
};

const onSucessHandler = (dispatch, action) => {
  //normalize data
  var normalized_data;
  if (
    action.meta.normalizerId &&
    Object.keys(normalizerMap).includes(action.meta.normalizerId)
  ) {
    normalized_data = normalizerMap[action.meta.normalizerId](action.data);
  } else {
    normalized_data = normalizerMap.default(action.data);
  }
  //request was a success
  try {
    action.meta.onSuccess(normalized_data);
  } catch (error) {}

  //create notification

  var notificationText = action.meta.notifMessage(normalized_data, null);

  //trow it if we need
  if (notificationText && notificationText !== '') {
    dispatch(
      createNotification(
        notificationText,
        statusType.NOTIF_SUCCESS,
        action.meta.entity,
      ),
    );
  }

  //down the loader

  var type = guestLoaderType(action);

  if (type) {
    dispatch(downLoader(action.meta.entity, type));
  }

  //call the next to perform documents actions
  dispatch(
    setDocument(action.meta.entity, normalized_data, action.meta.method),
  );
};

const onStartedHandler = (dispatch, action) => {
  var type = guestLoaderType(action);
  if (type) {
    dispatch(upLoader(action.meta.entity, type));
  }
};

/**
 * le middleware qui se charge de tout le trafic http
 * @param {} store
 */

export const coreMiddleware = store => next => action => {
  const {dispatch} = store;

  //check if it's for core middleware
  if (action.type.includes(API)) {
    //generaly if the request failled we need to do some stuff
    if (action.type.includes(statusType.FAILLED)) {
      onFailledHandler(dispatch, action);
    }

    //if it's a success
    else if (action.type.includes(statusType.SUCCESS)) {
      onSucessHandler(dispatch, action);
    }

    //if started
    else if (action.type.includes(statusType.STARTED)) {
      onStartedHandler(dispatch, action);
    }
  }

  return next(action);
};
