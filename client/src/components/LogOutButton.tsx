import { useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import NotificationContext from '../context/NotificationContext';
import { useLocalStorage } from '../hooks';
import { useNavigate } from 'react-router-dom';

const LogOutButton = () => {
  const { showNoti } = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogOut = () => {
    try {
      const loggedUser = useLocalStorage('loggedUser');
      loggedUser.removeItem();
      queryClient.setQueryData(['userData'], null);
      navigate('/login');
    } catch (err) {
      showNoti(err);
    }
  };

  return (
    <button id="logout-button" onClick={handleLogOut}>
      logout
    </button>
  );
};

export default LogOutButton;
