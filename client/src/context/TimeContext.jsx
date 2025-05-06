import React, { createContext, useState, useEffect } from 'react';

export const TimeContext = createContext();

// To validate if a day has passed
export const TimeProvider = ({ children }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <TimeContext.Provider value={time}>{children}</TimeContext.Provider>;
};
