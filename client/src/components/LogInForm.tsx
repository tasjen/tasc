import { useState } from 'react';
import loginService from '../services/login';

type Props = {
  setData: () => Promise<void>;
};

const LogInForm = ({ setData }: Props) => {
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
      await setData();
      setUsername('');
      setPassword('');
    } catch (err) {
      console.log((err as Error).message);
    }
  };

  return (
    <form id="login-form" onSubmit={handleLogIn}>
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
      <button type="submit">login</button>
    </form>
  );
};

export default LogInForm;
