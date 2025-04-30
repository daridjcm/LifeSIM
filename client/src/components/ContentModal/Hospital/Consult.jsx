import React, { useEffect, useState } from "react";
import {
  useCheckbox,
  CheckboxGroup,
  Chip,
  VisuallyHidden,
  Select,
  SelectItem,
  Slider,
  tv,
  Spinner,
} from "@heroui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import CustomButton from "../../CustomButton";
import { symptoms, diseases } from "../../../utils/data";
import { useUser } from "../../../context/UserContext.jsx";
import { useAlert } from "../../../context/AlertContext.jsx";

const symptomCategories = symptoms;

const CustomCheckbox = ({ children, ...props }) => {
  const checkbox = tv({
    slots: {
      base: "border-default hover:bg-default-200",
      content: "text-default-500",
    },
    variants: {
      isSelected: {
        true: {
          base: "border-primary bg-primary hover:bg-primary-500 hover:border-primary-500",
          content: "text-primary-foreground pl-1",
        },
      },
      isFocusVisible: {
        true: {
          base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
        },
      },
    },
  });

  const {
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({ ...props });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color="primary"
        startContent={
          isSelected ? <CheckCircleIcon className="size-5 text-white" /> : null
        }
        variant="faded"
        {...getLabelProps()}
      >
        {children || (isSelected ? "Enabled" : "Disabled")}
      </Chip>
    </label>
  );
};

const Symptoms = ({ onProgressChange, onSymptomsChange }) => {
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [groupSelected, setGroupSelected] = useState([]);

  const symptomsList = selectedSystem
    ? symptomCategories[selectedSystem] || []
    : [];

  useEffect(() => {
    const newProgress = groupSelected.length >= 4 ? 30 : 0;
    onProgressChange(newProgress);
    onSymptomsChange(groupSelected);
  }, [groupSelected, onProgressChange, onSymptomsChange]);

  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      <p className="text-xl font-semibold">Describe your symptoms</p>

      <Select
        label="Select body system"
        placeholder="Choose a system"
        selectedKeys={selectedSystem ? [selectedSystem] : []}
        onSelectionChange={(keys) => {
          const system = Array.from(keys)[0];
          setSelectedSystem(system);
          setGroupSelected([]); // reset when system changes
        }}
      >
        {Object.keys(symptomCategories).map((system) => (
          <SelectItem key={system}>{system}</SelectItem>
        ))}
      </Select>

      {selectedSystem && (
        <div className="border p-4 rounded-xl shadow">
          <h2 className="text-lg font-medium mb-2">{selectedSystem}</h2>
          <CheckboxGroup
            className="flex flex-wrap gap-2"
            label={`Select symptoms for ${selectedSystem}`}
            orientation="horizontal"
            value={groupSelected}
            onChange={(newValues) => {
              if (newValues.length <= 7) {
                setGroupSelected(newValues);
              }
            }}
          >
            {symptomsList.map((symptom) => (
              <CustomCheckbox
                key={symptom}
                value={symptom}
                disabled={
                  groupSelected.length >= 10 && !groupSelected.includes(symptom)
                }
              >
                {symptom.charAt(0).toUpperCase() + symptom.slice(1)}
              </CustomCheckbox>
            ))}
          </CheckboxGroup>
          <p className="mt-4 ml-1 text-default-500">
            Symptoms: {groupSelected.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

const SendReport = ({ diseaseDetected }) => {
  const { user } = useUser();
  const [nextAppointment, setNextAppointment] = useState([]);
  const [diseases, setDiseaseDetected] = useState(diseaseDetected);
  const { showAlert } = useAlert();
  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/appointments");
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      const userAppointments = data.appointments.filter(
        (appt) => appt.user_id === user?.id,
      );

      console.log("User  Appointments:", userAppointments); // Log user appointments

      const now = new Date();
      const upcoming = userAppointments
        .map((appt) => ({
          ...appt,
          dateObj: new Date(`${appt.date}T${appt.time}Z`),
        }))
        .filter(
          (appt) =>
            new Date(appt.dateObj) > now &&
            !["canceled", "completed"].includes(appt.status),
        )
        .sort((a, b) => new Date(a.dateObj) - new Date(b.dateObj));
      // todo: changes logic to handle multiple appointments or one appointment.
      setNextAppointment(upcoming[0] || null);
      console.log(nextAppointment); // Log upcoming appointments
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchAppointments();
    }
  }, [user]);

  const handleSendReport = async () => {
    console.log("Next Appointment:", nextAppointment); // Log the next appointment

    if (!nextAppointment) {
      showAlert("Error", "No upcoming appointment found.");
    }

    const reportData = {
      user_id: nextAppointment.user_id,
      doctor: nextAppointment.doctor,
      appointment_id: nextAppointment.id,
      disease: diseases.name,
      status: "completed",
      treatments: diseaseDetected.treatments
        .map((treatment) => treatment.pill_name)
        .join(", "), // Join treatment names into a string
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/appointments/report",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reportData),
        },
      );

      const result = await response.json();
      if (response.ok) {
        showAlert("Success", result.message);
      } else {
        console.error(result.error);
        showAlert("Error", "Failed to send report to the server.");
      }
    } catch (error) {
      console.error("Error sending report:", error);
      showAlert("Error", "An error occurred while sending the report.");
    }
  };

  return (
    <CustomButton
      label="Download and send Report 🖨️"
      className="mt-5"
      onPress={handleSendReport}
    />
  );
};

