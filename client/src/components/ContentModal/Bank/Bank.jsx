import React from "react";
import {Tabs, Tab, Card, CardBody} from "@heroui/react";
import {Loans, Overview, PayDebt, Save} from "./Forms";

export default function ContentBank() {
  const [selected, setSelected] = React.useState("overview");

  // TODO: In CardBody will be used FormComp
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options" selectedKey={selected} onSelectionChange={setSelected}>
        <Tab key="overview" title="Overview">
          <Card>
            <CardBody>
              <Overview />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="save" title="Save">
          <Card>
            <CardBody>
              <Save />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="paydebt" title="Pay Debt">
          <Card>
            <CardBody>
              <PayDebt />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="loans" title="Loans">
          <Card>
            <CardBody>
              <Loans />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}

