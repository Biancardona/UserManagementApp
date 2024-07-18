import useAuth from '../../hooks/useAuth';

const Header = () => {
  const { signOut } = useAuth();

  return (
    <header>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          User Management <spam className='text-black'> Application</spam>
        </h1>
        <nav className='flex flex-col items-center lg:flex-row mt-5 lg:mt-0 gap-4'>
          <button
            type='button'
            className='text-white uppercase'
            onClick={signOut}
          >
            {' '}
            Cerrar Sesion
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
