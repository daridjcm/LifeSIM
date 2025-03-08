import React from "react";
import { Tabs, Tab } from "@heroui/react";
import {
  CalendarDateRangeIcon,
  ClockIcon,
  ClipboardDocumentListIcon,
  UserIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";

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
            <CalendarDateRangeIcon className="size-6" />
            <span>Schedule Appointment</span>
          </div>
        }
      ></Tab>
      <Tab
        key="healthrecord"
        title={
          <div className="flex items-center space-x-2">
            <ClockIcon className="size-6" />
            <span>Health Record</span>
          </div>
        }
      ></Tab>
      <Tab
        key="report"
        title={
          <div className="flex items-center space-x-2">
            <ClipboardDocumentListIcon className="size-6" />
            <span>Report</span>
          </div>
        }
      ></Tab>
      <Tab
        key="patient"
        title={
          <div className="flex items-center space-x-2">
            <UserIcon className="size-6" />
            <span>Patient</span>
          </div>
        }
      ></Tab>
      <Tab
        key="pillsreceted"
        title={
          <div className="flex items-center space-x-2">
            <ClipboardDocumentCheckIcon className="size-6" />
            <span>Pills Receted</span>
          </div>
        }
      ></Tab>
    </Tabs>
  );
}
