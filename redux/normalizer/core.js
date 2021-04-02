/**
 *
 * @param {Object} error object with body and status as fields
 * @todo write a body of this function
 */

import {
  INTERNET_ERROR,
  SERVER_INTERNAL_ERROR,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  UNKOWN_ERROR,
  RESPONSE_WAS_NOT_RECIEVED,
} from "../types/http.types";

export const errorNormalizer = (error) => {
  return {
    ...error,
    ...buildError(error),
  };
};

/**
 * return statusText and message. depend on status type
 * @param {*} param0
 */
const buildError = ({ status }) => {
  switch (status) {
    case 500:
      return {
        statusText: SERVER_INTERNAL_ERROR,
        message: "Erreur Coté Serveur",
      };
    case 422:
      return {
        statusText: BAD_REQUEST,
        message: "Erreur l'ors du traitement des données",
      };
    case 400:
      return {
        statusText: BAD_REQUEST,
        message: "Erreur l'ors du traitement des données",
      };
    case 401:
      return {
        statusText: UNAUTHORIZED,
        message: "Vous n'etes pas autorisé à acceder à la ressource",
      };
    case 404:
      return {
        statusText: NOT_FOUND,
        message: "La ressource n'existe plus",
      };
    default:
      if (status === INTERNET_ERROR) {
        return {
          statusText: status,
          message: "Verifiez Votre connexion internet",
        };
      }

      if (status === RESPONSE_WAS_NOT_RECIEVED) {
        return {
          statusText: status,
          message: "Le serveur Ne repond Pas",
        };
      }
      //else we dont know
      return {
        statusText: UNKOWN_ERROR,
        message: "Erreur inconnue",
      };
  }
};

/**
 * cette fonction normalise une communauté
 * @param {*} elt
 */

export const singleCommunityNormilizer = (elt) => {
  return {
    id: elt._id,
    name: elt.nom,
    Nbre_message: elt.nbrePublications,
    Nbre_Membre: elt.nbreAbonnes,
    label: elt.description,
    image: elt.profilUrl,
    ...elt,
  };
};

/**
 * cette fonction normalise plusieurs de communautés en tenant du fait que ca peut etre juste un seul element
 * @param {*} data
 */

export const CommunityNormalizer = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => singleCommunityNormilizer(item));
  }
  return singleCommunityNormilizer(data);
};

/**
 * converti les publications back en front
 * @param {Object} elt
 */
const singlepublicationNormalizer = (elt) => {
  if (!elt) {
    return [];
  }
  var all = elt._id ? {...elt} : {};
  if(!elt._id){
    return elt;
  }

  return {
    ...all,
    id: elt._id,
    texte_message: elt.contenu,
    nbreCommentaire: elt.nbreCommentaire,
    nbreResend: 0,
    //typeMedia: elt.fichiers && elt.fichiers.length ? elt.fichiers[0].mediaType : 'IMG',
    duree: 0,
    //image: elt.fichiers,
    nbreUnlike: 0,
    listeCommentaires:
      (elt.listeCommentaires && elt.listeCommentaires.length === 0)
        ? []
        : Array.isArray(elt.listeCommentaires) ?  elt.listeCommentaires.map(elt => singlepublicationNormalizer(elt)) :[]
  };
};

/**
 *
 * @param {Object} data
 */

export const PublicationNormalizer = (data) => {
  if (Array.isArray(data)) {
    try {
      return data.map((item) => singlepublicationNormalizer(item));
    } catch (error) {
      console.log(error);
    }
  }
  return singlepublicationNormalizer(data);
};

export const defaultNormalizer = (data) => {
  return data;
};

/**
 * cette constante revoi la liste des normalizer en tenant compte du type d'entité , default pour dire qu'on ne n
 * normalise pas
 */

export const normalizerMap = {
  user: (data) => {
    return defaultNormalizer(data);
  },

  abonnement: (data) => {
    return { abonnements: defaultNormalizer(data.mesabonnement) };
  },

  abonne: (data) => {
    return { abonnes: defaultNormalizer(data.mesabonnes) };
  },

  community: (data) => {
    //check attributes
    var att = data.communautes ? "communautes" : "communaute";
    return CommunityNormalizer(data[att]);
  },
  post_publication: (data) => {
    return {
      community: data.communaute ? CommunityNormalizer(data.communaute) : undefined,
      publication: PublicationNormalizer(data.publication),
    };
  },
  delete_publication: (data) => {
    return {
      community: CommunityNormalizer(data.communaute),
      publication: PublicationNormalizer(data.publication),
    };
  },

  like_publication: (data) => {
    return {
      publication: PublicationNormalizer(data.publication),
    };
  },

  publication: (data) => {
    var att = data.publications ? "publications" : "publication";
    var pubs = PublicationNormalizer(data[att]);
    return {
      publications: pubs,
    };
  },

  default: (data) => {
    return data;
  },
};

/**
 * normalizers disponible
 */
export const normalizersId = {
  community: "community",
  publication: "publication",
  default: "default",
  like_publication: "like_publication",
  delete_publication: "delete_publication",
  post_publication: "post_publication",
  user: "user",
  abonne: " abonne",
  abonnement: "abonnement",
};
