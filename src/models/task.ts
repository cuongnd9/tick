import { all, call, put, takeEvery } from 'redux-saga/effects';
import Navigation from 'src/helpers/Navigation';
import { createTask, getTaskList, updateTask } from 'src/services/task.service';
import { uploadImage } from 'src/services/image.service';
import { showNotificationAction } from 'src/models/global/notification';
import {
  hideLoadingAction,
  showLoadingAction
} from 'src/models/global/loading';
import { taskListType, taskStatus, taskPriority } from 'src/config/constants';

// Constants.
export const CREATE = '@task/create';
export const CREATE_SUCCESS = '@task/create_success';
export const UPDATE = '@task/update';
export const UPDATE_SUCCESS = '@task/update_success';
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
interface UpdateTaskInput {
  index?: number;
  title?: string;
  description?: string;
  status?:
    | typeof taskStatus.done
    | typeof taskStatus.expired
    | typeof taskStatus.inProcess
    | typeof taskStatus.todo;
  priority?:
    | typeof taskPriority.high
    | typeof taskPriority.highest
    | typeof taskPriority.low
    | typeof taskPriority.lowest
    | typeof taskPriority.medium;
  isImportant?: boolean;
  dueDate?: Date;
  reminderDate?: Date;
  doSendMail?: boolean;
  category?: string;
  steps?: {
    newSteps?: Omit<Step, 'id'>[];
    deleteSteps?: string[];
  };
  images?: {
    newImages?: FormData;
    deleteImages?: string[];
  };
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
  payload: {
    isLoading?: boolean;
  };
}
interface GetTaskListSuccessActionType {
  type: typeof LIST_SUCCESS;
  payload: TaskListType[];
}
interface UpdateTaskActionType {
  type: typeof UPDATE;
  payload: {
    id: string;
    body: UpdateTaskInput;
    isLoading?: boolean;
    callback?: Function;
  };
}
interface UpdateTaskSuccessActionType {
  type: typeof UPDATE_SUCCESS;
  payload: Task;
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
export const getTaskListAction = ({
  isLoading = true
}): GetTaskListActionType => ({
  type: LIST,
  payload: {
    isLoading
  }
});
export const getTaskListSuccessAction = (
  list: TaskListType[]
): GetTaskListSuccessActionType => ({
  type: LIST_SUCCESS,
  payload: list
});
export const updateTaskAction = ({
  id,
  body,
  isLoading = true,
  callback
}: {
  id: string;
  body: UpdateTaskInput;
  isLoading?: boolean;
  callback?: Function;
}): UpdateTaskActionType => ({
  type: UPDATE,
  payload: {
    id,
    body,
    isLoading,
    callback
  }
});
export const updateTaskSuccessAction = (
  task: Task
): UpdateTaskSuccessActionType => ({
  type: UPDATE_SUCCESS,
  payload: task
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
function* getTaskListAsyncAction({ payload }: GetTaskListActionType) {
  payload.isLoading && (yield put(showLoadingAction()));
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
  payload.isLoading && (yield put(hideLoadingAction()));
}
function* watchGetTaskListAsyncAction() {
  yield takeEvery(LIST, getTaskListAsyncAction);
}
function* updateTaskAsyncAction({ payload }: UpdateTaskActionType) {
  payload.isLoading && (yield put(showLoadingAction()));
  try {
    const newImages =
      payload.body.images && payload.body.images.newImages['_parts'].length > 0
        ? yield call(uploadImage, payload.body.images.newImages)
        : null;
    const task = yield call(updateTask, {
      ...payload.body,
      id: payload.id,
      images: {
        ...payload.body.images,
        newImages: newImages ? newImages.map(image => image.id) : []
      }
    });
    if (payload.callback) {
      payload.callback();
    }
    yield put(createSuccessTaskAction(task));
    Navigation.navigate('Task');
    payload.isLoading &&
      (yield put(
        showNotificationAction({
          content: 'Task updated successfully',
          status: 'success'
        })
      ));
  } catch (err) {
    yield put(
      showNotificationAction({
        content: err.message,
        status: 'danger'
      })
    );
  }
  payload.isLoading && (yield put(hideLoadingAction()));
}
function* watchUpdateTaskAsyncAction() {
  yield takeEvery(UPDATE, updateTaskAsyncAction);
}
function* effects() {
  yield all([
    call(watchCreateTaskAsyncAction),
    call(watchGetTaskListAsyncAction),
    call(watchUpdateTaskAsyncAction)
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
