import { useEffect } from 'react';
import { createContext, useState } from 'react';
import axiosClient from '../config/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [load, setLoad] = useState(true);
  useEffect(() => {
    const userAuthenticate = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoad(false);
        return;
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axiosClient('/users/admin', config);
        setAuth(data);
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({});
      }
      setLoad(false);
    };
    userAuthenticate();
  }, []);

  const signOut = () => {
    localStorage.removeItem('token');
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, load, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };
export default AuthContext;
