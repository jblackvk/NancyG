import { ABONNEMENTS, ABONNES, UPDATE_MY_INFO, CHANGE_EMAIL_CONFIRM } from "../types/entity.type";
import { SET } from "../types/document.type";
import { standartDocumentHandler } from "./utils";
import { updateDocument, replaceAllDocument } from "../actions";

const supportedEntities = [ABONNEMENTS, ABONNES, UPDATE_MY_INFO];

/**
 * where whe net to dispatch multiple envents
 */
const specialSupportedEntities = [CHANGE_EMAIL_CONFIRM];

export const userMiddleware = (store) => (next) => (action) => {
  const { dispatch } = store;

  //check if it's a document action
  if (action.type.includes(SET)) {
    //check if entity is supported
    if (supportedEntities.includes(action.meta.entity)) {
      //then perform some stuff
      standartDocumentHandler(action, dispatch);
    } else if (specialSupportedEntities.includes(action.meta.entity)) {
      //data is already normalized there
      if(action.meta.entity === CHANGE_EMAIL_CONFIRM){
        //update userInfo
        dispatch(
          updateDocument({
            item : action.payload.data.user,
            id : action.payload.data.user._id,
            entity : UPDATE_MY_INFO,
          })
        )
      }      
    }
  }

  return next(action);
};
