import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { AppState } from '..';
import Navigation from '../../helpers/Navigation';
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
    const loginResult: LoginResult = yield yield call(login, payload);
    yield put(loginSuccessAction(loginResult));
    Navigation.navigate('Task');
    const token = yield select((appState: AppState) => appState.login.token)
    yield AsyncStorage.setItem('x-access-token', token);
  } catch (err) {
    yield put(
      showNotificationAction({
        content: err.message,
        status: 'danger'
      })
    );
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
