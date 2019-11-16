import { all, fork } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import { loginModel } from './auth/login';
import { globalModel } from './global';

function* rootSaga() {
  yield all([fork(loginModel.effects), fork(globalModel.effects)]);
}

const rootReducer = combineReducers({
  login: loginModel.reducer,
  global: globalModel.reducer
});

export type AppState = ReturnType<typeof rootReducer>
export { rootSaga, rootReducer };
