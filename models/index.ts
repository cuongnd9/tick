import { all, fork } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import { loginModel } from './auth/login';

function* rootSaga() {
  yield all([fork(loginModel.effects)]);
}

const rootReducer = combineReducers({
  login: loginModel.reducer
});

export type AppState = ReturnType<typeof rootReducer>
export { rootSaga, rootReducer };
