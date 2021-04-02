

export const DOWN = "DOWN";
export const UP = "UP";
export const FETCH = "FETCH";
export const PUSH = "PUSH";

export const LOADER = "LOADER";

const CHANGE = "CHANGE";

/**
 * 
 * @param {*} entity entity name
 * @param {*} type type can be FECTH for GET request , or PUSH for PUT , POST and DELETE
 * @param {*} status can be DOWN or UP
 */
export const buildLoaderType = (entity , type , status)=>`[${entity}] ${CHANGE} ${type} ${LOADER} ${status}`