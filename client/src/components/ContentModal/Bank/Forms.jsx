import LineChart from "./Chart";
import FormComp from "../../Form/";

// Overview of your financial status
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

// Withdraw money from your account
export function Withdraw() {
  const fields = [
    {
      name: "withdraw",
      label: "Withdraw Money",
      value: 0,
      type: "number",
    },
  ];

  return (
    <FormComp
      title="Withdraw Money"
      description="Can receive salary of your job."
      fields={fields}
      isRequired={false}
      btnText="Withdraw All"
    />
  );
}

// Deposit money to invest it
export function Invert() {
  const fields = [
    {
      name: "invertmoney",
      label: "Invert Money",
      placeholder: "Enter your quantity of money to invert",
      type: "number",
    },
  ];

  return (
    <>
      <LineChart />
      <FormComp
        title="Invert Money"
        description="Be careful, once you have invested there is no turning back"
        fields={fields}
        isRequired={false}
        btnText="Invert Money"
      />
    </>
  );
}

// Save money to invest or pay debt
export function Save() {
  const fields = [
    {
      name: "accounttype",
      label: "Account Type",
      placeholder: "Select account type",
      type: "select",
      options: [
        {
          label: "Savings Account",
          value: "savingsaccount",
          description:
            "You to save money and meet long-term goals. You doesn't allow invert money.",
        },
        {
          label: "Current Account",
          value: "currentaccount",
          description:
            "You does allow invert money, purchase products and pay debt.",
        },
      ],
    },
    {
      name: "amounttotransfer",
      label: "Amount",
      placeholder: "Enter amount",
      type: "number",
    },
  ];

  return (
    <>
      <FormComp
        title="Transfer Money"
        description="Transfer money to you savings account or current account"
        fields={fields}
        isRequired={false}
        btnText="Transfer Money"
      />

      <div className="content-end justify-stretch text-wrap">
        <p className="text-green-500">Savings Account:</p>
        <p className="text-amber-500">Current Account: </p>
      </div>
    </>
  );
}

// To pay debt
export function PayDebt() {
  const fields = [
    {
      name: "amounttopay",
      label: "Amount to Pay",
      placeholder: "Enter amount",
      type: "number",
    },
  ];

  return (
    <FormComp
      title="Pay Debt"
      description="Make a payment towards your outstanding debt"
      fields={fields}
      isRequired={false}
      btnText="Pay Debt"
    />
  );
}

// To solicit loans for personal, mortgage, health insurance
export function Loans() {
  const fields = [
    {
      name: "loantype",
      label: "Loan Type",
      placeholder: "Select loan type",
      type: "select",
      options: [
        { label: "Personal Loan", value: "personalloan" },
        { label: "Mortgage", value: "mortgage" },
        { label: "Health Insurance - Basic", value: "healthinsurance-basic" },
        { label: "Health Insurance - Medium", value: "healthinsurance-medium" },
        {
          label: "Health Insurance - Premium",
          value: "healthinsurance-premium",
        },
      ],
    },
    {
      name: "loanamount",
      label: "Loan Amount",
      placeholder: "Enter amount",
      type: "number",
    },
  ];
  return (
    <FormComp
      title="Apply for a Loan"
      description="Choose a loan type and amount"
      fields={fields}
      isRequired={false}
      btnText="Apply for Loan"
    />
  );
}
export default { Overview, Save, PayDebt, Loans };
