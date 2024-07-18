import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Alert from '../components/layout/Alert';
import axiosClient from '../config/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlerta] = useState({});
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, password].includes('')) {
      setAlerta({ msg: 'empty field try again', error: true });
      return;
    }
    setAlerta({});
    try {
      const { data } = await axiosClient.post('users/login', {
        email,
        password,
      });
      localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/admin');
      setAlerta({ msg: data.msg });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Login User Management
          <spam className='text-black'> Application</spam>
        </h1>
      </div>
      <div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          {msg && <Alert alert={alert} />}
          <form onSubmit={handleSubmit}>
            <div className='my-5'>
              <label className='uppercase text-gray-600 block text-xl font-bold'>
                Email
              </label>
              <input
                type='email'
                placeholder='Email'
                className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='my-5'>
              <label className='uppercase text-gray-600 block text-xl font-bold'>
                Password
              </label>
              <input
                type='password'
                placeholder='Password'
                className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type='submit'
                value='Login'
                className='border w-full p-3 mt-5 my-5 px-10 bg-indigo-600 text-white uppercase rounded-xl font-bold hover:cursor-pointer hover:bg-indigo-900'
              />
            </div>
            <nav className='mt-5 lg:flex lg:justify-between'>
              <NavLink
                to='/register'
                className='block text-gray-400 text-center my-5'
              >
                Not account yet? Register Here
              </NavLink>
            </nav>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
