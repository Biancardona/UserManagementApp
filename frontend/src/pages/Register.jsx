import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Alert from '../components/layout/Alert';
import axiosClient from '../config/axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, password].includes('')) {
      setAlerta({ msg: 'Empty field, try again', error: true });
      return;
    }
    if (password !== confirmPassword) {
      setAlerta({
        msg: 'Password does not match, try again',
        error: true,
      });
      return;
    }
    if (password.length <= 6) {
      setAlerta({
        msg: 'Very short password, add at least 6 characters',
        error: true,
      });
      return;
    }
    setAlerta({});

    try {
      await axiosClient.post('/users', {
        name,
        email,
        position,
        password,
      });
      setAlerta({
        msg: 'User created correctly',
        error: false,
      });
      setName('');
      setEmail('');
      setPosition('');
      setPassword('');
      setconfirmPassword('');
      navigate('/');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h2 className='text-indigo-400 font-black text-4xl'>
          Create an account and
          <span className='text-black'> manage Users</span>
        </h2>
      </div>
      <div className='mt 20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alert alert={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-l font-bold'>
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type='name'
              placeholder='Full Name'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
            />
          </div>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-l font-bold'>
              Position
            </label>
            <input
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              type='position'
              placeholder='Position'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
            />
          </div>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-l font-bold'>
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              placeholder='Register Email'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
            />
          </div>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-l font-bold'>
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Password'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
            />
          </div>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-l font-bold'>
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              type='password'
              placeholder='Confirm Password'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
            />

            <input
              type='submit'
              value='Register'
              className='border w-full p-3 mt-5 my-5 px-10 bg-indigo-600 text-white uppercase rounded-xl font-bold hover:cursor-pointer hover:bg-indigo-900'
            />
          </div>
          <nav className='mt-10 lg:flex lg:justify-between'>
            <NavLink to='/' className='block text-gray-400 text-center my-5'>
              Do you already have an account? Log in
            </NavLink>
          </nav>
        </form>
      </div>
    </>
  );
};

export default Register;
