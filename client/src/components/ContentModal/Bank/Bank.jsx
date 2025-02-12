import React from "react";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import { Loans, Overview, PayDebt, Save } from "./Forms";

export default function ContentBank() {
  const [selected, setSelected] = React.useState("overview");

  // TODO: In CardBody will be used FormComp
  // TODO: Add bg into of each content.
  return (
    <Tabs aria-label="Options" selectedKey={selected} onSelectionChange={setSelected}>
      <Tab key="overview" title="Overview">
        <Overview />
      </Tab>
      <Tab key="save" title="Save">
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

