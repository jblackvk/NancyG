import { createStore, applyMiddleware } from "redux";
import { authReducer } from "../reducers/auth.reducer";
import logger from "redux-logger";
import { NotificationMiddleware } from "../middlewares/notification.middleware";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { publicationReducer } from "../reducers/publications.reducer";
import { notificationReducer } from "../reducers/notification.reducer";
import { communityReducer } from "../reducers/community.reducer";
import { coreMiddleware } from "../middlewares/core.middleware";
//import { composeWithDevTools } from "redux-devtools-extension";
import { publicationMiddleware } from "../middlewares/publication.middleware";
import { communityMiddleware } from "../middlewares/community.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { userReducer } from "../reducers/user.reducer";

const middlewares = [
  thunk,
  coreMiddleware,
  NotificationMiddleware,
  publicationMiddleware,
  communityMiddleware,
  userMiddleware,
];
let createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
let store = createStoreWithMiddleware(
  combineReducers({
    authReducer,
    publicationReducer,
    communityReducer,
    userReducer,
  })
);

// const store = createStore(
//   combineReducers({
//     authReducer,
//     publicationReducer,
//     communityReducer,
//     notificationReducer,
//     userReducer,
//   }),
//   composeWithDevTools(applyMiddleware(...middlewares))
// );

export default store;

export const getCurrentUserId = () => {
  var id = store.getState().authReducer.user._id;
  return id;
};

export const getNancyId = () => {
  var id = store.getState().authReducer.nancyId;
  if (id) {
    return id;
  }
  return "0";
};
