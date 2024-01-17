import { useState } from 'react';
import loginService from '../services/login';
import { handleError } from '../services/util';

type Props = {
  fetchUserData: () => Promise<void>;
  setNoti: ({ text, error }: { text: string; error: boolean }) => void;
};

const LogInForm = ({ fetchUserData, setNoti }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const userToken = await loginService.login({
        username,
        password,
      });
      setUsername('');
      setPassword('');
      localStorage.setItem('loggedUser', JSON.stringify(userToken));
      await fetchUserData();
    } catch (err: unknown) {
      handleError(err, setNoti);
    }
    setTimeout(() => {
      setNoti({ text: '', error: false });
    }, 5000);
  };

  return (
    <form id="login-form" onSubmit={handleLogIn}>
      <fieldset>
        <legend>Login</legend>
        <div>
          <label htmlFor={'login-username'}>username</label>
          <input
            id={'login-username'}
            type="text"
            value={username}
            onChange={({ target }) => {
              setUsername(target.value);
            }}
            required
            minLength={6}
          />
        </div>
        <div>
          <label htmlFor={'login-password'}>password</label>
          <input
            id={'login-password'}
            type="password"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
            required
            minLength={6}
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </fieldset>
    </form>
  );
};

export default LogInForm;
