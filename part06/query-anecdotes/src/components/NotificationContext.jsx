import { createContext, useState } from 'react';

const NotificationContext = createContext();

export default NotificationContext;

export const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState();
  const notify = (note) => {
    setNotification(note);
    setTimeout(() => {
      setNotification('')
    }, 5000);
  }
  return (
    <NotificationContext.Provider value={{ notification, notify }} >
      {children}
    </NotificationContext.Provider>
  )
}