const Diagnosis = ({ onProgressChange, symptoms, matchedDiseases }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      onProgressChange(70);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onProgressChange]);

  if (loading) {
    return (
      <div className="flex sm:flex-col md:flex-col lg:flex-row items-center text-center">
        <img src="/images/doctors/OliviaMartinez-full.svg" alt="Doctor" />
        <div className="flex flex-col text-4xl">
          Evaluating your health and the diagnosis
          <Spinner
            classNames={{ label: "text-foreground mt-4" }}
            variant="wave"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-3xl font-semibold mb-4">Diagnosis of Disease</h2>
      {matchedDiseases.length > 0 ? (
        <ul className="space-y-4">
          {matchedDiseases.map((disease) => (
            <div
              key={disease.name}
              className="bg-primary rounded-md p-4 text-white shadow-md"
            >
              <li className="text-2xl font-bold">{disease.system}</li>
              <li className="text-xl">Disease: {disease.name}</li>
              <li
                className={`text-lg ${disease.severity === "severe" ? "text-red-500" : "text-amber-500"}`}
              >
                Severity: {disease.severity}
              </li>
              {disease.symptoms && disease.symptoms.length > 0 && (
                <div className="mt-2">
                  <p className="text-lg font-semibold">Symptoms:</p>
                  <ul className="list-disc list-inside">
                    {disease.symptoms.map((symptom, index) => (
                      <li key={index} className="text-white">
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
          <SendReport diseaseDetected={matchedDiseases[0]} />
        </ul>
      ) : (
        <p className="text-lg">
          No diseases matched your symptoms. Please check your symptoms and add
          it.
        </p>
      )}
    </div>
  );
};

export default function Content() {
  const [progress, setProgress] = useState(0);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [matchedDiseases, setMatchedDiseases] = useState([]);

  const handleNextStep = () => {
    const diseasesMatched = diseases.filter((disease) => {
      const matchingSymptoms = disease.symptoms.filter((symptom) =>
        selectedSymptoms.includes(symptom),
      );
      return matchingSymptoms.length >= 4;
    });
    setMatchedDiseases(diseasesMatched);
    setShowDiagnosis(true);
  };

  return (
    <>
      <Slider
        value={progress}
        getValue={(p) => `${p} of 100%`}
        label="Progress Appointment"
        maxValue={100}
        size="sm"
      />

      {!showDiagnosis ? (
        <Symptoms
          onProgressChange={setProgress}
          onSymptomsChange={setSelectedSymptoms}
        />
      ) : (
        <Diagnosis
          onProgressChange={setProgress}
          symptoms={selectedSymptoms}
          matchedDiseases={matchedDiseases}
        />
      )}

      {progress > 0 && !showDiagnosis && (
        <CustomButton
          label="Next Step"
          className="mt-5"
          onPress={handleNextStep}
        />
      )}
    </>
  );
}
