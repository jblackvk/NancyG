import {HttpReducer} from './http.reducer';

const initialState = {
    loading: false,
};


var httpTestReducer = new HttpReducer(initialState , 'todos');

var reducerMap = httpTestReducer.Buildreducer();

export function testReducer(state = initialState , action){
    var cases = Object.keys(reducerMap);
    if(!cases.includes(action.type)){
        
        return state;
    }
    else{
        return reducerMap[action.type](state , action);
    }
}