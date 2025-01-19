import React from "react";
import { Form, Input, Button } from "@heroui/react";
import PropTypes from 'prop-types'
import { Have, NotHave } from '../components/HaveOrNot'

export default function CompForm({title, name1, name2, label1, label2, placeholder1, placeholder2, askAccount}) {
  
  CompForm.propTypes = {
    title: PropTypes.string.isRequired,
    label1: PropTypes.string.isRequired,
    name1: PropTypes.string.isRequired,
    placeholder1: PropTypes.string.isRequired,
    label2: PropTypes.string.isRequired,
    name2: PropTypes.string.isRequired,
    placeholder2: PropTypes.string.isRequired,
    askAccount: PropTypes.string.isRequired,
  };

  const [action, setAction] = React.useState(null);
  return (
  <div className="flex justify-center items-center h-screen">
    <Form
      className="w-full m-auto max-w-xs flex flex-col gap-4"
      validationBehavior="native"
      onReset={() => setAction("reset")}
      onSubmit={(e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget));

        setAction(`submit ${JSON.stringify(data)}`);
      }}
    >
      <div className="bg-green-200 w-full max-w-xs p-2 text-center rounded-md">
        <h1 className="text-xl">{title} <span className="text-green-600 font-bold text-2xl">LifeSIM</span></h1>
      </div>
      <Input
        isRequired
        errorMessage="Please enter a valid"
        label={label1}
        labelPlacement="outside"
        name={name1}
        placeholder={placeholder1}
        type="text"
      />

      <Input
        isRequired
        errorMessage="Please a enter a valid"
        label={label2}
        labelPlacement="outside"
        name={name2}
        placeholder={placeholder2}
        type="email"
      />
      <div className="flex gap-2">
        <Button color="success" variant="flat" type="submit">
          Submit
        </Button>
      </div>
      {action && (
        <div className="text-small text-default-500">
          Action: <code>{action}</code>
        </div>
      )}
      {askAccount !== "true" ? <Have /> : <NotHave />}
    </Form>
  </div>
  );
}