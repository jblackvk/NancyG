import {combineReducers} from 'redux';
import axios from 'axios';
const initialState = {
  sessionToken: 'none',
  isLoginError: 'no',
  user: {username: '', password: ''},
  rememberMe: false,
};

function usersProfile(state = initialState, action) {
  switch (action.type) {
    case 'login':
      axios
        .get('http://localhost:3000/user', {
          params: {
            username: state.user.username,
            password: state.user.password,
          },
        })
        .then(response => {
          console.log(response);
          return Object.assign({}, state, {
            sessionToken: response.data.token,
            user: response.data.user,
            isLoginError: response.status == 200 ? true : false,
          });
        })
        .catch(function(error) {
          console.log(error);
        });
      break;
    case 'signup':
      break;
    case 'tryLogin':
      return Object.assign({}, state, {
        user: {
          username: action.payload.username,
          password: action.payload.password,
        },
        rememberMe: action.payload.rememberMe,
      });
    default:
      break;
  }
}
/*
const nancyApp = combineReducers({
  usersProfile,
});*/

export default usersProfile;
