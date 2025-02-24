import React from "react";
import FormComp from "../components/Form";

export default function Login() {
  const fields = [
    {
      name: "username",
      label: "Username",
      placeholder: "Enter your username",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "**********",
      type: "password",
    },
  ];

  return (
    <div className="flex justify-center items-center h-screen">
      <FormComp
        action="/login"
        title="Welcome again to"
        fields={fields}
        statusForm="login"  // Indicating this is a login form
        btnText="Enter"
        isRequired={true}
      />
    </div>
  );
}
