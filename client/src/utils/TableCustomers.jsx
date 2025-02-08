import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@heroui/react";

const status = {
  label: ["Make call", "Call rejected", "Call accepted", "Call completed", "No call"],
  key: [1, 2, 3, 4, 5],
  color: ["primary", "danger", "success", "warning", "secondary"],
};

export const customers = [
  {
    key: 1,
    name: "John Doe",
    phone: "123-456-7890",
    status: 1,
    date: "Without date",
  },
  {
    key: 2,
    name: "Jane Doe",
    phone: "555-123-4567",
    status: 2,
    date: "Without date",
  },
  {
    key: 3,
    name: "Bob Smith",
    phone: "987-654-3210",
    status: 3,
    date: "Without date",
  },
  {
    key: 4,
    name: "Alice Johnson",
    phone: "321-987-6543",
    status: 4,
    date: "Without date",
  },
];

export const customersCount = customers.length;
function RouterNewCustomer() {
  return window.location.href = '/customers/new';
}

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
          <TableRow key={row.key}>
            {columns.map((column) => (
              <TableCell key={column.key}>{row[column.key]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
      <Button className="mt-4" color="primary" variant="ghost" size="md" onPress={RouterNewCustomer}>
        Add a new customer
      </Button>
    <div className="text-amber-600 bg-yellow-100 p-2 rounded-md">
      <p>Note about Call Status</p>
      <p className="text-sm text-zinc-900">
        <ul className="list-decimal list-inside">
          <li>Make call - Call to the customer</li>
          <li>Call rejected - The customer did not answer the call</li>
          <li>Call accepted - The customer answered the call</li>
          <li>Call completed - Call to the customer is completed</li>
        </ul>
      </p>
    </div>
    </>
  );
}
