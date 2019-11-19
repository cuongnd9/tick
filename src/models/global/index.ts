import { combineReducers } from 'redux';
import { globalLoadingModel } from './loading';
import { globalNotificationModel } from './notification';

function* globalSaga() {}

const globalReducer = combineReducers({
  loading: globalLoadingModel.reducer,
  notification: globalNotificationModel.reducer
});

export type GlobalState = ReturnType<typeof globalReducer>;
export const globalModel = { reducer: globalReducer, effects: globalSaga };
