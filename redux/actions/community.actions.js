import * as httpActions from "./actionBuilder";
import { normalizersId } from "../normalizer/core";
import { baseUrl } from "../http/settings";
import {
  MY_COMMUNITY,
  CREATED_COMMUNITY,
  ALL_COMMUNITY,
  ADD_ADMIN,
  SINGLE_COMMUNITY,
  ADD_USER,
  REMOVE_ADMIN,
  REMOVE_USER,
} from "../types/entity.type";
import { getCurrentUserId } from "../store";

const getCommunityUrl = (communityId) => {
  if (communityId) {
    return `${baseUrl}/communaute/${communityId}`;
  } else {
    return `${baseUrl}/communaute`;
  }
};

/**
 * @todo update this url
 */
const my_communities_url = `${getCommunityUrl()}`;

const all_communities_url = `${getCommunityUrl()}/all`;

const created_communities_url = `${getCommunityUrl()}`;

/**
 * get all communities list
 * @param {*} params
 * @param {*} config
 */
export const getAllCommunities = (
  params = {},
  config = httpActions.defaultActionMeta
) => {
  return httpActions.GetAction({
    url: all_communities_url,
    params: params,
    ...config,
    normalizerId: normalizersId.community,
    entity: ALL_COMMUNITY,
  });
};

/**
 * get all communities list
 * @param {*} params
 * @param {*} config
 */
export const getMyCommunities = (
  params = {},
  config = httpActions.defaultActionMeta
) => {
  return httpActions.GetAction({
    url: `${my_communities_url}?idUser=${getCurrentUserId()}`,
    params: params,
    ...config,
    normalizerId: normalizersId.community,
    entity: MY_COMMUNITY,
  });
};

/**
 * get all communities list
 * @param {*} params
 * @param {*} config
 */
export const getCreatedCommunities = (
  params = {},
  config = httpActions.defaultActionMeta
) => {
  return httpActions.GetAction({
    url: `${created_communities_url}?idAdmin=${getCurrentUserId()}`,
    params: params,
    ...config,
    normalizerId: normalizersId.community,
    entity: CREATED_COMMUNITY,
  });
};

/**
 * get more info about community
 * @param {*} idCommunity
 * @param {*} config
 */
export const moreAboutCommunity = (
  idCommunity,
  params = {},
  config = httpActions.defaultActionMeta
) => {
  return httpActions.GetAction({
    url: getCommunityUrl(idCommunity),
    params: params,
    ...config,
    normalizerId: normalizersId.community,
    entity: SINGLE_COMMUNITY,
  });
};

export const PostCommunity = (
  { community },
  config = httpActions.defaultActionMeta
) => {
  return httpActions.PostAction({
    url: my_communities_url,
    data: community,
    ...config,
    normalizerId: normalizersId.community,
    entity: MY_COMMUNITY,
  });
};

/**
 *mettre à jours les informations de base d'une communauté
 * @param {Object} item
 * @param {string} id
 * @param {Object} config
 */

export const updateCommunity = (
  item,
  id,
  config = httpActions.defaultActionMeta
) => {
  return httpActions.PutAction({
    url: getCommunityUrl(id),
    data: item,
    entity: MY_COMMUNITY,
    ...config,
    normalizerId: normalizersId.community,
  });
};

/**
 * Utilser ceci à la volée,
 * @param {string} idCommunity
 * @param {string} idAdmin
 */
export const addAdmin = (
  idCommunity,
  idAdmin,
  config = httpActions.defaultActionMeta
) => {
  var item = {
    idCommunity,
    idAdmin,
  };

  return httpActions.PostAction({
    url: `${getCommunityUrl(idCommunity)}/admins`,
    data: item,
    entity: ADD_ADMIN,
    ...config,
    normalizerId: normalizersId.default,
  });
};

/**
 * Utilser ceci à la volée,
 * @param {string} idCommunity
 * @param {string} idAdmin
 */
export const removeAdmin = (
  idCommunity,
  idAdmin,
  config = httpActions.defaultActionMeta
) => {
  return httpActions.DeleteAction({
    url: `${getCommunityUrl(idCommunity)}/admins/${idAdmin}`,
    entity: REMOVE_ADMIN,
    ...config,
    normalizerId: normalizersId.default,
  });
};


/**
 * retirer un utilisarteur ou se faire expulser
 * @param {*} idCommunity 
 * @param {*} idUser 
 * @param {*} config 
 */
export const removeUser = (
  idCommunity,
  idUser,
  config = httpActions.defaultActionMeta
) => {
  return httpActions.DeleteAction({
    url: `${getCommunityUrl(idCommunity)}/users/${idUser}`,
    entity: REMOVE_USER,
    ...config,
    normalizerId: normalizersId.default,
  });
};

/**
 * ajouter un utilisateur
 * @param {*} idCommunity
 * @param {*} idUser
 */
export const addUsers = (
  idCommunity,
  idUsers,
  config = httpActions.defaultActionMeta
) => {
	if(Array.isArray(idUsers)){
	 var item = {
	    idCommunity : idCommunity,
	    idUsers: idUsers,
	  };
	}
	else{
	 var item = {
	    idCommunity : idCommunity,
	    idUser: idUsers,
	  };
	}
 

  return httpActions.PostAction({
    url: `${getCommunityUrl(idCommunity)}/users`,
    data: item,
    entity: ADD_USER,
    ...config,
    normalizerId: normalizersId.default,
  });
};



/**
 * la liste des utilisateurs
 * @param {*} idCommunity 
 * @param {*} params 
 * @param {*} config 
 */
const ListeUsers = (
  idCommunity,
  params = {},
  config = httpActions.defaultActionMeta
) => {
  return httpActions.GetAction({
    url: `${getCommunityUrl(idCommunity)}/users`,
    params: params,
    ...config,
    normalizerId: normalizersId.default,
    entity: SINGLE_COMMUNITY+"_USERS",
  });
};



/**
 * Liste des admins
 * @param {*} idCommunity 
 * @param {*} params 
 * @param {*} config 
 */
const ListeAdmins = (
  idCommunity,
  params = {},
  config = httpActions.defaultActionMeta
) => {
  return httpActions.GetAction({
    url: `${getCommunityUrl(idCommunity)}/admins`,
    params: params,
    ...config,
    normalizerId: normalizersId.default,
    entity: SINGLE_COMMUNITY+"_ADMIN",
  });
};
