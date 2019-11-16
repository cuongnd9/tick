import { Props as NotificationProps } from '../../components/GlobalNotification';

// Constants.
export const SHOW_NOTIFICATION = '@global/show_notification';
export const HIDE_NOTIFICATION = '@global/hide_notification';

// Action types.
interface ShowNotificationActionType {
  type: typeof SHOW_NOTIFICATION;
  payload: NotificationProps;
}
interface HideNotificationActionType {
  type: typeof HIDE_NOTIFICATION;
  payload: NotificationProps;
}

// Actions.
export const showNotificationAction = (
  props?: NotificationProps
): ShowNotificationActionType => ({
  type: SHOW_NOTIFICATION,
  payload: props
});
export const hideNotificationAction = (
  props?: NotificationProps
): HideNotificationActionType => ({
  type: HIDE_NOTIFICATION,
  payload: props
});

// Reducer.
type State = NotificationProps;
type Action = ShowNotificationActionType | HideNotificationActionType;

const initialState: State = {
  visible: false
};
const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        ...action.payload,
        visible: true
      };
    case HIDE_NOTIFICATION:
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

export const globalNotificationModel = {
  reducer
};
