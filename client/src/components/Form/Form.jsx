import React from "react";
import { Form, Input, Button } from "@heroui/react";
import PropTypes from "prop-types";
import { SelectItem, Select } from "@heroui/react";
import { Have, NotHave, HaveCustomers } from "./HaveOrNot";

// Componente condicional reutilizable
const ConditionalWrapper = ({ condition, children }) => {
  return condition ? children : null;
};

export default function FormComp({
  title,
  description,
  fields,
  statusForm,
  btnText,
  isRequired,
}) {
  FormComp.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        value: PropTypes.string,
        type: PropTypes.string.isRequired,
        options: PropTypes.array,
      })
    ).isRequired,
    statusForm: PropTypes.string.isRequired,
    btnText: PropTypes.string,
    isRequired: PropTypes.bool,
  };

  const [action, setAction] = React.useState(null);

  return (
    <Form
      className={
        title === "Welcome again to" || title === "Create your"
          ? "w-full m-auto max-w-xs flex flex-col gap-4"
          : "flex gap-2"
      }
      validationBehavior="native"
      onReset={() => setAction("reset")}
      onSubmit={(e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget));
        setAction(`submit ${JSON.stringify(data)}`);
      }}
    >
      <ConditionalWrapper
        condition={title === "Welcome again to" || title === "Create your"}
      >
        <div className="bg-green-200 w-full max-w-xs p-2 text-center rounded-md">
          <h1 className="text-xl">
            {title}{" "}
            <span className="text-green-600 font-bold text-2xl">LifeSIM</span>
          </h1>
        </div>
      </ConditionalWrapper>

      <ConditionalWrapper
        condition={!(title === "Welcome again to" || title === "Create your")}
      >
        <div className="flex flex-col gap-2 mb-4">
          <p className="text-xl font-bold">{title}</p>
          <p>{description}</p>
        </div>
      </ConditionalWrapper>

      {fields.map((field, index) => (
        field.type === "select" ? (
          <Select
            key={index}
            isRequired
            errorMessage={`Please select a valid ${field.name}`}
            label={field.label}
            labelPlacement="outside"
            items={field.options}
            placeholder={field.placeholder}
            aria-label={`Select ${field.name}`}
          >
            {Array.isArray(field.options) && field.options.length > 0
              ? field.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))
              : null}
          </Select>
        ) : (
          <Input
            key={index}
            isRequired={isRequired}
            errorMessage={`Please enter a valid ${field.name}`}
            label={field.label}
            labelPlacement="outside"
            name={field.name}
            placeholder={field.placeholder}
            value={field.value}
            type={field.type}
            pattern={field.type === "password" ? "\\w{10}" : undefined}
            maxLength={field.type === "password" ? 10 : undefined}
          />
        )
      ))}

      <ConditionalWrapper condition={statusForm !== ''}>
        <div className="flex gap-2 mt-4">
          <Button
            color={
              statusForm === "login" || statusForm === "signup"
                ? "success"
                : "primary"
            }
            variant="flat"
            type="submit"
          >
            {statusForm === "login"
              ? "Enter"
              : statusForm === "signup"
              ? "Register"
              : statusForm === "customers"
              ? "Add Customer"
              : btnText}
          </Button>
        </div>
      </ConditionalWrapper>

      {statusForm === "login" ? (
        <NotHave />
      ) : statusForm === "signup" ? (
        <Have />
      ) : statusForm === "customers" ? (
        <HaveCustomers />
      ) : null}
    </Form>
  );
}
