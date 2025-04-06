import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip
} from "@heroui/react";

export const columns = [
  { name: "DOCTOR", uid: "doctor" },
  { name: "SPECIALITY", uid: "speciality" },
  { name: "DATE", uid: "date" },
  { name: "TIME", uid: "time" },
  { name: "STATUS APPOINTMENTS", uid: "status" },
];

const statusColorMap = {
  assisted: "success",
  canceled: "danger",
  scheduled: "warning",
};

export default function HealthRecord() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/appointments");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setAppointments(data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert("Failed to retrieve appointments.");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const renderCell = React.useCallback((appointment, columnKey) => {
    const cellValue = appointment[columnKey];

    switch (columnKey) {
      case "doctor":
        return (
          <>
            {appointment.doctor}
          </>
        );
      case "speciality":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{appointment.specialist}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[cellValue]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Appointments table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "date" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={appointments}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
