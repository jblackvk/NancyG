import { LOADER } from "../types/loader.types";
import {
  ALL_COMMUNITY,
  MY_COMMUNITY,
  CREATED_COMMUNITY,
} from "../types/entity.type";
import {
  buildDocumentType,
  REPLACE_ALL,
  ADD,
  UPDATE,
  REMOVE,
} from "../types/document.type";
import { addOrUpdate, deleteFromArray, handlerLoading } from "./utils";

const initialState = {
  postLoading: false,
  getLoading: false,
  all_communities: [],
  my_communities: [],
  created_communities: [],
};

const supportedLoader = (type) => {
  if (
    type.includes(ALL_COMMUNITY) ||
    type.includes(MY_COMMUNITY) ||
    type.includes(CREATED_COMMUNITY)
  ) {
    return true;
  }

  return false;
};

export function communityReducer(state = initialState, action) {
  switch (action.type) {
    case buildDocumentType(MY_COMMUNITY, REPLACE_ALL):
      return {
        ...state,
        my_communities: action.payload.items,
      };
    case buildDocumentType(ALL_COMMUNITY, REPLACE_ALL):
      return {
        ...state,
        all_communities: action.payload.items,
      };

    case buildDocumentType(CREATED_COMMUNITY, REPLACE_ALL):
      return {
        ...state,
        created_communities: action.payload.items,
      };

    case buildDocumentType(CREATED_COMMUNITY, ADD):
      return {
        ...state,
        created_communities: addOrUpdate(
          action.payload.item,
          state.created_communities
        ),
      };

    case buildDocumentType(ALL_COMMUNITY, ADD):
      return {
        ...state,
        all_communities: addOrUpdate(
          action.payload.item,
          state.all_communities
        ),
      };

    case buildDocumentType(MY_COMMUNITY, ADD):
      return {
        ...state,
        my_communities: addOrUpdate(action.payload.item, state.my_communities),
      };

    case buildDocumentType(CREATED_COMMUNITY, UPDATE):
      return {
        ...state,
        created_communities: addOrUpdate(
          action.payload.item,
          state.created_communities,
          true
        ),
      };

    case buildDocumentType(ALL_COMMUNITY, UPDATE):
      return {
        ...state,
        all_communities: addOrUpdate(
          action.payload.item,
          state.all_communities,
          false
        ),
      };

    case buildDocumentType(MY_COMMUNITY, UPDATE):
      return {
        ...state,
        my_communities: addOrUpdate(
          action.payload.item,
          state.my_communities,
          false
        ),
      };

    case buildDocumentType(MY_COMMUNITY, REMOVE):
      return {
        ...state,
        my_communities: deleteFromArray(
          action.payload._id,
          state.my_communities
        ),
      };

    case buildDocumentType(ALL_COMMUNITY, REMOVE):
      return {
        ...state,
        all_communities: deleteFromArray(
          action.payload.id,
          state.all_communities
        ),
      };
    case buildDocumentType(CREATED_COMMUNITY, REMOVE):
      return {
        ...state,
        created_communities: deleteFromArray(
          action.payload.id,
          state.created_communities
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
