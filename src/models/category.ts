import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getCategoryList } from 'src/services/category.service';
import { showNotificationAction } from 'src/models/global/notification';

// Constants.
export const GET_LIST = '@category/get_list';
export const GET_LIST_SUCCESS = '@category/get_list_success';

// Action types.
interface Task {
  id: string;
  status: string;
}
export interface Category {
  id: string;
  index: number;
  name: string;
  tasks: Task[];
}
interface GetListType {
  type: typeof GET_LIST;
}
interface GetListSuccessType {
  type: typeof GET_LIST_SUCCESS;
  payload: Category[];
}

// Actions.
export const getListAction = (): GetListType => ({
  type: GET_LIST
});
export const getListSuccessAction = (
  categoryList: Category[]
): GetListSuccessType => ({
  type: GET_LIST_SUCCESS,
  payload: categoryList
});

// Effects.
function* getListAsyncAction() {
  try {
    const categoryList = yield call(getCategoryList);
    yield put(getListSuccessAction(categoryList));
  } catch (err) {
    yield put(
      showNotificationAction({
        content: err.message,
        status: 'danger'
      })
    );
  }
}
function* watchGetListAsyncAction() {
  yield takeEvery(GET_LIST, getListAsyncAction);
}
function* effects() {
  yield all([call(watchGetListAsyncAction)]);
}

// Reducer.
interface State {
  categoryList: Category[];
}
type Action = GetListSuccessType;

const intialState: State = {
  categoryList: []
};

const reducer = (state: State = intialState, action: Action): State => {
  switch (action.type) {
    case GET_LIST_SUCCESS:
      return {
        ...state,
        categoryList: action.payload
      };
    default:
      return state;
  }
};

export const categoryModel = {
  reducer,
  effects
};
