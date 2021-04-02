//nsert parameters in the global state such that we can use them for login
function putParametersInForSignin(user) {
  return {
    type: 'tryLogin',
    payload: {username: user.username, password: user.password},
  };
}

//login action
function login() {
  return {
    type: 'Login',
  };
}

//signUpActions

function signUp(usersParams) {
  return {
    type: 'signUp',
    payload: usersParams,
  };
}
