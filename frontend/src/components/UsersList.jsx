import useDataLoader from '../hooks/useDataLoader';
import useAuth from '../hooks/useAuth';
import React, { useState } from 'react';
import User from './User';

const UsersList = () => {
  const { users, refreshUsers, deleteUser, inactivateUser, unblockUser } =
    useDataLoader();
  const { signOut } = useAuth();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const toggleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user._id));
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteUsers = async () => {
    for (const userId of selectedUsers) {
      await deleteUser(userId);
    }
    setSelectedUsers([]);
    refreshUsers();
  };

  const handleBlockUsers = async () => {
    for (const userId of selectedUsers) {
      await inactivateUser(userId);
    }
    setSelectedUsers([]);
    refreshUsers();
  };

  const handleUnblockUsers = async () => {
    for (const userId of selectedUsers) {
      await unblockUser(userId);
    }
    setSelectedUsers([]);
    refreshUsers();
  };

  return (
    <>
      <h1 className='text-3xl font-bold text-center'>Users List</h1>

      <div className='mb-4 flex justify-between items-center'>
        <div>
          <button
            className='bg-red-600 text-white px-4 py-2 rounded mr-2'
            onClick={handleDeleteUsers}
          >
            Delete
          </button>
          <button
            className='bg-yellow-600 text-white px-4 py-2 rounded mr-2'
            onClick={handleBlockUsers}
          >
            Block
          </button>
          <button
            className='bg-green-600 text-white px-4 py-2 rounded'
            onClick={handleUnblockUsers}
          >
            Unblock
          </button>
        </div>
        <div>
          <button
            className='bg-indigo-600 text-white px-4 py-2 rounded'
            onClick={signOut}
          >
            Sign Out
          </button>
        </div>
      </div>
      {users.length ? (
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white border border-gray-200 rounded-xl shadow-md'>
            <thead>
              <tr>
                <th className='py-2 px-4 bg-gray-100 border-b text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>
                  <input
                    type='checkbox'
                    checked={selectAll}
                    onChange={toggleSelectAll}
                    className='rounded text-indigo-600'
                  />
                </th>
                <th className='py-2 px-4 bg-gray-100 border-b text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>
                  Name/Position
                </th>
                <th className='py-2 px-4 bg-gray-100 border-b text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>
                  Position
                </th>
                <th className='py-2 px-4 bg-gray-100 border-b text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>
                  E-Mail
                </th>
                <th className='py-2 px-4 bg-gray-100 border-b text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>
                  Last Login
                </th>
                <th className='py-2 px-4 bg-gray-100 border-b text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <User
                  key={user._id}
                  userProp={user}
                  isSelected={selectedUsers.includes(user._id)}
                  toggleSelectUser={toggleSelectUser}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <h2 className='text-3xl font-bold text-center'>No Users Added</h2>
        </>
      )}
    </>
  );
};

export default UsersList;
