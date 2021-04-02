import { buildLoaderType, UP , DOWN } from "../types/loader.types"


/**
 * this fonction up the loader in a specific entity
 * @param {string} entity entity conerned
 * @param {string} type type can be FETCH or PUSH
 */
export const upLoader = (entity , type)=>{
    return {
        type : buildLoaderType(entity , type , UP)
    }
}


/**
 * this fonction down the loader in a specific entity
 * @param {string} entity entity conerned
 * @param {string} type type can be FETCH or PUSH
 */
export const downLoader = (entity , type)=>{
    return {
        type : buildLoaderType(entity , type , DOWN)
    }
}