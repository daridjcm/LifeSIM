import React from "react";
import { Tabs, Tab } from "@heroui/react";
import {
  CalendarDateRangeIcon,
  ClockIcon,
  ClipboardDocumentListIcon,
  UserIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";
import MedicalAppointments from "./MedicalAppointments.jsx";
import Patient from "./Patient.jsx";
import HealthRecord from "./HealthRecord.jsx";
import PillsReceted from "./PillsReceted.jsx"

export default function ContentBank() {
  const [selected, setSelected] = React.useState("medicalappointments");

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
        key="medicalappointments"
        title={
          <div className="flex items-center space-x-2">
            <CalendarDateRangeIcon className="size-6" />
            <span>Medical Appointments</span>
          </div>
        }
      >
        <MedicalAppointments/>
      </Tab>
      <Tab
        key="healthrecord"
        title={
          <div className="flex items-center space-x-2">
            <ClockIcon className="size-6" />
            <span>Health Record</span>
          </div>
        }
      >
        <HealthRecord />
      </Tab>
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
      >
        <Patient />
      </Tab>
      <Tab
        key="pillsreceted"
        title={
          <div className="flex items-center space-x-2">
            <ClipboardDocumentCheckIcon className="size-6" />
            <span>Pills Receted</span>
          </div>
        }
      >
        <PillsReceted />
      </Tab>
    </Tabs>
  );
}
