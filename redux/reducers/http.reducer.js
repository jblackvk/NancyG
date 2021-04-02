import * as httpTypes from '../types/http.types';
import { buildActionType } from '../actions/actionBuilder';
import * as statusTypes from '../types/status.type';



export class HttpReducer {
    constructor(initialState, entityname, relativepath = '', storeObjectProperty = {
        get_err: 'get_error',
        post_err: 'post_error',
        put_err: 'put_error',
        delete_err: 'delete_error',
        loading: 'loading',
        get_data: entityname ? entityname : 'data',
        post_data: 'post_resp',
        delete_data: 'delete_resp',
        put_data: 'put_resp',
        update_entity: `update_${entityname ? entityname : 'entity'}`
    }) {
        this.initialState = initialState;
        this.entityname = entityname;
        this.relativepath = relativepath;
        this.storeObjectProperty = storeObjectProperty;
        this._defaultActionConfiguration = {
            get: {
                loading: 'loading',
                resp: 'data',
                error: 'error',
            },
            post: {
                loading: 'loading',
                resp: 'resp',
                error: 'error',
            },
            put: {
                loading: 'loading',
                resp: 'resp',
                error: 'error',
            },
            delete: {
                loading: 'loading',
                resp: 'resp',
                error: 'error',
            }
        }
    }

    Buildreducer(actionConfiguration = this._defaultActionConfiguration) {
        var reducerMap = [];
        var https = [httpTypes.GET, httpTypes.POST, httpTypes.PUT, httpTypes.DELETE]
        var statusTypesTab = [statusTypes.SUCCESS , statusTypes.FAILLED , statusTypes.STARTED];
        https.forEach(httpType => {
            statusTypesTab.forEach(statusType => {
                var prop = buildActionType(httpType, this.entityname, statusType, this.relativepath);
                var handler;
                if (statusType === statusTypes.FAILLED) {
                    handler = (state, action) => {
                        var deriviedState = { ...state };
                        deriviedState[this.storeObjectProperty.loading] = action[actionConfiguration[httpType.toLowerCase()].loading];
                        deriviedState[this.storeObjectProperty[httpType.toLowerCase() + '_err']] = action[actionConfiguration[httpType.toLowerCase()].error];
                        return deriviedState;
                    }

                }
                else if (statusType === statusTypes.SUCCESS) {
                    handler = (state, action) => {
                        var deriviedState = { ...state };
                        deriviedState[this.storeObjectProperty.loading] = action[actionConfiguration[httpType.toLowerCase()].loading];
                        deriviedState[this.storeObjectProperty[httpType.toLowerCase() + '_data']] = action[actionConfiguration[httpType.toLowerCase()].resp];
                        return deriviedState;
                    }
                }
                else {
                    handler = (state, action) => {
                        var deriviedState = { ...state };
                        deriviedState[this.storeObjectProperty.loading] = action[actionConfiguration[httpType.toLowerCase()].loading];
                        return deriviedState;
                    }
                }
                reducerMap[prop] = handler;
            })
        })
        return reducerMap;
    }
}