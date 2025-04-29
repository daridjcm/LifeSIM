import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
} from "@heroui/react";

const status = {
  label: [
    "Make call",
    "Call rejected",
    "Call accepted",
    "Call completed",
    "No call",
  ],
  key: [
    "You need to call the customer",
    "The customer did not answer",
    "The customer answered the call",
    "The call was successfully completed",
    "No call was made",
  ],
  color: ["primary", "danger", "success", "warning", "secondary"],
};

// ToDo: Create a server route to customers.
export const customers = [
  {
    id: 1,
    name: "John Doe",
    phone: "123-456-7890",
    status: 4,
    date: "Without date",
  },
  {
    id: 2,
    name: "Jane Doe",
    phone: "555-123-4567",
    status: 4,
    date: "Without date",
  },
  {
    id: 3,
    name: "Bob Smith",
    phone: "987-654-3210",
    status: 4,
    date: "Without date",
  },
  {
    id: 4,
    name: "Alice Johnson",
    phone: "321-987-6543",
    status: 4,
    date: "Without date",
  },
];

export const customersCount = customers.length;

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "phone",
    label: "PHONE",
  },
  {
    key: "status",
    label: "CALL STATUS",
  },
  {
    key: "date",
    label: "DATE OF CALLS",
  },
];

export default function TableCustomers() {
  return (
    <>
      <Table shadow="md" aria-label="Table of Customers">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {customers.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.key === "status" ? (
                    <Chip color={status.color[row.status - 1]}>
                      {status.label[row.status - 1]}
                    </Chip>
                  ) : (
                    row[column.key]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        className="mt-4"
        color="primary"
        variant="ghost"
        size="md"
        onPress={() => window.open("/customers/new", "_blank")}
      >
        Add a new customer
      </Button>

      <div className="text-amber-600 bg-yellow-100 p-2 rounded-md mt-4">
        <p className="font-semibold">Note about Call Status</p>
        <ul className="flex flex-col gap-2 mt-3 list-decimal list-inside text-sm text-zinc-900">
          {status.label.map((label, index) => (
            <li key={status.key[index]}>
              <Chip color={status.color[index]}>{label}</Chip> -{" "}
              {status.key[index]}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
