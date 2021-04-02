import * as httpActions from "./actionBuilder";
import { baseUrl } from "../http/settings";
import {
  PUBLICATION,
  NANCY_BOOK_PUBLICATIONS,
  PLANETTE_NANCY_PUBLICATIONS,
  LIKE_PLANETE_PUBLICATION,
  LIKE_PUBLICATION,
  SINGLE_PUBLICATION_INFO,
} from "../types/entity.type";
import { normalizersId } from "../normalizer/core";

const {
  post_publication,
  publication,
} = normalizersId;




const createForm = (data) => {
  var form = new FormData();
  var keys = Object.keys(data);
  keys.forEach((key) => {
    // if(key === 'images'){
    //   form.append(key , data[keys]);
    // }
    if (data[key] && data[key] !== "") {
      
      if(key === 'images'){
        data[key].forEach(image=>{
          form.append(key , image);
        })
      }
      else{
        form.append(key, data[key]);
      }
    }
  });
  return form;
};

/**
 *
 * @param {string} communityId
 */
const getPublicationUrl = (communityId = undefined) => {
  if (!communityId) {
    return `${baseUrl}/nancy/publications`;
  }
  //return `${baseUrl}/publications`;
  return `${baseUrl}/community/${communityId}/publications`;
};

/**
 * get NancyBook publications
 * @param {Object} params http params
 * @param {Object} config
 * @todo link to the correct url
 */

export const getNancyBookPublications = (
  params = {},
  config = httpActions.defaultActionMeta
) => {
  return httpActions.GetAction({
    url: getPublicationUrl(),
    params: params,
    ...config,
    entity: NANCY_BOOK_PUBLICATIONS,
    normalizerId: normalizersId.publication,
  });
};

/**
 *
 * @param {*} communityId empty if is nancy community
 * @param {*} params
 * @param {*} config
 */
export const getPublications = (
  communityId,
  params = {},
  config = httpActions.defaultActionMeta
) => {
  var nancy = communityId ? false : true;
  return httpActions.GetAction({
    url: getPublicationUrl(communityId),
    ...config,
    params: params,
    normalizerId: publication,
    entity: nancy ? PLANETTE_NANCY_PUBLICATIONS : PUBLICATION,
  });
};

/**
 * post publiciation in a community
 * @param {Object} param0
 * @param {Object} config
 */
export const PostPublication = (
  { publication, idCommunaute },
  config = httpActions.defaultActionMeta
) => {
  var nancy = idCommunaute ? false : true;
  return httpActions.PostAction({
    url: getPublicationUrl(idCommunaute),
    multipart: true,
    data: createForm(publication),
    ...config,
    normalizerId: post_publication,
    entity: nancy ? PLANETTE_NANCY_PUBLICATIONS : PUBLICATION,
  });
};

/**
 * comment publication
 * @param {*} param0 idParentPublication , publication and idCommunaute
 * @param {*} config
 */
export const AddComment = (
  { idParentPublication, publication, idCommunaute },
  config = httpActions.defaultActionMeta
) => {
  return PostPublication(
    {
      idCommunaute: idCommunaute,
      publication: {
        idParentPublication: idParentPublication,
        ...publication,
      },
    },
    config
  );
};

/**
 * like simple publication
 * @param {string} idcommunaute should be undifined if is nancy
 * @param {boolean} like like or dislike ?
 * @param {Object} config
 */

export const likePublication = (
  idCommunaute,
  like = true,
  publicationId,
  config = httpActions.defaultActionMeta
) => {
  var nancy = idCommunaute ? false : true;
  return httpActions.PostAction({
    url: `${getPublicationUrl(idCommunaute)}/${publicationId}/likes`,
    data: { aime: like },
    ...config,
    normalizerId: normalizersId.like_publication,
    entity: nancy ? LIKE_PLANETE_PUBLICATION : LIKE_PUBLICATION,
  });
};

/**
 *
 * @param {*} relativePath
 * @param {*} idCommunaute
 * @param {*} publicationId
 * @param {*} args
 * @param {*} config
 */
const GetpublicationOtherInfo = (
  relativePath,
  idCommunaute,
  publicationId,
  args,
  config = httpActions.defaultActionMeta
) => {
  return httpActions.GetAction({
    params: args,
    url: `${getPublicationUrl(idCommunaute)}/${publicationId}/${relativePath}`,
    ...config,
    normalizerId: normalizersId.default,
    entity: SINGLE_PUBLICATION_INFO,
  });
};


/**
 * get likes of publications
 * @param {*} idCommunaute 
 * @param {*} publicationId 
 * @param {*} args 
 * @param {*} config 
 */
export const GetPublicationLikeList = (
  idCommunaute,
  publicationId,
  args,
  config = httpActions.defaultActionMeta
) => {
  return GetpublicationOtherInfo(
    "likes",
    idCommunaute,
    publicationId,
    args,
    config
  );
};

/**
 * get likes of publications
 * @param {*} idCommunaute 
 * @param {*} publicationId 
 * @param {*} args 
 * @param {*} config 
 */
export const GetPublicationCommentList = (
  idCommunaute,
  publicationId,
  args,
  config = httpActions.defaultActionMeta
) => {
  return GetpublicationOtherInfo(
    "commentaires",
    idCommunaute,
    publicationId,
    args,
    config
  );
};


