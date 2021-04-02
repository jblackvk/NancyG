import {
  PUBLICATION,
  NANCY_BOOK_PUBLICATIONS,
  PLANETTE_NANCY_PUBLICATIONS,
  LIKE_PLANETE_PUBLICATION,
} from "../types/entity.type";
import { SET } from "../types/document.type";
import { standartDocumentHandler } from "./utils";
import { updateDocument } from "../actions/document.action";

const supportedEntities = [
  PUBLICATION,
  NANCY_BOOK_PUBLICATIONS,
  PLANETTE_NANCY_PUBLICATIONS,
];

/**
 * where whe net to dispatch multiple envents
 */
const specialSupportedEntities = [LIKE_PLANETE_PUBLICATION];

export const publicationMiddleware = (store) => (next) => (action) => {
  const { dispatch } = store;
  
  //check if it's a document action
  if (action.type.includes(SET)) {
    //check if entity is supported

    if (supportedEntities.includes(action.meta.entity)) {
      //then perform some stuff      
      standartDocumentHandler(action, dispatch);
    } else if (specialSupportedEntities.includes(action.meta.entity)) {
      //data is normalized there
      //update nancy publication list
      dispatch(
        updateDocument({
          item: action.payload.data.publication,
          id: action.payload.data.publication._id,
          entity: PLANETTE_NANCY_PUBLICATIONS,
        })
      );
    }
  }

  return next(action);
};
