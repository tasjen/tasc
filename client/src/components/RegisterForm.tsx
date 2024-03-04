import { useContext, useState } from 'react';
import userService from '../services/user';
import NotificationContext from '../context/NotificationContext';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { showNoti } = useContext(NotificationContext);

  const handleRegister = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await userService.register({
        username,
        password,
      });
      console.log(`username: ${username} password: ${password} is registered`);
      setUsername('');
      setPassword('');
      showNoti(`username: ${username} password: ${password} is registered`);
    } catch (err: unknown) {
      showNoti(err);
    }
  };

  return (
    <form id="register-form" onSubmit={handleRegister}>
      <fieldset>
        <legend>Register</legend>
        <div>
          <label htmlFor={'register-username'}>username</label>
          <input
            id={'register-username'}
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
          <label htmlFor={'register-password'}>password</label>
          <input
            id={'register-password'}
            type="text"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
            required
            minLength={6}
          />
        </div>
        <button type="submit" id="register-button">
          register
        </button>
      </fieldset>
    </form>
  );
};

export default RegisterForm;
