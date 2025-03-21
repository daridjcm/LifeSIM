import React from "react";
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
import doctors from "../../../utils/Doctors.json"; // Importing as default

let doctorsData = doctors; // Using the imported data directly

export const columns = [
  { name: "DOCTOR", uid: "doctor" },
  { name: "SPECIALITY", uid: "speciality" },
  { name: "DATE", uid: "date" },
  { name: "STATUS APPOINTMENTS", uid: "status" },
];

const statusColorMap = {
  assisted: "success",
  canceled: "danger",
  scheduled: "warning",
}; 

// const fetchAppointments = async () => {
//   try {
//     const response = await axios.get('http://localhost:3000/api/appointments');
//     console.log("Retrieved appointments:", response.data);
//     alert("Appointments fetched successfully!");
//   } catch (error) {
//     console.error("Error fetching appointments:", error);
//     alert("Failed to retrieve appointments.");
//   }
// };
// fetchAppointments()

export default function HealthRecord() {
  const renderCell = React.useCallback((doctor, columnKey) => {
    const cellValue = doctor[columnKey];

    switch (columnKey) {
      case "doctor":
        return (
          <User
            avatarProps={{ radius: "lg", src: doctor.img[1] }}
            description={doctor.name}
            name={cellValue}
          >
            {doctor.name}
          </User>
        );
      case "speciality":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{doctor.specialist}</p>
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
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "date" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={doctorsData}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
