import { redirect } from 'react-router-dom';
import { useLocalStorage } from '../hooks';
import LogInForm from '../components/LogInForm';
import RegisterForm from '../components/RegisterForm';

export function loader() {
  const user = useLocalStorage('loggedUser').getItem();
  return user ? redirect('/projects/Default') : null;
}

export default function functionLogInPage() {
  return (
    <main>
      <LogInForm />
      <RegisterForm />
    </main>
  );
}
