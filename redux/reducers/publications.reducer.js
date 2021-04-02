import {
  buildDocumentType,
  REPLACE_ALL,
  ADD,
  UPDATE,
  REMOVE,
} from "../types/document.type";
import {
  NANCY_BOOK_PUBLICATIONS,
  PLANETTE_NANCY_PUBLICATIONS,
} from "../types/entity.type";
import {
  addOrUpdate,
  deleteFromArray,
  handlerLoading,
  publicationAdd,
  replace_all,
} from "./utils";
import { LOADER } from "../types/loader.types";

const initialState = {
  postLoading: false,
  getLoading: false,
  planeteNancyPublications: [],
  nancyBookPublications: [],
};

const supportedLoader = (type) => {
  if (
    type.includes(PLANETTE_NANCY_PUBLICATIONS) ||
    type.includes(NANCY_BOOK_PUBLICATIONS)
  ) {
    return true;
  }

  return false;
};

export function publicationReducer(state = initialState, action) {
  switch (action.type) {
    case buildDocumentType(NANCY_BOOK_PUBLICATIONS, REPLACE_ALL):
      return {
        ...state,
        nancyBookPublications: replace_all(
          state.nancyBookPublications,
          action.payload.items
        ),
      };

    case buildDocumentType(PLANETTE_NANCY_PUBLICATIONS, REPLACE_ALL):
      return {
        ...state,
        planeteNancyPublications: replace_all(
          state.planeteNancyPublications,
          action.payload.items
        ),
      };

    case buildDocumentType(PLANETTE_NANCY_PUBLICATIONS, ADD):
      return {
        ...state,
        planeteNancyPublications: publicationAdd(
          action.payload.item,
          state.planeteNancyPublications
        ),
        nancyBookPublications: publicationAdd(
          action.payload.item,
          state.nancyBookPublications
        ),
      };

    case buildDocumentType(PLANETTE_NANCY_PUBLICATIONS, REMOVE):
      return {
        ...state,
        planeteNancyPublications: deleteFromArray(
          action.payload.id,
          state.planeteNancyPublications
        ),
        nancyBookPublications: deleteFromArray(
          action.payload.id,
          state.nancyBookPublications
        ),
      };
    case buildDocumentType(PLANETTE_NANCY_PUBLICATIONS, UPDATE):
      return {
        ...state,
        planeteNancyPublications: addOrUpdate(
          action.payload.item,
          state.planeteNancyPublications
        ),
        nancyBookPublications: addOrUpdate(
          action.payload.item,
          state.nancyBookPublications
        ),
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
