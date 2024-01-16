import { useState } from 'react';
import loginService from '../services/login';
import userService from '../services/user';
import { isAxiosError } from 'axios';

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
      if (isAxiosError(err) && err.response) {
        console.log(err.response.data.error);
      } else if (err instanceof Error) {
        console.log(err.message);
      }
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
      if (isAxiosError(err) && err.response) {
        console.log(err.response.data.error);
      } else if (err instanceof Error) {
        console.log(err.message);
      }
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
        />
      </div>
      <button type="submit" id="login-button" onClick={handleLogIn}>login</button>
      <button type="submit" id="register-button" onClick={handleRegister}>register</button>
    </form>
  );
};

export default LogInForm;
