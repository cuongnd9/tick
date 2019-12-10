import { all, call, put, takeEvery } from 'redux-saga/effects';
import Navigation from 'src/helpers/Navigation';
import { createTask, getTaskList } from 'src/services/task.service';
import { uploadImage } from 'src/services/image.service';
import { showNotificationAction } from 'src/models/global/notification';
import {
  hideLoadingAction,
  showLoadingAction
} from 'src/models/global/loading';
import { taskListType } from 'src/config/constants';

// Constants.
export const CREATE = '@task/create';
export const CREATE_SUCCESS = '@task/create_success';
export const LIST = '@task/list';
export const LIST_SUCCESS = '@task/list_success';

// Action types.
interface StepInput {
  title: string;
}
interface TaskInput {
  title: string;
  description?: string;
  dueDate: Date;
  reminderDate?: Date;
  category: String;
  steps: StepInput[];
  images: FormData;
}
interface Category {
  id: string;
  name: string;
  index: number;
}
interface Image {
  id: string;
  url: string;
  publicId: string;
}
interface Step {
  id: string;
  index: number;
  status: string;
  title: string;
}
export interface Task {
  id?: string;
  index?: number;
  title?: string;
  description?: string;
  priority?: string;
  doSendMail?: boolean;
  status?: string;
  dueDate?: Date;
  reminderDate?: Date;
  isImportant?: boolean;
  category?: Category;
  steps?: Step[];
  images?: [
    {
      id: string;
      image: Image;
    }
  ];
  createdAt?: Date;
  updatedAt?: Date;
}
interface TaskListType {
  type:
    | typeof taskListType.nextDays
    | typeof taskListType.olderDays
    | typeof taskListType.today
    | typeof taskListType.tomorrow;
  data: Task[];
}
interface CreateTaskActionType {
  type: typeof CREATE;
  payload: {
    taskInput: TaskInput;
    callback?: Function;
  };
}
interface CreateSuccessTaskActionType {
  type: typeof CREATE_SUCCESS;
  payload: Task;
}
interface GetTaskListActionType {
  type: typeof LIST;
}
interface GetTaskListSuccessActionType {
  type: typeof LIST_SUCCESS;
  payload: TaskListType[];
}

// Actions.
export const createTaskAction = ({
  taskInput,
  callback
}: {
  taskInput: TaskInput;
  callback: Function;
}): CreateTaskActionType => {
  return {
    type: CREATE,
    payload: {
      taskInput,
      callback
    }
  };
};
export const createSuccessTaskAction = (
  task: Task
): CreateSuccessTaskActionType => ({
  type: CREATE_SUCCESS,
  payload: task
});
export const getTaskListAction = (): GetTaskListActionType => ({
  type: LIST
});
export const getTaskListSuccessAction = (
  list: TaskListType[]
): GetTaskListSuccessActionType => ({
  type: LIST_SUCCESS,
  payload: list
});

// Effects.
function* createTaskAsyncAction({ payload }: CreateTaskActionType) {
  yield put(showLoadingAction());
  try {
    const images =
      payload.taskInput.images['_parts'].length > 0
        ? yield call(uploadImage, payload.taskInput.images)
        : null;
    const task = yield call(createTask, {
      ...payload.taskInput,
      images: images ? images.map(image => image.id) : []
    });
    if (payload.callback) {
      payload.callback();
    }
    yield put(createSuccessTaskAction(task));
    Navigation.navigate('TaskStack');
    yield put(
      showNotificationAction({
        content: 'Task created successfully',
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
function* watchCreateTaskAsyncAction() {
  yield takeEvery(CREATE, createTaskAsyncAction);
}
function* getTaskListAsyncAction() {
  yield put(showLoadingAction());
  try {
    const list = (yield call(getTaskList)) as TaskListType[];
    yield put(getTaskListSuccessAction(list));
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
function* watchGetTaskListAsyncAction() {
  yield takeEvery(LIST, getTaskListAsyncAction);
}
function* effects() {
  yield all([
    call(watchCreateTaskAsyncAction),
    call(watchGetTaskListAsyncAction)
  ]);
}

// Reducer
interface State {
  task: Task;
  list: TaskListType[];
}
type Action = CreateSuccessTaskActionType | GetTaskListSuccessActionType;
const initialState: State = {
  task: {},
  list: []
};

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case CREATE_SUCCESS:
      return {
        ...state,
        task: action.payload
      };
    case LIST_SUCCESS:
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
};

export const taskModel = {
  reducer,
  effects
};
