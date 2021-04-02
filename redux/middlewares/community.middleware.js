import {
  ALL_COMMUNITY,
  MY_COMMUNITY,
  CREATED_COMMUNITY,
  ADD_USER,
  ADD_ADMIN,
  REMOVE_ADMIN,
  LIKE_PUBLICATION,
  REMOVE_USER,
} from "../types/entity.type";
import { SET } from "../types/document.type";
import { standartDocumentHandler } from "./utils";
import { updateDocument, deleteDocument } from "../actions/document.action";
import { singleCommunityNormilizer } from "../normalizer/core";
import { getCurrentUserId } from "../store/index";

const supportedEntities = [ALL_COMMUNITY, MY_COMMUNITY, CREATED_COMMUNITY];

/**
 * where whe net to dispatch multiple envents
 */
const specialSupportedEntities = [
  ADD_USER,
  ADD_ADMIN,
  REMOVE_ADMIN,
  LIKE_PUBLICATION,
  REMOVE_USER,
];

export const communityMiddleware = (store) => (next) => (action) => {
  const { dispatch } = store;

  //check if it's a document action
  if (action.type.includes(SET)) {
    //check if entity is supported
    if (supportedEntities.includes(action.meta.entity)) {
      //then perform some stuff
      standartDocumentHandler(action, dispatch);
    } else if (specialSupportedEntities.includes(action.meta.entity)) {
      //data is already normalized there

      //update users communities if possible

      //update allcommunity
      var comm = singleCommunityNormilizer(action.payload.data.communaute);
      var deleted_user = action.payload.data.user;
      if (action.meta.entity === REMOVE_USER) {
        // if it's me
        if (deleted_user._id === getCurrentUserId()) {
          dispatch(
            deleteDocument({
              id: comm._id,
              entity: MY_COMMUNITY,
            })
          );
        }
      } else {
        dispatch(
          updateDocument({
            item: comm,
            id: action.payload.data.communaute._id,
            entity: ALL_COMMUNITY,
          })
        );

        //update my community
        dispatch(
          updateDocument({
            item: comm,
            id: action.payload.data.communaute._id,
            entity: MY_COMMUNITY,
          })
        );

        //then created community
        dispatch(
          updateDocument({
            item: comm,
            id: action.payload.data.communaute._id,
            entity: CREATED_COMMUNITY,
          })
        );
      }
    }
  }

  return next(action);
};
