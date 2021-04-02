import * as httpTypes from '../types/http.types';
import * as statusType from '../types/status.type';
import {
  GetpublicationType,
} from '../actions/publication.actions';
import {ToastAndroid} from 'react-native';

const showNotif = (message) => {

  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    25,
    50,
  );
};

export const NotificationMiddleware = store => next => action => {
  if (
    action.type.includes(GetpublicationType(httpTypes.POST, statusType.SUCCESS))
  ) {
    //addNotification(`Vous avez ajouté un nouveau post` , uuid() , statusType.SUCCESS);
    showNotif(`Vous avez ajouté un nouveau post`);
  }
  if (
    action.type.includes(GetpublicationType(httpTypes.POST, statusType.FAILLED))
  ) {
    // addNotification(
    //   `Erreur lors de la soumission du post`,
    //   uuid(),
    //   statusType.SUCCESS,
    // );
    showNotif(`Erreur lors de l'ajout du post`);
  }
  return next(action);
};
