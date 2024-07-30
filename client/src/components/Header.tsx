import { useUserDataQuery } from '../hooks';
import LogOutButton from './LogOutButton';
import Notification from './Notification';

export default function Header() {
  const { userData } = useUserDataQuery({ retry: false });

  return (
    <header>
      <p id="logo">Tasc</p>
      <Notification />
      {userData && (
        <>
          <p id="username">{userData.username}</p>
          <LogOutButton />
        </>
      )}
    </header>
  );
}
