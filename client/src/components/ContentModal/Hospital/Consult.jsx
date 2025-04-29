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
import { symptoms, doctors, diseases } from "../../../utils/data";

// Symptoms data in JSON format
const symptomCategories = symptoms;

export function Symptoms({ onProgressChange, onSymptomsChange }) {
  const CustomCheckbox = (props) => {
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
      children,
      isSelected,
      isFocusVisible,
      getBaseProps,
      getLabelProps,
      getInputProps,
    } = useCheckbox({
      ...props,
    });

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
            isSelected ? (
              <CheckCircleIcon className="size-5 text-white" />
            ) : null
          }
          variant="faded"
          {...getLabelProps()}
        >
          {children ? children : isSelected ? "Enabled" : "Disabled"}
        </Chip>
      </label>
    );
  };

  const [selectedSystem, setSelectedSystem] = useState(null);
  const [groupSelected, setGroupSelected] = useState([]);

  const symptoms = selectedSystem
    ? symptomCategories[selectedSystem] || []
    : [];

  useEffect(() => {
    const newProgress = groupSelected.length >= 3 ? 30 : 0;
    onProgressChange(newProgress);
    onSymptomsChange(groupSelected);
  }, [groupSelected, onProgressChange, onSymptomsChange]);

  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      <p className="text-xl font-semibold">Describe your symptoms</p>

      {/* SYSTEM SELECTOR */}
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

      {/* SYMPTOM CHIPS */}
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
            {symptoms.map((symptom) => (
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
}

function Diagnosis({ symptoms }) {
  const [appointments, setAppointments] = useState([]);
  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/appointments");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setAppointments(data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      showAlert("Failed to retrieve appointments.");
    }
  };

  function timeToMinutes(time) {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  appointments.sort((a, b) => {
    if (a.doctor !== b.doctor) {
      return a.doctor.localeCompare(b.doctor);
    } else {
      return timeToMinutes(a.time) - timeToMinutes(b.time);
    }
  });

  console.log("Diagnosis symptoms:", symptoms);
  console.log("Appointments:", appointments);
  if (symptoms.length) {
    // TODO: Perform the functionality to verify the doctor's name and search the image.
    return (
      <div className="flex sm:flex-col md:flex-col lg:flex-row items-center text-center">
        <img src="/images/doctors/OliviaMartinez-full.svg" />

        <div className="flex flex-col text-4xl">
          Evaluating your health and the diagnosis
          <Spinner
            classNames={{ label: "text-foreground mt-4" }}
            variant="wave"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        You have not chosen the symptoms, your health cannot be assessed.
      </div>
    );
  }
}

export default function Content() {
  const [progress, setProgress] = useState(0);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [showDiagnosis, setShowDiagnosis] = useState(false);

  const handleNextStep = () => {
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

      {/* Show Symptoms or Diagnosis based on state */}
      {!showDiagnosis ? (
        <Symptoms
          onProgressChange={setProgress}
          onSymptomsChange={setSelectedSymptoms} // Pass the selected symptoms here
        />
      ) : (
        <Diagnosis symptoms={selectedSymptoms} />
      )}

      {progress === 30 && !showDiagnosis && (
        <CustomButton
          label="Next Step"
          className="mt-5"
          onPress={() => {
            // Filtrar enfermedades que tienen al menos 3 síntomas coincidentes
            const matchedDiseases = diseases.filter((disease) => {
              const matchingSymptoms = disease.symptoms.filter((symptom) =>
                selectedSymptoms.includes(symptom),
              );
              return matchingSymptoms.length >= 3; // Al menos 3 síntomas coincidentes
            });

            // Mostrar enfermedades coincidentes o manejar de acuerdo
            console.log("Matched Diseases:", matchedDiseases);
          }}
        />
      )}
    </>
  );
}
