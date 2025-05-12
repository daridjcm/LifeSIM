import React, { createContext, useContext, useState } from 'react';
import {
  parse,
  isAfter,
  isBefore,
  startOfMinute,
  isValid,
} from 'date-fns';

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [nextAppointment, setNextAppointment] = useState(null);

  const fetchAppointments = async (userID) => {
    try {
      const response = await fetch('http://localhost:3000/api/appointments');
      if (!response.ok) throw new Error('Network response was not ok');

      const { appointments } = await response.json();

      const userAppointments = appointments.filter(
        (appt) => appt.user_id === userID
      );

      const now = startOfMinute(new Date());
      console.log('🕒 Current time:', now);

      const updatedAppointments = userAppointments.map((appt) => {
        const dateTimeStr = `${appt.date} ${appt.time}`;
        const parsedDate = parse(dateTimeStr, 'yyyy-MM-dd h:mm a', new Date());

        if (!isValid(parsedDate)) {
          console.warn('❌ Invalid date:', dateTimeStr);
          return null;
        }

        const dateObj = startOfMinute(parsedDate);
        return { ...appt, dateObj };
      }).filter(Boolean);

      updatedAppointments.forEach(async (appt) => {
        if (
          isBefore(appt.dateObj, now) &&
          appt.status !== 'completed' &&
          appt.status !== 'canceled'
        ) {
          console.log(`🚫 Canceling appointment: ${appt.id}`);
          await fetch(`http://localhost:3000/api/appointments/${appt.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'canceled' }),
          });
        }
      });

      const upcoming = updatedAppointments
        .filter(
          (appt) =>
            isAfter(appt.dateObj, now) &&
            appt.status !== 'completed' &&
            appt.status !== 'canceled'
        )
        .sort((a, b) => a.dateObj - b.dateObj);

      setNextAppointment(upcoming[0] || null);

      return updatedAppointments;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return [];
    }
  };

  return (
    <AppointmentContext.Provider
      value={{ nextAppointment, setNextAppointment, fetchAppointments }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => {
  return useContext(AppointmentContext);
};
