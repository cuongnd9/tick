import moment from 'moment';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { Task } from 'src/models/task';
import { Alert } from 'react-native';

const askPermissions = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    return false;
  }
  return true;
};

const scheduleNotification = (task: Task) => {
  if (moment(task.reminderDate).isSameOrAfter(moment())) {
    Notifications.scheduleLocalNotificationAsync(
      {
        title: 'TICK / Reminder',
        body: `Hello! You have a task - ${task.title} at ${moment(
          task.reminderDate
        ).format('MMM Do hh:mm A')}`
      },
      {
        time: new Date(task.reminderDate).getTime()
      }
    );
  }
};

const handleNotifications = async (taskList: Task[]) => {
  const isAllowed = await askPermissions();
  if (!isAllowed) {
    Alert.alert('Notification is not allowed');
    return;
  }
  await Notifications.cancelAllScheduledNotificationsAsync();
  taskList.forEach(task => {
    scheduleNotification(task);
  });
};

export { handleNotifications };
