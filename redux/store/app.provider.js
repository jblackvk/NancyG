// import * as httpAction from '../actions/actionBuilder';
// import { HttpReducer } from '../reducers/http.reducer';

// const initialState = {
//     loading: false,
// };

// export class AuthProvider {
//     static entityname = 'users';
//     static register_relativepath = 'signup';
//     static registerReducerMap = new HttpReducer(initialState, AuthProvider.entityname , AuthProvider.register_relativepath).Buildreducer();

//     static register(credential) {
//         return httpAction.PostAction(AuthProvider.entityname, AuthProvider.register_relativepath, credential, false);
//     }

//     static getRegisterReducer(state = initialState, action){
//         var cases = Object.keys(AuthProvider.registerReducerMap);
//         if (!cases.includes(action.type)) {
//             return state;
//         }
//         else {
//             return AuthProvider.registerReducerMap[action.type](state, action);
//         }
//     }

// }

// export class PublicationProvider {
//     static entityname = 'publications';
//     static PublicationReducerMap = new HttpReducer(initialState, PublicationProvider.entityname).Buildreducer();

//     static getRegisterReducer(state = initialState, action){
//         var cases = Object.keys(PublicationProvider.registerReducerMap);
//         if (!cases.includes(action.type)) {
//             return state;
//         }
//         else {
//             return AuthProvider.registerReducerMap[action.type](state, action);
//         }
//     }

//     static getPublications(args = {}){
//         return httpAction.GetAction(PublicationProvider.entityname , args , '' , true);
//     }
// }