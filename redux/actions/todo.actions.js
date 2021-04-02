import { defaultActionMeta } from "./actionBuilder";
import { entitiesconf } from "../conf";
import {buildActionType} from '../types/utils';
import * as httpActions from './actionBuilder';
import * as httpTypes from '../types/http.types';
import * as status from '../types/status.type';
import { baseUrl } from "../http/settings";

const { name, suffixurl } = entitiesconf.todo;

export const GetTodoType = (httpmethod, status) => {
  return buildActionType({
    httpmethod: httpmethod,
    status: status,
    entity: name,
  });
};

export const getTodos = (params = {}, config = defaultActionMeta) => {
  return httpActions.GetAction({
    url: baseUrl+suffixurl,
    stated_type: GetTodoType(httpTypes.GET, status.STARTED),
    failled_type: GetTodoType(httpTypes.GET, status.FAILLED),
    sucess_type: GetTodoType(httpTypes.GET, status.SUCCESS),
    params: params,
    entity: name,
    ...config,
  });
};


export const addTodos = (item , config = defaultActionMeta) => {
    return httpActions.PostAction({
      url: baseUrl+suffixurl,
      data : item,
      stated_type: GetTodoType(httpTypes.POST, status.STARTED),
      failled_type: GetTodoType(httpTypes.POST, status.FAILLED),
      sucess_type: GetTodoType(httpTypes.POST, status.SUCCESS),
      entity: name,
      ...config,
    });
  };
