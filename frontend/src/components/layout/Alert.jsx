import { useEffect, useState } from 'react';

const Alert = ({ alert }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div
      className={`${
        alert.error
          ? 'from-red-400 to-red-900 '
          : 'from-indigo-400 to-indigo-800'
      } bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white text-sm mb-6`}
    >
      {alert.msg}
    </div>
  );
};

export default Alert;
