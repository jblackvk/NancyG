import { buildDocumentType, ADD, REMOVE } from "../types/document.type";
import { NOTIFICATION } from "../types/entity.type";

const initialState = {
  notifications: [],
};

export function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case buildDocumentType(NOTIFICATION, ADD):
      return {
        ...state,
        notifications: [action.payload.item, ...state.notifications],
      };

    case buildDocumentType(NOTIFICATION, REMOVE):
      const { id } = action.payload;
      return {
        ...state,
        notifications: state.notifications.filter((elt) => elt.id !== id),
      };

    default:
      return state;
  }
}
