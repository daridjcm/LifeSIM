import React from "react";
import { Tabs, Tab } from "@heroui/react";
import { Loans, Overview, PayDebt, Save, Withdraw, Invert } from "./Forms";

export default function ContentBank() {
  const [selected, setSelected] = React.useState("overview");

  return (
    <Tabs aria-label="Options" selectedKey={selected} onSelectionChange={setSelected} placement="start" size="lg" color="primary" classNames={{tabList: "h-full p-3", panel: "ml-2"}}>
      <Tab key="overview" title="Overview">
        <Overview />
      </Tab>
      <Tab key="withdraw" title="Withdraw">
        <Withdraw />
      </Tab>
      <Tab key="invert" title="Invert">
        <Invert />
      </Tab>
      <Tab key="save" title="Save" >
        <Save />
      </Tab>
      <Tab key="paydebt" title="Pay Debt">
        <PayDebt />
      </Tab>
      <Tab key="loans" title="Loans">
        <Loans />
      </Tab>
    </Tabs>
  );
}

