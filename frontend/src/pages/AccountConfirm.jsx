import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosClient from '../config/axios';
import Alert from '../components/layout/Alert';
import { NavLink } from 'react-router-dom';

const AccountConfirm = () => {
  //Hook useParams to read the parameters from the URLS
  const params = useParams();
  const [confirmedAccount, setconfimedAccount] = useState(false);
  //Loading state is set true because is going to be until the page is 100% loaded
  const [loading, setLoading] = useState(true);
  const [alerta, setAlerta] = useState({});
  //Destructuring id from params
  const { id } = params;
  //Hook useEffect to be executed once the componente is loaded
  useEffect(() => {
    const confirmAccoutn = async () => {
      try {
        const url = `/users/readToken/${id}`;
        //data is the Axios response
        const { data } = await axiosClient(url);
        setconfimedAccount(true);
        setAlerta({
          msg: data.msg,
        });
        console.log(data);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
      setLoading(false);
    };
    confirmAccoutn();
  }, []);

  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Confirm your account and Manage your
          <spam className='text-black'> Users</spam>
        </h1>
      </div>
      <div className='mt 20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {!loading && <Alert alert={alerta} />}
        {confirmedAccount && (
          <nav className='mt-10 lg:flex lg:justify-between'>
            <NavLink to='/' className='block text-gray-600 text-center my-5'>
              Log in Here
            </NavLink>{' '}
          </nav>
        )}
      </div>
    </>
  );
};

export default AccountConfirm;
