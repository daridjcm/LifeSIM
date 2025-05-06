import React from 'react';
import FormComp from '../components/Form/';

export default function SignUp() {
  const fields = [
    {
      name: 'username',
      label: 'Username',
      placeholder: 'Create your username',
      type: 'text',
    },
    {
      name: 'email',
      label: 'Email',
      placeholder: 'Enter your email',
      type: 'email',
    },
    {
      name: 'gender',
      label: 'Gender',
      placeholder: 'Select your gender',
      type: 'select',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
      ],
    },
    {
      name: 'password',
      label: 'Password',
      placeholder: 'Create your password',
      type: 'password',
    },
  ];

  return (
    <div className="flex justify-center items-center h-screen">
      <FormComp
        action="/signup"
        title="Create your"
        fields={fields}
        statusForm="signup" // Indicating this is a signup form
        btnText="Register"
        isRequired={true}
      />
    </div>
  );
}
