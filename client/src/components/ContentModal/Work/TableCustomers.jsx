import { Button, Chip } from '@heroui/react';
import ReusableTable from '../../Table.jsx';

const status = {
  label: [
    'Make call',
    'Call rejected',
    'Call accepted',
    'Call completed',
    'No call',
  ],
  key: [
    'You need to call the customer',
    'The customer did not answer',
    'The customer answered the call',
    'The call was successfully completed',
    'No call was made',
  ],
  color: ['primary', 'danger', 'success', 'warning', 'secondary'],
};

// TODO: Create a server route to customers.
// Customers presets
export const customers = [
  {
    id: 1,
    name: 'John Doe',
    phone: '123-456-7890',
    status: 4,
    date: '25/04/2016',
  },
  {
    id: 2,
    name: 'Jane Doe',
    phone: '555-123-4567',
    status: 4,
    date: '13/07/2024',
  },
  {
    id: 3,
    name: 'Bob Smith',
    phone: '987-654-3210',
    status: 4,
    date: '5/10/2022',
  },
  {
    id: 4,
    name: 'Alice Johnson',
    phone: '321-987-6543',
    status: 4,
    date: '2/6/2011',
  },
];

export const customersCount = customers.length + 1;

// Define columns to display in the table
const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'NAME' },
  { key: 'phone', label: 'PHONE' },
  { key: 'status', label: 'CALL STATUS' },
  { key: 'date', label: 'DATE OF CALLS' },
];

// Render the table
export default function TableCustomers() {
  return (
    <div className='flex sm:flex-col md:flex-row lg:flex-row gap-4'>
      <div>
        <ReusableTable
          columns={columns}
          data={customers}
          status={status}
          title='Customers'
          description='List of customers'
        />
        <Button
          className='mt-4 w-full'
          color='primary'
          variant='ghost'
          size='md'
          onPress={() => window.open('/customers/new', '_blank')} // Open a new window to create a new customer
        >
          Add a new customer
        </Button>
      </div>

      <div className='text-amber-600 bg-yellow-100 p-2 rounded-md'>
        <p className='font-semibold'>Note about Call Status</p>
        <ul className='flex flex-col gap-2 mt-3 list-decimal list-inside text-sm text-zinc-900'>
          {status.label.map((label, index) => (
            <li key={status.key[index]}>
              <Chip color={status.color[index]}>{label}</Chip> -{' '}
              {status.key[index]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
