import React from 'react';
import FormComp from '../components/Form/';

export default function NewCustomer() {
  const fields = [
    {
      name: 'fullname',
      label: 'Full Name',
      placeholder: 'Enter full name of customer',
      type: 'text',
    },
    {
      name: 'phone',
      label: 'Phone',
      placeholder: 'Enter phone number of customer',
      type: 'text',
    },
    {
      name: 'callStatus',
      label: 'Call Status',
      placeholder: 'Select call status',
      type: 'select',
      options: [
        { label: 'Make call', value: 1 },
        { label: 'Call rejected', value: 2 },
        { label: 'Call accepted', value: 3 },
        { label: 'Call completed', value: 4 },
        { label: 'No call', value: 5 },
      ],
    },
  ];

  return (
    <div className="flex justify-center items-center h-screen">
      <FormComp
        title="Add Customer in the table"
        fields={fields}
        statusForm="customers" // Indicating this is for adding a customer
        btnText="Add Customer"
        isRequired={true}
      />
    </div>
  );
}
