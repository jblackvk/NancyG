export const ADD = "ADD_DOCUMENT"
export const SET = "SET_DOCUMENT"
export const REMOVE = "REMOVE_DOCUMENT"
export const UPDATE = "UPDATE_DOCUMENT"
export const REPLACE_ALL = "REPLACE_ALL_DOCUMENT"


export const buildDocumentType = (entity , operation)=>{
    return `[${entity}] ${operation}`;
}