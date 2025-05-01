import React from "react";
import { Tabs, Tab } from "@heroui/react";
import { Loans, Overview, PayDebt, Save, Withdraw, Invert } from "./Forms.jsx";
import {
  DocumentTextIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  BanknotesIcon,
  CreditCardIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";

// Render Tabs for the content Bank
export default function ContentBank() {
  const [selected, setSelected] = React.useState("overview");

  return (
    <Tabs
      aria-label="Options"
      selectedKey={selected}
      onSelectionChange={setSelected}
      size="lg"
      color="primary"
      fullWidth
    >
      <Tab
        key="overview"
        title={
          <div className="flex items-center space-x-2">
            <DocumentTextIcon className="size-6" />
            <span>Overview</span>
          </div>
        }
      >
        <Overview />
      </Tab>
      <Tab
        key="withdraw"
        title={
          <div className="flex items-center space-x-2">
            <CurrencyDollarIcon className="size-6" />
            <span>Withdraw</span>
          </div>
        }
      >
        <Withdraw />
      </Tab>
      <Tab
        key="invert"
        title={
          <div className="flex items-center space-x-2">
            <ChartBarIcon className="size-6" />
            <span>Invert</span>
          </div>
        }
      >
        <Invert />
      </Tab>
      <Tab
        key="transfer"
        title={
          <div className="flex items-center space-x-2">
            <GlobeAltIcon className="size-6" />
            <span>Transfer</span>
          </div>
        }
      >
        <Save />
      </Tab>
      <Tab
        key="paydebt"
        title={
          <div className="flex items-center space-x-2">
            <BanknotesIcon className="size-6" />
            <span>Pay Debt</span>
          </div>
        }
      >
        <PayDebt />
      </Tab>
      <Tab
        key="loans"
        title={
          <div className="flex items-center space-x-2">
            <CreditCardIcon className="size-6" />
            <span>Loans</span>
          </div>
        }
      >
        <Loans />
      </Tab>
    </Tabs>
  );
}
