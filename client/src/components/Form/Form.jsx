import React from "react";
import { Form, Input, Button } from "@heroui/react";
import PropTypes from "prop-types";
import { Have, HaveNull, NotHave } from "./HaveOrNot";
import { SelectItem, Select } from "@heroui/react";

export default function FormComp({
  title,
  name1,
  name2,
  items3,
  name4,
  label1,
  label2,
  label3,
  label4,
  placeholder1,
  placeholder2,
  placeholder3,
  placeholder4,
  askAccount,
}) {
  FormComp.propTypes = {
    title: PropTypes.string.isRequired,
    name1: PropTypes.string.isRequired,
    label1: PropTypes.string.isRequired,
    placeholder1: PropTypes.string.isRequired,
    name2: PropTypes.string,
    label2: PropTypes.string,
    placeholder2: PropTypes.string,
    label3: PropTypes.string,
    items3: PropTypes.array,
    placeholder3: PropTypes.string,
    name4: PropTypes.string.isRequired,
    label4: PropTypes.string.isRequired,
    placeholder4: PropTypes.string.isRequired,
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
          <h1 className="text-xl">
            {title}{" "}
            <span className="text-green-600 font-bold text-2xl">LifeSIM</span>
          </h1>
        </div>
        <Input
          isRequired
          errorMessage="Please a enter a valid name"
          label={label1}
          labelPlacement="outside"
          name={name1}
          placeholder={placeholder1}
          type="text"
        />

        {askAccount != true ? (
          <>
            <Input
              isRequired
              errorMessage="Please enter a valid email"
              label={label2}
              labelPlacement="outside"
              name={name2}
              placeholder={placeholder2}
              type="email"
            />
            <Select
              isRequired
              errorMessage="Please select an option"
              label={label3}
              labelPlacement="outside"
              className="max-w-xs"
              items={items3}
              placeholder={placeholder3}
            >
            {items3.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select>
          </>
        ) : (
          <>
            <Input
              isRequired
              errorMessage="The maximum length for the password is 10 characters"
              label={label4}
              labelPlacement="outside"
              name={name4}
              placeholder={placeholder4}
              type="password"
              pattern="\w{10}"
              maxLength={10}
            />
          </>
        )}

        <div className="flex gap-2">
          <Button color="success" variant="flat" type="submit">
            {askAccount == true ? "Enter" :
            askAccount != true ? "Register" : "Submit"}
          </Button>
        </div>
        {askAccount != true ? <Have /> : askAccount == true ? <NotHave /> : <HaveNull />}
      </Form>
    </div>
  );
}
