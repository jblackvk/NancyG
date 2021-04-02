
import { HttpReducer } from '../reducers/http.reducer';
import * as httpAction from '../actions/actionBuilder';

const initialState = {
    loading: false,
};

export class Provider {

    providerStructure = {
        entityname: '',
        initialState: {
            loading: false,
        },
        relativepath: '',
    }


    constructor(config = this.providerStructure) {
        this.entityname = config.entityname;
        this.reducerMap = new HttpReducer(config.initialState, this.entityname, config.relativepath).Buildreducer();
    }

    postItem(item) {
        return httpAction.PostAction(this.entityname, '', item);
    }
    getMultipleItem(param = {}, set_docs = true) {
        return httpAction.GetAction(this.entityname, param, '', true, set_docs);
    }

    getSingleItem(id, param = {}) {
        return httpAction.GetAction(this.entityname, param, `/${id}`);
    }
    updateItem(id, newItem) {
        return httpAction.PutAction(this.entityname, `/${id}`, newItem);
    }

    deleteItem(id) {
        return httpAction.DeleteAction(this.entityname, `/${id}`);
    }

    getReducer = (state = initialState, action) => {
        var cases = Object.keys(this.reducerMap);
        if (!cases.includes(action.type)) {
            return state;
        }
        else {
            return this.reducerMap[action.type](state, action);
        }
    }

}