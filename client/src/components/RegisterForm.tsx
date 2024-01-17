import { useState } from 'react';
import userService from '../services/user';
import { handleError } from '../services/util';

const RegisterForm = () => {
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
    } catch (err: unknown) {
      handleError(err);
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
