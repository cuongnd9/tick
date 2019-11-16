import { combineReducers } from 'redux';
import { globalLoadingModel } from './loading';

function* globalSaga() {}

const globalReducer = combineReducers({
  loading: globalLoadingModel.reducer
});

export type GlobalState = ReturnType<typeof globalReducer>;
export const globalModel = { reducer: globalReducer, effects: globalSaga };
