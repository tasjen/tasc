import { useUserDataQuery } from '../hooks';
import LogOutButton from './LogOutButton';
import Notification from './Notification';

const Header = () => {
  const { userData } = useUserDataQuery({ retry: false });

  return (
    <header>
      <p id="logo">Todo List</p>
      <Notification />
      {userData && (
        <>
          <b id="username">{userData.username}</b>
          <LogOutButton />
        </>
      )}
    </header>
  );
};

export default Header;
