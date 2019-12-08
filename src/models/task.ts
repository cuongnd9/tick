import { all, call, put, takeEvery } from 'redux-saga/effects';
import Navigation from 'src/helpers/Navigation';
import { createTask } from 'src/services/task.service';
import { uploadImage } from 'src/services/image.service';
import { showNotificationAction } from 'src/models/global/notification';
import {
  hideLoadingAction,
  showLoadingAction
} from 'src/models/global/loading';

// Constants.
export const CREAT = '@task/creat';
export const CREAT_SUCCESS = '@task/creat_success';

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
interface Task {
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
  createdAt?: Date;
  updatedAt?: Date;
}
interface CreateTaskActionType {
  type: typeof CREAT;
  payload: TaskInput;
}
interface CreateSuccessTaskActionType {
  type: typeof CREAT_SUCCESS;
  payload: Task;
}

// Actions.
export const createTaskAction = (
  taskInput: TaskInput
): CreateTaskActionType => ({
  type: CREAT,
  payload: taskInput
});
export const createSuccessTaskAction = (
  task: Task
): CreateSuccessTaskActionType => ({
  type: CREAT_SUCCESS,
  payload: task
});

// Effects.
function* createTaskAsyncAction({ payload }: CreateTaskActionType) {
  yield put(showLoadingAction());
  try {
    const images = payload.images['_parts'].length > 0
      ? yield call(uploadImage, payload.images)
      : null;
    const task = yield call(createTask, {
      ...payload,
      images: images ? images.map(image => image.id) : []
    });
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
  yield takeEvery(CREAT, createTaskAsyncAction);
}
function* effects() {
  yield all([call(watchCreateTaskAsyncAction)]);
}

// Reducer
interface State {
  task: Task;
}
type Action = CreateSuccessTaskActionType;
const initialState: State = {
  task: {}
};

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case CREAT_SUCCESS:
      return {
        ...state,
        task: action.payload
      };
    default:
      return state;
  }
};

export const taskModel = {
  reducer,
  effects
};
