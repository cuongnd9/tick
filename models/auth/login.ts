import { all, call, put, takeEvery } from 'redux-saga/effects';
import { login } from '../../services/auth.service';

// Constants.
export const LOGIN = '@auth/login';
export const LOGIN_SUCCESS = '@auth/login_success';

// Action types.
interface Account {
  id: string;
  username: string;
  email: string;
  role: string;
  status: string;
  settings: JSON;
  updatedAt: Date;
  createdAt: Date;
}
interface LoginResult {
  token?: string;
  account?: Account;
}
interface LoginActionType {
  type: typeof LOGIN;
  payload: {
    username: string;
    password: string;
  };
}
interface LoginSuccessType {
  type: typeof LOGIN_SUCCESS;
  payload: LoginResult;
}
type LoginActions = LoginSuccessType;

// Actions.
export const loginAction = ({
  username,
  password
}: {
  username: string;
  password: string;
}): LoginActionType => ({
  type: LOGIN,
  payload: {
    username,
    password
  }
});
export const loginSuccessAction = (data: LoginResult): LoginSuccessType => ({
  type: LOGIN_SUCCESS,
  payload: data
});

// Effects.
function* loginAsyncAction (payload) {
  try {
    const loginResult: LoginResult = (yield call(login, payload)).data;
    yield put(loginSuccessAction(loginResult));
  }
  catch(err) {
    console.log(err, 'err..............');
  }
}
function* watchLoginAsyncAction () {
  yield takeEvery(LOGIN, loginAsyncAction);
}
function* effects() {
  yield all([call(watchLoginAsyncAction)]);
}

// Reducer.
type LoginState = LoginResult;
const reducer = (state: LoginState = {}, action: LoginActions): LoginState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

export const loginModel = {
  reducer,
  effects
}