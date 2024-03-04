import { AxiosError, isAxiosError } from 'axios';
import React, { createContext, useState } from 'react';

type NotificationContextType = {
  notification: NotificationMessage;
  showNoti: (message: unknown) => void;
};

const NotificationContext = createContext<NotificationContextType>(
  {} as NotificationContextType,
);

type NotificationMessage = string | null | Error | AxiosError;

type Props = {
  children: React.ReactNode;
};

const isValidMessage = (message: unknown): message is NotificationMessage => {
  return (
    typeof message === 'string' ||
    message instanceof String ||
    message === null ||
    message instanceof Error ||
    isAxiosError(message)
  );
};

export const NotificationContextProvider = (props: Props) => {
  const [notification, setNotification] = useState<NotificationMessage>(null);
  const showNoti = (message: unknown) => {
    if (isValidMessage(message)) {
      setNotification(message);
      setTimeout(() => setNotification(null), 5000);
    }
  };
  return (
    <NotificationContext.Provider value={{ notification, showNoti }}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
