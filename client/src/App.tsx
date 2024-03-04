import Footer from './components/Footer';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
// import { isSameDay, isSameWeek } from 'date-fns';

const App = () => {
  // if (isLoading) {
  //   return <span>Loading...</span>;
  // }
  // if (isError) {
  //   return <span>Error: {error?.message}</span>;
  // }
  // if (!userData) {
  //   return <span> userData not found</span>;
  // }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
