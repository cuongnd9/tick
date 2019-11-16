import { all, call, put, takeEvery } from 'redux-saga/effects';
import { login } from '../../services/auth.service';
import { hideLoadingAction, showLoadingAction } from '../global/loading';
import { showNotificationAction } from '../global/notification';

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
function* loginAsyncAction({ payload }: LoginActionType) {
  yield put(showLoadingAction());
  try {
    const loginResult: LoginResult = yield (yield call(login, payload)).json();
    yield put(loginSuccessAction(loginResult));
    yield put(showNotificationAction({ content: 'success' }));
    console.log(loginResult, 'login............');
  } catch (err) {
    yield put(showNotificationAction({ content: 'error' }));
    console.log(err, 'err..............');
  }
  yield put(hideLoadingAction());
}
function* watchLoginAsyncAction() {
  yield takeEvery(LOGIN, loginAsyncAction);
}
function* effects() {
  yield all([call(watchLoginAsyncAction)]);
}

// Reducer.
type State = LoginResult;
type Action = LoginSuccessType;

const reducer = (state: State = {}, action: Action): State => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export const loginModel = {
  reducer,
  effects
};
