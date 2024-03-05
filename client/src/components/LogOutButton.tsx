import { useQueryClient } from '@tanstack/react-query';
import { useNotificationContext } from '../context/NotificationContext';
import { useLocalStorage } from '../hooks';
import { useNavigate } from 'react-router-dom';

export default function LogOutButton() {
  const { showNoti } = useNotificationContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function handleLogOut() {
    try {
      const loggedUser = useLocalStorage('loggedUser');
      loggedUser.removeItem();
      queryClient.setQueryData(['userData'], null);
      navigate('/login');
    } catch (err) {
      showNoti(err);
    }
  }

  return (
    <button id="logout-button" onClick={handleLogOut}>
      logout
    </button>
  );
}
