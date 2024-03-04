import { redirect } from 'react-router-dom';
import { useLocalStorage } from '../hooks';
import LogInForm from '../components/LogInForm';
import RegisterForm from '../components/RegisterForm';

export const loader = () => {
  const user = useLocalStorage('loggedUser').getItem();
  return user ? redirect('/projects/Default') : null;
};

const LogInPage = () => {
  return (
    <main>
      <LogInForm />
      <RegisterForm />
    </main>
  );
};

export default LogInPage;
