import loginService from '../services/login';
import { useNotificationContext } from '../context/NotificationContext';
import { useInput, useLocalStorage } from '../hooks';
import { useNavigate } from 'react-router-dom';

export default function LogInForm() {
  const [usernameInput, setUsernameInput] = useInput('text');
  const [passwordInput, setPasswordInput] = useInput('password');

  const { showNoti } = useNotificationContext();
  const navigate = useNavigate();

  async function handleLogIn(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: usernameInput.value,
        password: passwordInput.value,
      });
      setUsernameInput('');
      setPasswordInput('');
      useLocalStorage('loggedUser').setItem(user);
      navigate('/login');
    } catch (err: unknown) {
      showNoti(err);
    }
  }

  return (
    <form id="login-form" onSubmit={handleLogIn}>
      <fieldset>
        <legend>Login</legend>
        <div>
          <label htmlFor="login-username">username</label>
          <input
            id="login-username"
            data-test="login-username"
            {...usernameInput}
            required
            minLength={6}
          />
        </div>
        <div>
          <label htmlFor={'login-password'}>password</label>
          <input
            id="login-password"
            data-test="login-password"
            {...passwordInput}
            required
            minLength={6}
          />
        </div>
        <button type="submit" id="login-button" data-test="login-button">
          login
        </button>
      </fieldset>
    </form>
  );
}
