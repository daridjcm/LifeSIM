import React, { useContext } from 'react';
import { TimeContext } from '../context/TimeContext.jsx';

const Clock = () => {
  const time = useContext(TimeContext);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const hours12 = hours % 12 || 12;

  const hourFormat = `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;

  return (
    <div className="text-3xl font-bold text-center p-2 bg-gray-100 rounded-lg shadow">
      {hourFormat}
    </div>
  );
};

export default Clock;
