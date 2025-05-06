import React, { createContext, useContext, useState, useEffect } from 'react';

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [nextAppointment, setNextAppointment] = useState(null);

  const fetchAppointments = async (userID) => {
    try {
      const response = await fetch('http://localhost:3000/api/appointments');
      if (!response.ok) throw new Error('Network response was not ok');

      const { appointments } = await response.json();

      const userAppointments = appointments.filter(
        (appt) => appt.user_id === userID,
      );

      const now = new Date();
      const upcoming = userAppointments
        .map((appt) => ({
          ...appt,
          dateObj: new Date(`${appt.date}T${appt.time}Z`),
        }))
        .filter(
          (appt) =>
            new Date(appt.dateObj) > now &&
            appt.status !== 'completed' &&
            appt.status !== 'canceled',
        )
        .sort((a, b) => new Date(a.dateObj) - new Date(b.dateObj));

      setNextAppointment(upcoming[0] || null);

      return userAppointments;
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
