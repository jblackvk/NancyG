import { FETCH, UP, DOWN, PUSH } from "../types/loader.types";

/**
 *add item or update
 * @param {*} item
 * @param {*} array
 * @param {boolean} updateOnly true if just update
 */
export const addOrUpdate = (item, array, updateOnly = false) => {
  if (!item) {
    return array;
  }
  var foundIndex = array.findIndex((elt) => elt._id === item._id);
  console.log( "found index", foundIndex)
  if (foundIndex !== -1) {
    array[foundIndex] = item;
  } else if (!updateOnly) {
    array = [item, ...array];
  }
  console.log("item updated" , item);
  return array;
};

export const replace_all = (array = [], new_array = []) => {
  array = array.filter(
    (item) => new_array.findIndex((elt) => elt._id === item._id) === -1
  );
  return filter_unique([...array, ...new_array]);
};

const filter_unique = (array)=>{
  var flags = [], output = [], l = array.length, i;
  for( i=0; i<l; i++) {
      if( flags[array[i]._id]){
        continue;
      }
      flags[array[i]._id] = true;
      output.push(array[i]);
  }
  return output;
}

export const publicationAdd = (item, array) => {
  if (item.idParentPublication) {
    var parents = array.filter((elt) => elt._id === item.idParentPublication);
    if (parents.length == 1) {
      var parent = parents[0];
      parent.nbreCommentaire += 1;
      parent.listeCommentaires = [item, ...parent.listeCommentaires];
      return addOrUpdate(parent, array);
    } else {
      return array;
    }
  } else {

    return addOrUpdate(item, array);
  }
};

/**
 *
 * @param {*} id
 * @param {*} array
 */
export const deleteFromArray = (id, array) => {
  return array.filter((elt) => elt.id !== id);
};

/**
 *
 * @param {*} type
 * @param {*} getLoading
 * @param {*} postLoading
 */
export const handlerLoading = (type, getLoading, postLoading) => {
  var result = { getLoading: getLoading, postLoading: postLoading };

  if (type.includes(FETCH)) {
    if (type.includes(UP)) {
      result.getLoading = true;
    } else if (type.includes(DOWN)) {
      result.getLoading = false;
    }
  }
  if (type.includes(PUSH)) {
    if (type.includes(UP)) {
      result.postLoading = true;
    } else if (type.includes(DOWN)) {
      result.postLoading = false;
    }
  }

  return result;
};
