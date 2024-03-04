import { useContext } from 'react';
import loginService from '../services/login';
import NotificationContext from '../context/NotificationContext';
import { useInput, useLocalStorage } from '../hooks';
import { useNavigate } from 'react-router-dom';

export default function LogInForm() {
  const username = useInput('text');
  const password = useInput('password');

  const { showNoti } = useContext(NotificationContext);
  const navigate = useNavigate();

  async function handleLogIn(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      });
      username.onReset();
      password.onReset();
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
            {...username}
            required
            minLength={6}
          />
        </div>
        <div>
          <label htmlFor={'login-password'}>password</label>
          <input
            id="login-password"
            data-test="login-password"
            {...password}
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
