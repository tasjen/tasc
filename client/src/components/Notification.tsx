import { useContext } from 'react';
import NotificationContext from '../context/NotificationContext';
import { isAxiosError } from 'axios';

const Notification = () => {
  const { notification } = useContext(NotificationContext);

  return notification === null ? (
    <></>
  ) : isAxiosError(notification) ? (
    <p className="error">
      {notification.response?.data.error ?? notification.message}
    </p>
  ) : notification instanceof Error ? (
    <p className="error">{notification.message}</p>
  ) : (
    <p className="message">{notification}</p>
  );
};

export default Notification;
