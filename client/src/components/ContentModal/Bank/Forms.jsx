import FormComp from "../../Form/";

export function Overview() {
  const fields = [
    {
      name: "currentbalance",
      label: "Current Balance",
      value: "$",
      type: "text",
    },
    {
      name: "savings",
      label: "Savings",
      value: "$",
      type: "text",
    },
    {
      name: "outstandingdebt",
      label: "Outstanding Debt",
      value: "$",
      type: "text",
    },
  ];

  return (
      <FormComp
        title="Financial Overview"
        description="Your current financial status"
        fields={fields}
        statusForm=""
        isRequired={false}
      />
  );
}

export function Save() {
  const fields = [
    {
      name: "amounttosave",
      label: "Amount to Save",
      placeholder: "Enter amount",
      type: "number"
    }
  ]

  return (
    <FormComp 
      title="Save Money"
      description="Transfer money to you savings account"
      fields={fields}
      isRequired={false}
      btnText="Save $100"
    />
  )
}

export function PayDebt() {
  const fields = [
    {
      name: "amounttopay",
      label: "Amount to Pay",
      placeholder: "Enter amount",
      type: "number"
    }
  ]

  return (
    <FormComp 
      title="Pay Debt"
      description="Make a payment towards your outstanding debt"
      fields={fields}
      isRequired={false}
      btnText="Pay $100"
    />
  )
}

export function Loans() {
  const fields = [
    {
      name: "loantype",
      label: "Loan Type",
      placeholder: "Select loan type",
      type: "select",
      options: [
        { label: "Personal Loan", value: "personalloan" },
        { label: "Auto Loan", value: "autoloan" }, // TODO: Delete this.
        { label: "Mortgage", value: "mortgage" },
      ],
    },
    {
      name: "loanamount",
      label: "Loan Amount",
      placeholder: "Enter amount",
      type: "number",
    }
  ]
  return (
    <FormComp 
      title="Apply for a Loan"
      description="Choose a loan type and amount"
      fields={fields}
      isRequired={false}
      btnText="Apply for Loan"
    />
  )
}
export default {Overview, Save, PayDebt, Loans}