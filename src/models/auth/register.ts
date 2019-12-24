import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { AppState } from 'src/models';
import Navigation from 'src/helpers/Navigation';
import { register, requireCode, checkCode } from 'src/services/auth.service';
import {
  hideLoadingAction,
  showLoadingAction
} from 'src/models/global/loading';
import { showNotificationAction } from 'src/models/global/notification';

// Constants.
export const REQUIRE_CODE = '@auth/require_code';
export const CHECK_CODE = '@auth/check_code';
export const REGISTER = '@auth/register';

// Action types.
interface RequireCodeActionType {
  type: typeof REQUIRE_CODE;
  payload: {
    email: string;
  };
}
interface CheckCodeActionType {
  type: typeof CHECK_CODE;
  payload: {
    email: string;
    code: string;
  };
}
interface RegisterActionType {
  type: typeof REGISTER;
  payload: {
    email: string;
    code: string;
    username: string;
    password: string;
  };
}

// Actions.
export const requireCodeAction = (email: string) => ({
  type: REQUIRE_CODE,
  payload: {
    email
  }
});
export const checkCodeAction = ({
  email,
  code
}: {
  email: string;
  code: string;
}) => ({
  type: CHECK_CODE,
  payload: {
    email,
    code
  }
});
export const registerAction = ({
  email,
  code,
  username,
  password
}: {
  email: string;
  code: string;
  username: string;
  password: string;
}) => ({
  type: REGISTER,
  payload: {
    username,
    password,
    email,
    code
  }
});

// Effects.
function* requireCodeAsyncAction({ payload }: RequireCodeActionType) {
  yield put(showLoadingAction());
  try {
    yield call(requireCode, payload.email);
    Navigation.navigate('EnterCode');
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
function* watchRequireCodeAsyncAction() {
  yield takeEvery(REQUIRE_CODE, requireCodeAsyncAction);
}

function* checkCodeAsyncAction({ payload }: CheckCodeActionType) {
  yield put(showLoadingAction());
  try {
    const data = yield call(checkCode, payload);
    console.log(data, '-----------data for check code');
    Navigation.navigate('Register', data);
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
function* watchCheckCodeAsyncAction() {
  yield takeEvery(CHECK_CODE, checkCodeAsyncAction);
}

function* registerAsyncAction({ payload }: RegisterActionType) {
  yield put(showLoadingAction());
  try {
    yield call(register, payload);
    Navigation.navigate('Congratulation');
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
function* watchRegisterAsyncAction() {
  yield takeEvery(REGISTER, registerAsyncAction);
}

function* effects() {
  yield all([
    call(watchRequireCodeAsyncAction),
    call(watchCheckCodeAsyncAction),
    call(watchRegisterAsyncAction)
  ]);
}

export const registerModel = {
  effects
};
