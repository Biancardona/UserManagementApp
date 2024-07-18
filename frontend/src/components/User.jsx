import React from 'react';

const User = ({ userProp, isSelected, toggleSelectUser }) => {
  const { name, email, date, status, _id, position } = userProp;

  const formatDate = (date) => {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat('es-MX', { dateStyle: 'long' }).format(
      newDate
    );
  };

  return (
    <tr className='border-b border-gray-200'>
      <td className='py-2 px-4 text-left'>
        <input
          type='checkbox'
          checked={isSelected}
          onChange={() => toggleSelectUser(_id)}
          className='rounded text-indigo-600'
        />
      </td>
      <td className='py-2 px-4 text-left text-sm text-gray-900'>{name}</td>
      <td className='py-2 px-4 text-left text-sm text-gray-900'>{position}</td>
      <td className='py-2 px-4 text-left text-sm text-gray-900'>{email}</td>
      <td className='py-2 px-4 text-left text-sm text-gray-900'>
        {formatDate(date)}
      </td>
      <td className='py-2 px-4 text-left text-sm text-gray-900'>{status}</td>
    </tr>
  );
};

export default User;
