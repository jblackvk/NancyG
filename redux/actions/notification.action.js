import { addDocument, deleteDocument } from "./document.action";
import { NOTIFICATION, CREATE_NOTIFICATION } from "../types/entity.type";

/**
 * create notification
 * @param {string} message
 * @param {string} level
 * @param {string} entity
 */

export const createNotification = (message, level, entity) => {
  return {
    meta: { entity: entity },
    type: CREATE_NOTIFICATION,
    payload: {
      message: message,
      level: level,
    },
  };
};

/**
 * add notification to notification document
 * @param {*} id
 * @param {*} message
 * @param {*} level
 * @param {string} entity
 */
export const addNotification = (id, message, level , entity) => {
  return addDocument({
    item: {
      message: message,
      level: level,
      id: id,
      entity : entity
    },
    entity: NOTIFICATION,
  });
};

/**
 * remove notification to notification document
 * @param {*} id
 */
export const deleteNotification = (id) => {
  return deleteDocument({
    entity: NOTIFICATION,
    id: id,
  });
};
