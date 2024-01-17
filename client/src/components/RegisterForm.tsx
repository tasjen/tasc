import { useState } from 'react';
import userService from '../services/user';
import { handleError } from '../services/util';

type Props = {
  setNoti: ({ text, error }: { text: string; error: boolean }) => void;
};

const RegisterForm = ({ setNoti }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      setNoti({
        text: `username: ${username} password: ${password} is registered`,
        error: false,
      });
    } catch (err: unknown) {
      handleError(err, setNoti);
    }
    setTimeout(() => {
      setNoti({ text: '', error: false });
    }, 5000);
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
            type="password"
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
