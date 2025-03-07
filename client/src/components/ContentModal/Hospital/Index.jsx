import React from "react";
import { Tabs, Tab } from "@heroui/react";

export default function ContentBank() {
  const [selected, setSelected] = React.useState("scheduleappointment");

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
        key="scheduleappointment"
        title={
          <div className="flex items-center space-x-2">
            <span>Schedule Appointment</span>
          </div>
        }
      ></Tab>
      <Tab
        key="withdraw"
        title={
          <div className="flex items-center space-x-2">
            <span>Withdraw</span>
          </div>
        }
      ></Tab>
      <Tab
        key="invert"
        title={
          <div className="flex items-center space-x-2">
            <span>Invert</span>
          </div>
        }
      ></Tab>
      <Tab
        key="transfer"
        title={
          <div className="flex items-center space-x-2">
            <span>Transfer</span>
          </div>
        }
      ></Tab>
      <Tab
        key="paydebt"
        title={
          <div className="flex items-center space-x-2">
            <span>Pay Debt</span>
          </div>
        }
      ></Tab>
      <Tab
        key="loans"
        title={
          <div className="flex items-center space-x-2">
            <span>Loans</span>
          </div>
        }
      ></Tab>
    </Tabs>
  );
}
