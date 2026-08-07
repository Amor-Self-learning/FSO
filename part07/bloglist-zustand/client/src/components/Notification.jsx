import { Alert } from '@mui/material';
import { useEffect } from 'react';

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [message, onClose]);
  return (
    <Alert sx={{ borderRadius: 3 }} severity={message.ok ? 'success' : 'error'}>
      {message.text}
    </Alert>
  );
};

export default Notification;
