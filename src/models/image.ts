import { all, call, put, takeEvery } from 'redux-saga/effects';
import { uploadImage } from 'src/services/image.service';
import {
  hideLoadingAction,
  showLoadingAction
} from 'src/models/global/loading';
import { showNotificationAction } from 'src/models/global/notification';

// Constants.
export const UPLOAD = '@image/upload';
export const UPLOAD_SUCCESS = '@image/upload_success';

// Action types.
interface Image {
  id: string;
  url: string;
  publicId: string;
}
interface UploadImageAction {
  type: typeof UPLOAD;
  payload: FormData;
}
interface UploadImageSuccessAction {
  type: typeof UPLOAD_SUCCESS;
  payload: Image[];
}

// Actions.
export const uploadImageAction = (formData: FormData): UploadImageAction => ({
  type: UPLOAD,
  payload: formData
});
export const uploadImageSuccessAction = (images: Image[]): UploadImageSuccessAction => ({
  type: UPLOAD_SUCCESS,
  payload: images
});

// Effects.
function* uploadImageAsyncAction({ payload }: UploadImageAction) {
  yield put(showLoadingAction());
  try {
    const images = yield call(uploadImage, payload);
    yield put(uploadImageSuccessAction(images));
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
function* watchUploadImageAsyncAction() {
  yield takeEvery(UPLOAD, uploadImageAsyncAction);
}
function* effects() {
  yield all([call(watchUploadImageAsyncAction)]);
}

// Reducer
interface State {
  images: Image[];
}
type Action = UploadImageSuccessAction;

const intialState: State = {
  images: []
};

const reducer = (state: State = intialState, action: Action): State => {
  switch (action.type) {
    case UPLOAD_SUCCESS:
      return {
        ...state,
        images: action.payload
      };
    default:
      return state;
  }
};

export const imageModel = {
  reducer,
  effects
};
