import {
  ADD,
  REMOVE,
  SET,
  UPDATE,
  buildDocumentType,
  REPLACE_ALL,
} from "../types/document.type";

/**
 * add new item to a document
 * @param {*} param0
 */
export const addDocument = ({ item, entity }) => {
  return {
    type: buildDocumentType(entity, ADD),
    payload: {
      item: item,
    },
  };
};

/**
 * update item in a set of documents
 * @param {*} param0
 */
export const updateDocument = ({ item, id, entity }) => {
  return {
    type: buildDocumentType(entity, UPDATE),
    payload: {
      item: item,
      id: id,
    },
  };
};

/**
 * delete item in set of document
 * @param {*} param0
 */

export const deleteDocument = ({ id, entity }) => {
  return {
    type: buildDocumentType(entity, REMOVE),
    payload: {
      id: id,
    },
  };
};

/**
 * set items of item.. there we entierely replace document
 * @param {*} param0
 */
export const replaceAllDocument = ({ items, entity }) => {
  return {
    type: buildDocumentType(entity, REPLACE_ALL),
    payload: {
      items: items,
    },
  };
};

/**
 * notify entity middleware to process to mutate document
 * @param {string} entity conserned entity
 * @param {Object} normalizeddata normalized data
 * @param {string} prevmethod can be GET , PUT , POST , DELETE from there the entity middleware can know what to do
 */

export const setDocument = (entity, data, prevmethod) => {
  return {
    type: buildDocumentType(entity, SET),
    meta: {
      entity: entity,
      prevmethod: prevmethod,
    },
    payload: {
      data: data,
    },
  };
};
