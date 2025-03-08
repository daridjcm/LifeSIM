import { Calendar, DateInput, Select, SelectItem, Avatar } from "@heroui/react";
import CustomButton from "../../CustomButton.jsx";
import { useState } from "react";
import { now, getLocalTimeZone, CalendarDateTime, toZoned } from "@internationalized/date";
import { doctors } from "../../../utils/data.js";

export default function MedicalAppointments() {
  const [date, setDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [formattedDateTime, setFormattedDateTime] = useState(null);
  const doctorsData = doctors;


  const schedules = [
    "08:00", "09:00", "10:00", "11:00",
    "12:00", "14:00", "15:00", "16:00"
  ];

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    if (!date) return;

    try {
      const [hours, minutes] = time.split(':').map(num => parseInt(num, 10));

      const newDateTime = new CalendarDateTime(
        date.year,
        date.month,
        date.day,
        hours,
        minutes,
        0
      );

      const zonedDateTime = toZoned(newDateTime, getLocalTimeZone());
      setDateTime(zonedDateTime);

      const jsDate = zonedDateTime.toDate();
      const formattedDate = jsDate.toLocaleDateString();
      const formattedTime = jsDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setFormattedDateTime({
        formattedDate,
        formattedTime,
        jsDate
      });
    } catch (error) {
      console.error("Error processing dateTime:", error);
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

  return (
    <div className="flex sm:flex-col md:flex-row lg:flex-row gap-8 flex-wrap justify-around">
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-semibold">Select a date</p>
        <Calendar
          aria-label="Date selection"
          onChange={handleDateChange}
          minValue={now(getLocalTimeZone())}
        />
      </div>
      <div className="flex flex-col sm:w-full lg:w-8/12 gap-3">
        <p className="text-2xl font-semibold">Available Schedules</p>
        <div className="grid w-full grid-rows-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {schedules.map((time) => (
            <CustomButton
              key={time}
              label={time}
              variant={selectedTime === time ? "solid" : "bordered"}
              onPress={() => handleTimeClick(time)}
              isDisabled={!date}
            />
          ))}
        </div>

        <Select
          classNames={{
            base: "w-full",
            trigger: "h-12",
          }}
          items={doctorsData}
          label="Assign doctor"
          labelPlacement="outside"
          placeholder="Select a doctor"
          renderValue={(doctors) => {
            return doctors.map((doctor) => (
              <div key={doctor.key} className="flex doctors-center gap-2">
                <Avatar
                  alt={doctor.data.name}
                  className="flex-shrink-0"
                  size="md"
                  src={doctor.data.avatar}
                />
                <div className="flex flex-col">
                  <span>{doctor.data.name}</span>
                  <span className="text-default-500 text-tiny">{doctor.data.specialist} ({doctor.data.experience} experience)</span>
                </div>
              </div>
            ));
          }}
        >
          {(doctor) => (
            <SelectItem key={doctor.id} textValue={doctor.name}>
              <div className="flex gap-2 items-center">
                <Avatar alt={doctor.name} className="flex-shrink-0" size="sm" src={doctor.avatar} />
                <div className="flex flex-col">
                  <span className="text-small">{doctor.name}</span>
                  <span className="text-tiny text-default-400">{doctor.specialist} - {doctor.area}</span>
                </div>
              </div>
            </SelectItem>
          )}
        </Select>

        <p>Medical appointment scheduled for:</p>
        <div className="flex sm:flex-col md:flex-row lg:flex-row gap-5">
          <DateInput
            label="Date & Time:"
            variant="bordered"
            value={dateTime || now(getLocalTimeZone())}
            isReadOnly={true}
          />

          <CustomButton label="Program" size="lg" />
          {/* {formattedDateTime && (
            <p className="text-lg font-medium mt-3">
              Appointment set for {formattedDateTime.formattedDate} at{" "}
              {formattedDateTime.formattedTime}
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
}