import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
} from "@heroui/react";
import CustomButton from "../../CustomButton.jsx";
import { TrashIcon } from "@heroicons/react/24/solid";
import SpinnerComp from "../../Spinner.jsx";
import { useAlert } from "../../../context/AlertContext.jsx";

export const columns = [
  { name: "DOCTOR", uid: "doctor" },
  { name: "SPECIALITY", uid: "speciality" },
  { name: "DATE", uid: "date" },
  { name: "TIME", uid: "time" },
  { name: "STATUS", uid: "status" },
  { name: "CANCEL", uid: "cancel" },
];

const statusColorMap = {
  assisted: "success",
  canceled: "danger",
  scheduled: "warning",
};

export default function HealthRecord() {
  const [appointments, setAppointments] = useState([]);
  const { showAlert } = useAlert();

  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/appointments");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setAppointments(data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      showAlert("Failed to retrieve appointments.");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "canceled" }),
      });

      if (!res.ok) throw new Error("Failed to cancel appointment");

      setTimeout(() => {
        setAppointments((prev) =>
          prev.map((appt) =>
            appt.id === id ? { ...appt, status: "canceled" } : appt,
          ),
        );
      }, "1000");
      showAlert("The appointment was canceled sucessfully.");
    } catch (err) {
      console.error("Error canceling appointment:", err);
      showAlert("Failed to cancel the appointment.");
    }
  };

  const renderCell = React.useCallback((appointment, columnKey) => {
    const cellValue = appointment[columnKey];

    switch (columnKey) {
      case "doctor":
        return <p>{appointment.doctor}</p>;
      case "speciality":
        return (
          <div className="flex flex-col">
            <p>{cellValue}</p>
            <p>{appointment.specialist}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[cellValue]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "cancel":
        return (
          <CustomButton
            key={appointment.id}
            icon={<TrashIcon className="size-6" />}
            onPress={() => handleCancel(appointment.id)}
          />
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Appointments table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "date" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"No appointments to display."}
        items={appointments}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
