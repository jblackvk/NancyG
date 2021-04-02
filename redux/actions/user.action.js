import {
  defaultActionMeta,
  GetAction,
  DeleteAction,
  PostAction,
  PutAction,
} from "./actionBuilder";
import { getCurrentUserId } from "../store";
import { baseUrl } from "../http/settings";
import {
  USER_INFO,
  ABONNES,
  ABONNEMENTS,
  UPDATE_MY_INFO,
  FIND_USERS,
  CHANGE_EMAIL,
  CHANGE_EMAIL_CONFIRM,
  PASSWORD_OPERATION,
  USER_ABONNES,
} from "../types/entity.type";
import { normalizersId } from "../normalizer/core";

const getUsersUrl = () => {
  return `${baseUrl}/users`;
};

const set_email_verification_url = `${getUsersUrl()}/verification/email`;
const reset_password_verification_url = `${getUsersUrl()}/verification/password`;
const set_email_url = `${getUsersUrl()}/set/email`;
const set_password_url = `${getUsersUrl()}/password/set`;
const reset_password_if_forgot_url = `${getUsersUrl()}/reset/password`;

/**
 * recuperer les informations d'un utilisateur. bien vouloir definir les callback pour utiliser ces info
 * @param {*} idUser
 * @param {*} config
 */
export const getUserInfo = (idUser, config = defaultActionMeta) => {
  return GetAction({
    url: `${getUsersUrl()}/${idUser}`,
    entity: USER_INFO,
    normalizerId: normalizersId.user,
    ...config,
  });
};

/**
 * recuperer mes info detaillé
 * @param {*} config
 */
export const getMyInfo = (config = defaultActionMeta) => {
  return getUserInfo(getCurrentUserId(), config);
};

/**
 * m'abonner à quelqu'un
 * @param {*} idUser
 * @param {*} config
 */
export const subscribeToUser = (idUser, config = defaultActionMeta) => {
  return PostAction({
    data: {
      idUser: idUser,
    },
    url: `${getUsersUrl()}/abonnement`,
    entity: ABONNEMENTS,
    multipart: false,
    normalizerId: normalizersId.default,
    ...config,
  });
};

/**
 * me desaboner de quelqu'un
 * @param {string} idUser
 * @param {*} config
 */
export const unsubscribeToUser = (idUser, config = defaultActionMeta) => {
  return DeleteAction({
    entity: ABONNEMENTS,
    url: `${getUsersUrl()}/abonnement/${idUser}`,
    normalizerId: normalizersId.default,
    ...config,
  });
};

/**
 * la liste de mes abonnes
 * @param {*} params
 * @param {*} config
 */
export const getMyFlowlowersList = (
  params = {},
  config = defaultActionMeta
) => {
  return GetAction({
    url: `${getUsersUrl()}/abonnes`,
    entity: ABONNES,
    normalizerId: normalizersId.abonne,
    params: params,
    ...config,
  });
};

export const getUserFollowers = (idUser, config = defaultActionMeta) => {
  return GetAction({
    url: `${getUsersUrl()}/abonnes`,
    entity: USER_ABONNES,
    normalizerId: normalizersId.default,
    params: {
      idUser: idUser,
    },
    ...config,
  });
};

/**
 * banir un abonné
 * @param {*} idUser
 * @param {*} config
 */
export const removeMyFowlower = (idUser, config = defaultActionMeta) => {
  return DeleteAction({
    entity: ABONNES,
    normalizerId: normalizersId.default,
    url: `${getUsersUrl()}/abonnes/${idUser}`,
    ...config,
  });
};

/**
 * recuperer la liste des abonnements
 * @param {*} params
 * @param {*} config
 */
export const getSubscriptionsList = (
  params = {},
  config = defaultActionMeta
) => {
  return GetAction({
    entity: ABONNEMENTS,
    normalizerId: normalizersId.abonnement,
    url: `${getUsersUrl()}/abonnement`,
    params: params,
    ...config,
  });
};

/**
 * mettre à jours mon profil
 * @param {*} idUser l'id de l'utilisateur
 * @param {*} newInfo l'objet des infos
 * @param {*} config le config de base
 */
export const updateMyProfile = (
  idUser,
  newInfo,
  config = defaultActionMeta
) => {
  return PutAction({
    entity: UPDATE_MY_INFO,
    data: newInfo,
    multipart: true,
    normalizerId: normalizersId.default,
    url: `${getUsersUrl()}/${idUser}`,
    ...config,
  });
};

/**
 * recherche des utilisateurs Nancy
 * @param {*} searchPseudo
 * @param {*} config
 */
export const FindNancyUser = (searchPseudo, config = defaultActionMeta) => {
  return GetAction({
    entity: FIND_USERS,
    normalizerId: normalizersId.default,
    url: getUsersUrl(),
    params: { pseudo: searchPseudo },
    ...config,
  });
};

/**
 * declacher un changement de mail
 * @param {*} newEmail
 * @param {*} oldEmail
 * @param {*} config
 */
export const set_email = (newEmail, oldEmail, config = defaultActionMeta) => {
  var data = { newEmail: newEmail, oldEmail: oldEmail };
  return PostAction({
    url: set_email_url,
    data: data,
    entity: CHANGE_EMAIL,
    normalizerId: normalizersId.default,
    ...config,
  });
};

/**
 * confirmer le changement de mail
 * @param {*} token
 * @param {*} config
 */
export const confirm_set_email = (token, config = defaultActionMeta) => {
  var data = { token: token };
  return PostAction({
    url: set_email_verification_url,
    data: data,
    entity: CHANGE_EMAIL_CONFIRM,
    normalizerId: normalizersId.default,
    ...config,
  });
};

/**
 * changer son mot de passe
 * @param {*} oldPassword
 * @param {*} newPassword
 * @param {*} config
 */
export const set_password = (
  oldPassword,
  newPassword,
  config = defaultActionMeta
) => {
  var data = { oldPassword: oldPassword, newPassword: newPassword };
  return PostAction({
    url: set_password_url,
    data: data,
    entity: PASSWORD_OPERATION,
    normalizerId: normalizersId.default,
    ...config,
  });
};

/**
 * declancher la renitialisation du mot de passe
 * @param {*} email
 * @param {*} config
 */
export const reset_password_if_forgot = (email, config = defaultActionMeta) => {
  return PostAction({
    url: reset_password_if_forgot_url,
    data: { mail: email },
    entity: PASSWORD_OPERATION,
    normalizerId: normalizersId.default,
    ...config,
  });
};

/**
 * cofirmer la renitialisation du mot de passe
 * @param {*} token
 * @param {*} newPassword
 * @param {*} config
 */
export const confirm_reset_password = (
  token,
  newPassword,
  config = defaultActionMeta
) => {
  return PostAction({
    url: reset_password_verification_url,
    data: { token, newPassword },
    entity: PASSWORD_OPERATION,
    normalizerId: normalizersId.default,
    ...config,
  });
};
