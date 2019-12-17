import { all, call, put, takeEvery } from 'redux-saga/effects';
import Navigation from 'src/helpers/Navigation';
import {
  getCategoryList,
  createCategory,
  updateCategory,
  deleteCategory
} from 'src/services/category.service';
import { showNotificationAction } from 'src/models/global/notification';
import {
  hideLoadingAction,
  showLoadingAction
} from 'src/models/global/loading';

// Constants.
export const GET_LIST = '@category/get_list';
export const GET_LIST_SUCCESS = '@category/get_list_success';
export const CREATE = '@category/create';
export const CREATE_SUCCESS = '@category/create_success';
export const UPDATE = '@category/update';
export const UPDATE_SUCCESS = '@category/update_success';
export const DELETE = '@category/delete';
export const DELETE_SUCCESS = '@category/delete_success';

// Action types.
interface Task {
  id: string;
  status: string;
}
export interface Category {
  id: string;
  index: number;
  name: string;
  tasks?: Task[];
}
interface GetListType {
  type: typeof GET_LIST;
}
interface GetListSuccessType {
  type: typeof GET_LIST_SUCCESS;
  payload: Category[];
}
interface CreateCategoryActionType {
  type: typeof CREATE;
  payload: {
    name: string;
    callback?: Function;
  };
}
interface CreateCategorySuccessActionType {
  type: typeof CREATE_SUCCESS;
  payload: Category;
}
interface UpdateCategoryActionType {
  type: typeof UPDATE;
  payload: {
    id: string;
    name: string;
    callback?: Function;
  };
}
interface UpdateCategorySuccessActionType {
  type: typeof UPDATE_SUCCESS;
  payload: Category;
}
interface DeleteCategoryActionType {
  type: typeof DELETE;
  payload: {
    id: string;
    callback?: Function;
  };
}
interface DeleteCategorySuccessActionType {
  type: typeof DELETE_SUCCESS;
  payload: Category;
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
export const createCategoryAction = ({
  name,
  callback
}: {
  name: string;
  callback: Function;
}): CreateCategoryActionType => ({
  type: CREATE,
  payload: {
    name,
    callback
  }
});
export const createCategorySuccessAction = (
  category: Category
): CreateCategorySuccessActionType => ({
  type: CREATE_SUCCESS,
  payload: category
});
export const updateCategoryAction = ({
  id,
  name,
  callback
}: {
  id: string;
  name: string;
  callback: Function;
}): UpdateCategoryActionType => ({
  type: UPDATE,
  payload: {
    id,
    name,
    callback
  }
});
export const updateCategorySuccessAction = (
  category: Category
): UpdateCategorySuccessActionType => ({
  type: UPDATE_SUCCESS,
  payload: category
});
export const deleteCategoryAction = ({
  id,
  callback
}: {
  id: string;
  callback: Function;
}): DeleteCategoryActionType => ({
  type: DELETE,
  payload: {
    id,
    callback
  }
});
export const deleteCategorySuccessAction = (
  category: Category
): DeleteCategorySuccessActionType => ({
  type: DELETE_SUCCESS,
  payload: category
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
function* createCategoryAsyncAction({ payload }: CreateCategoryActionType) {
  yield put(showLoadingAction());
  try {
    const category = yield call(createCategory, { name: payload.name });
    if (payload.callback) {
      payload.callback();
    }
    yield put(createCategorySuccessAction(category));
    Navigation.navigate('Category');
    yield put(
      showNotificationAction({
        content: 'Category created successfully',
        status: 'success'
      })
    );
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
function* watchCreateCategoryAsyncAction() {
  yield takeEvery(CREATE, createCategoryAsyncAction);
}
function* updateCategoryAsyncAction({ payload }: UpdateCategoryActionType) {
  yield put(showLoadingAction());
  try {
    const category = yield call(updateCategory, {
      id: payload.id,
      name: payload.name
    });
    if (payload.callback) {
      payload.callback();
    }
    yield put(updateCategorySuccessAction(category));
    Navigation.navigate('Category');
    yield put(
      showNotificationAction({
        content: 'Category updated successfully',
        status: 'success'
      })
    );
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
function* watchUpdateCategoryAsyncAction() {
  yield takeEvery(UPDATE, updateCategoryAsyncAction);
}
function* deleteCategoryAsyncAction({ payload }: UpdateCategoryActionType) {
  yield put(showLoadingAction());
  try {
    const category = yield call(deleteCategory, payload.id);
    if (payload.callback) {
      payload.callback();
    }
    yield put(deleteCategorySuccessAction(category));
    yield put(
      showNotificationAction({
        content: 'Category deleted successfully',
        status: 'success'
      })
    );
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
function* watchDeleteCategoryAsyncAction() {
  yield takeEvery(DELETE, deleteCategoryAsyncAction);
}
function* effects() {
  yield all([
    call(watchGetListAsyncAction),
    call(watchCreateCategoryAsyncAction),
    call(watchUpdateCategoryAsyncAction),
    call(watchDeleteCategoryAsyncAction)
  ]);
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
