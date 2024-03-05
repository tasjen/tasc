import { AxiosError, isAxiosError } from 'axios';
import React, { createContext, useContext, useState } from 'react';

type NotificationContextType = {
  notification: NotificationMessage;
  showNoti: (message: unknown) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export function useNotificationContext() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useTaskFormContext must be used inside the TaskFormContextProvider',
    );
  }
  return context;
}

type NotificationMessage = string | null | Error | AxiosError;

type Props = {
  children: React.ReactNode;
};

function isValidMessage(message: unknown): message is NotificationMessage {
  return (
    typeof message === 'string' ||
    message instanceof String ||
    message === null ||
    message instanceof Error ||
    isAxiosError(message)
  );
}

export default function NotificationContextProvider(props: Props) {
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
}
