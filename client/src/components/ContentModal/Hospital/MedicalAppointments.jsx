import { Calendar, DateInput, Select, SelectItem, Avatar } from '@heroui/react';
import CustomButton from '../../CustomButton.jsx';
import { useState } from 'react';
import {
  now,
  getLocalTimeZone,
  CalendarDateTime,
  toZoned,
} from '@internationalized/date';
import { doctors } from '../../../utils/data.js';
import { useUser } from '../../../context/UserContext.jsx';
import { useAlert } from '../../../context/AlertContext.jsx';

export default function MedicalAppointments() {
  const [date, setDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [formattedDateTime, setFormattedDateTime] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const doctorsData = doctors;
  const { showAlert } = useAlert();

  const schedules = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
  ];

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    if (!date) return;

    try {
      const [hours, minutes] = time.split(':').map((num) => parseInt(num, 10));
      const newDateTime = new CalendarDateTime(
        date.year,
        date.month,
        date.day,
        hours,
        minutes,
        0,
      );
      const zonedDateTime = toZoned(newDateTime, getLocalTimeZone());
      setDateTime(zonedDateTime);

      const jsDate = zonedDateTime.toDate();
      const formattedDate = jsDate.toLocaleDateString();
      const formattedTime = jsDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      setFormattedDateTime({ formattedDate, formattedTime, jsDate });
    } catch (error) {
      console.error('Error processing dateTime:', error);
    }
  };

  const handleDateChange = (newDate) => {
    if (newDate) {
      setDate(newDate);
      if (selectedTime) {
        handleTimeClick(selectedTime);
      }
    } else {
      setDate(null);
      setDateTime(null);
      setFormattedDateTime(null);
    }
  };

  const { user } = useUser();

  // Send appointment data to the server
  const submitAppointment = async () => {
    if (!formattedDateTime || !selectedDoctor) {
      return showAlert('Check!', 'Please select a date, time, and doctor.');
    }

    // Define appointment data JSON object
    const appointmentData = {
      user_id: user.id,
      title: selectedDoctor.title,
      doctor: selectedDoctor.name,
      date: formattedDateTime.formattedDate,
      time: formattedDateTime.formattedTime,
      specialist: selectedDoctor.specialist,
      area: selectedDoctor.area,
      status: 'scheduled',
    };

    // Make a POST request to the server
    const response = await fetch('http://localhost:3000/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentData),
    });

    // Handle response
    try {
      const result = await response.json();
      if (response.ok) {
        showAlert('Warning', 'You must assist before 5 minutes of the appointment time or the appointment will be canceled.');
        setTimeout(() => {
          showAlert('Appointment Scheduled', result.message);
        }, 5000);

      } else {
        console.error(result.error);
        showAlert('Error', result.error);
      }
    } catch (error) {
      console.error('Error parsing JSON response:', error);
      showAlert('Error', 'The server returned an invalid JSON response.');
    }
  };

  // Render the form to schedule an appointment
  return (
    <div className='flex sm:flex-col md:flex-row lg:flex-row gap-8 flex-wrap justify-around'>
      <div className='flex flex-col gap-3'>
        <p className='text-2xl font-semibold'>Select a date</p>
        <Calendar
          aria-label='Date selection'
          onChange={handleDateChange}
          minValue={now(getLocalTimeZone())}
        />
      </div>
      <div className='flex flex-col sm:w-full lg:w-8/12 gap-3'>
        <p className='text-2xl font-semibold'>Available Schedules</p>
        <div className='grid w-full grid-rows-3 max-sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-8 gap-2'>
          {schedules.map((time) => (
            <CustomButton
              key={time}
              label={time}
              className={'w-10'}
              variant={selectedTime === time ? 'solid' : 'bordered'}
              onPress={() => handleTimeClick(time)}
              isDisabled={!date}
            />
          ))}
        </div>

        <Select
          classNames={{ base: 'w-full', trigger: 'h-12' }}
          label='Assign doctor'
          labelPlacement='outside'
          placeholder='Select a doctor'
          onSelectionChange={(keys) => {
            const key = Array.from(keys)[0];
            const doctor = doctorsData.find((doc) => doc.id.toString() === key);
            setSelectedDoctor(doctor || null);
          }}
        >
          {doctorsData.map((doctor) => (
            <SelectItem key={doctor.id} textValue={doctor.name}>
              <div className='flex gap-2 items-center'>
                <Avatar
                  name={doctor.name}
                  alt={doctor.name}
                  className='flex-shrink-0'
                  size='sm'
                  src={doctor.img[1] || ''}
                  showFallback
                />
                <div className='flex flex-col'>
                  <span className='text-small'>{doctor.name}</span>
                  <span className='text-tiny text-default-400'>
                    {doctor.specialist} - {doctor.area}
                  </span>
                </div>
              </div>
            </SelectItem>
          ))}
        </Select>

        <p>Medical appointment scheduled for:</p>
        <div className='flex sm:flex-col md:flex-row lg:flex-row gap-5'>
          <DateInput
            label='Date & Time:'
            variant='bordered'
            value={dateTime || now(getLocalTimeZone())}
            isReadOnly
          />
          <CustomButton label='Program' size='lg' onPress={submitAppointment} />
        </div>
      </div>
    </div>
  );
}
