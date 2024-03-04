import Footer from './components/Footer';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
// import { isSameDay, isSameWeek } from 'date-fns';

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
