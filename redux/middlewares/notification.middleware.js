import { CREATE_NOTIFICATION } from "../types/entity.type";
import {
  addNotification,
  deleteNotification,
} from "../actions/notification.action";
import { notificationTimeout } from "../conf";

export const NotificationMiddleware = (store) => (next) => (action) => {
  next(action);

  if (action.type.includes(CREATE_NOTIFICATION)) {
    //generate id and
    const { message, level } = action.payload;
    const id = new Date().getMilliseconds();

    //then add it to notification middleware
    next(addNotification(id, message, level, action.meta.entity));

    //after a few seconds , delete it
    setTimeout(() => {
      next(deleteNotification(id));
    }, notificationTimeout);
  }

  // return next(action);
};
