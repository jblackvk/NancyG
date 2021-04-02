import { LOADER } from "../types/loader.types";
import { ABONNES, ABONNEMENTS, UPDATE_MY_INFO } from "../types/entity.type";
import {
  buildDocumentType,
  REPLACE_ALL,
  ADD,
  REMOVE,
  UPDATE,
} from "../types/document.type";
import { addOrUpdate, deleteFromArray, handlerLoading } from "./utils";

const initialState = {
  postLoading: false,
  getLoading: false,
  abonnements: [],
  abonnes: [],
  user: null,
};

const supportedLoader = (type) => {
  if (type.includes(ABONNEMENTS) || type.includes(ABONNES)) {
    return true;
  }

  return false;
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case buildDocumentType(ABONNES, REPLACE_ALL):
      return {
        ...state,
        abonnes: action.payload.items,
      };
    case buildDocumentType(ABONNEMENTS, REPLACE_ALL):
      return {
        ...state,
        abonnements: action.payload.items,
      };

    case buildDocumentType(ABONNEMENTS, ADD):
      return {
        ...state,
        abonnements: addOrUpdate(action.payload.item, state.abonnements),
      };

    case buildDocumentType(ABONNES, ADD):
      return {
        ...state,
        abonnes: addOrUpdate(action.payload.item, state.abonnes),
      };

    case buildDocumentType(ABONNES, REMOVE):
      return {
        ...state,
        abonnes: deleteFromArray(action.payload.id, state.abonnes),
      };

    case buildDocumentType(ABONNEMENTS, REMOVE):
      return {
        ...state,
        abonnements: deleteFromArray(action.payload.id, state.abonnements),
      };

    //update user info
    case buildDocumentType(UPDATE_MY_INFO, UPDATE):
      return {
        ...state,
        user: action.payload.item,
      };

    default:
      if (action.type.includes(LOADER)) {
        if (supportedLoader(action.type)) {
          var loader = handlerLoading(
            action.type,
            state.getLoading,
            state.postLoading
          );

          return {
            ...state,
            ...loader,
          };
        }
      }
      return state;
  }
}
