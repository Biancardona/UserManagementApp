import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../config/axios';
import useAuth from '../hooks/useAuth';

const DataContext = createContext();

const DataLoaderProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const configuration = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axiosClient('/users/admin', configuration);
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [auth]);

  const refreshUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.get('/users/admin', config);
      setUsers(data);

      // Check if all users are blocked and redirect to login if true
      if (data.every((user) => user.status === 'blocked')) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    const deleteMessage = window.confirm('Delete User?');
    if (deleteMessage) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axiosClient.delete(`/users/admin/${id}`, config);
        const updatedUsers = users.filter((elem) => elem._id !== id);
        setUsers(updatedUsers);
        if (data.every((user) => user.status === 'blocked')) {
          navigate('/');
        }
        console.log(data);
      } catch (error) {
        console.log(error.response);
      }
    }
  };
  const inactivateUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.put(
        `/users/admin/block/${id}`,
        {
          blocked: true,
        },
        config
      );
      const updatedUser = data.user;
      const updatedUsers = users.map((user) =>
        user._id === id
          ? {
              ...user,
              blocked: updatedUser.blocked,
              status: updatedUser.status,
            }
          : user
      );
      console.log('Updated users:', updatedUsers);
      setUsers(updatedUsers);
      // Check if all users are blocked and redirect to login if true
      if (data.every((user) => user.status === 'blocked')) {
        navigate('/');
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const unblockUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.put(
        `/users/admin/${id}`,
        {
          blocked: false,
        },
        config
      );
      const updatedUser = data.user;
      const updatedUsers = users.map((user) =>
        user._id === id
          ? {
              ...user,
              blocked: updatedUser.blocked,
              status: updatedUser.status,
            }
          : user
      );
      console.log('Updated users:', updatedUsers);
      setUsers(updatedUsers);
      if (data.every((user) => user.status === 'blocked')) {
        navigate('/');
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <DataContext.Provider
      value={{
        users,
        setUsers,
        refreshUsers,
        deleteUser,
        inactivateUser,
        unblockUser,
      }}
    >
      {' '}
      {children}
    </DataContext.Provider>
  );
};
export { DataLoaderProvider };
export default DataContext;
