import { Props as LoadingProps } from 'src/components/GlobalLoading';

// Constants.
export const SHOW_LOADING = '@global/show_loading';
export const HIDE_LOADING = '@global/hide_loading';

// Action types.
interface ShowLoadingActionType {
  type: typeof SHOW_LOADING;
  payload: LoadingProps;
}
interface HideLoadingActionType {
  type: typeof HIDE_LOADING;
  payload: LoadingProps;
}

// Actions.
export const showLoadingAction = (
  props?: LoadingProps
): ShowLoadingActionType => ({
  type: SHOW_LOADING,
  payload: props
});
export const hideLoadingAction = (
  props?: LoadingProps
): HideLoadingActionType => ({
  type: HIDE_LOADING,
  payload: props
});

// Reducer.
type State = LoadingProps;
type Action = ShowLoadingActionType | HideLoadingActionType;

const initialState: State = {
  visible: false
};
const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SHOW_LOADING:
      return {
        ...state,
        ...action.payload,
        visible: true
      };
    case HIDE_LOADING:
      return {
        ...state,
        ...action.payload,
        visible: false
      };
    default:
      return {
        ...state
      };
  }
};

export const globalLoadingModel = {
  reducer
};
