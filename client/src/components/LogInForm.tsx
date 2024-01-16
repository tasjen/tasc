import { useState } from 'react';
import loginService from '../services/login';
import userService from '../services/user';
import { handleError } from '../services/util';

type Props = {
  fetchUserData: () => Promise<void>;
};

const LogInForm = ({ fetchUserData }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const userToken = await loginService.login({
        username,
        password,
      });

      localStorage.setItem('loggedUser', JSON.stringify(userToken));
      await fetchUserData();
      setUsername('');
      setPassword('');
    } catch (err: unknown) {
      handleError(err);
    }
  };

  const handleRegister = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await userService.register({
        username,
        password,
      });
      setUsername('');
      setPassword('');
      console.log(`username: ${username} password: ${password} is registered`);
    } catch (err: unknown) {
      handleError(err);
    }
  };

  return (
    <form id="login-form">
      <div>
        <label htmlFor={'username'}>username</label>
        <input
          id={'username'}
          value={username}
          onChange={({ target }) => {
            setUsername(target.value);
          }}
          required
        />
      </div>
      <div>
        <label htmlFor={'password'}>password</label>
        <input
          id={'password'}
          type={'password'}
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
          required
        />
      </div>
      <button type="submit" id="login-button" onClick={handleLogIn}>login</button>
      <button type="submit" id="register-button" onClick={handleRegister}>register</button>
    </form>
  );
};

export default LogInForm;
