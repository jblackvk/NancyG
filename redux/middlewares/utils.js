import { ADD, REMOVE, REPLACE_ALL, UPDATE } from "../types/document.type";
import { PUT, DELETE, GET, POST } from "../types/http.types";
import {
  updateDocument,
  deleteDocument,
  replaceAllDocument,
  addDocument,
} from "../actions/document.action";
import {
  CREATED_COMMUNITY,
  MY_COMMUNITY,
  ALL_COMMUNITY,
  PLANETTE_NANCY_PUBLICATIONS,
  NANCY_BOOK_PUBLICATIONS,
} from "../types/entity.type";

const classicMap = {
  GET: REPLACE_ALL,
  DELETE: REMOVE,
  PUT: UPDATE,
  POST: ADD,
};

/**
 * guest document method for next action
 * @param {string} prevHttpMethod
 */
export const guestNextDocumentMethod = (prevHttpMethod) => {
  return classicMap[prevHttpMethod];
};

/**
 *
 * @param {Object} action
 * @param {Function} dispatch
 */
export const standartDocumentHandler = (action, dispatch) => {
  switch (action.meta.prevmethod) {
    case GET:
      dispatch(
        replaceAllDocument({
          items: action.payload.data.publications
            ? action.payload.data.publications
            : action.payload.data,
          entity: action.meta.entity,
        })
      );
      return;
    case POST:
      if (
        [PLANETTE_NANCY_PUBLICATIONS, NANCY_BOOK_PUBLICATIONS].includes(
          action.meta.entity
        )
      ) {
        dispatch(
          addDocument({
            item: action.payload.data.publication,
            entity: action.meta.entity,
          })
        );
        return;
      }
      if (action.meta.entity == MY_COMMUNITY) {
        dispatch(
          addDocument({
            item: action.payload.data,
            entity: ALL_COMMUNITY,
          })
        );

        dispatch(
          addDocument({
            item: action.payload.data,
            entity: CREATED_COMMUNITY,
          })
        );

        return;
      }

      dispatch(
        addDocument({
          item: action.payload.data,
          entity: action.meta.entity,
        })
      );
      return;

    case PUT:
      dispatch(
        updateDocument({
          item: action.payload.data,
          id: action.payload.data.id,
          entity: action.meta.entity,
        })
      );
      return;
    case DELETE:
      dispatch(
        deleteDocument({
          id: action.payload.data.id,
          entity: action.meta.entity,
        })
      );
      return;
    default:
      return;
  }
};
