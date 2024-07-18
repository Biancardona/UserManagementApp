import { Outlet, Navigate } from 'react-router-dom';
import Header from '../components/layout/Header';

import useAuth from '../hooks/useAuth';

const ProtectedLayout = () => {
  const { auth, load } = useAuth();
  console.log(auth);
  console.log(load);
  if (load) return 'Loading...';

  return (
    <>
      <Header />
      {auth?._id ? (
        <main className='container mx-auto mt-10'>
          <Outlet />{' '}
        </main>
      ) : (
        <Navigate to='/' />
      )}
    </>
  );
};

export default ProtectedLayout;
