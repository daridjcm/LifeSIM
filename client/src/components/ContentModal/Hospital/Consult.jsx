import React, {useEffect, useState} from "react";
import {useCheckbox, CheckboxGroup, Chip, VisuallyHidden, Select, SelectItem, Slider, tv} from "@heroui/react";
import {CheckCircleIcon} from "@heroicons/react/24/solid";

export const CustomCheckbox = (props) => {
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

  const {children, isSelected, isFocusVisible, getBaseProps, getLabelProps, getInputProps} =
    useCheckbox({
      ...props,
    });

  const styles = checkbox({isSelected, isFocusVisible});

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
        startContent={isSelected ? <CheckCircleIcon className="size-5 text-white" /> : null}
        variant="faded"
        {...getLabelProps()}
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
};

export function Symptoms({ onProgressChange }) {
  // TODO: pass symptomCategories for json or js for use it like API
  const symptomCategories = {
    "Respiratory System": [
      "cough", "runny nose", "sore throat", "shortness of breath", "sneezing",
      "wheezing", "chest pain", "hoarseness", "difficulty breathing", "persistent cough",
      "coughing up blood", "rapid breathing", "stridor", "fatigue", "mild fever"
    ],
    "Digestive System": [
      "nausea", "vomiting", "abdominal pain", "diarrhea", "constipation",
      "indigestion", "bloating", "heartburn", "loss of appetite", "weight loss",
      "gas", "regurgitation", "abdominal cramps", "bloody diarrhea", "feeling full quickly"
    ],
    "Urinary System": [
      "frequent urination", "burning urination", "cloudy urine", "strong-smelling urine",
      "pelvic pain", "painful urination", "urgency", "blood in urine", "lower abdominal pain",
      "flank pain", "incomplete bladder emptying", "intermittent urine flow", "back pain",
      "nocturia", "urinary retention"
    ],
    "Nervous System": [
      "headaches", "dizziness", "confusion", "blurred vision", "loss of consciousness",
      "seizures", "numbness in limbs", "coordination issues", "memory problems", "fatigue",
      "mood swings", "muscle weakness", "speech difficulty", "tremors", "tingling"
    ],
    "Integumentary System": [
      "rash", "itching", "dry skin", "skin irritation", "cracked skin", "flaking",
      "bleeding from lesion", "new skin growth", "red patches", "thickened nails",
      "skin peeling", "bumps or nodules", "discoloration", "skin pain", "hair loss"
    ],
    "Cardiovascular System": [
      "chest pain", "shortness of breath", "fatigue", "swelling in legs",
      "irregular heartbeat", "numbness", "cold extremities", "pale skin",
      "rapid heartbeat", "weak pulse", "bluish skin", "fainting", "high blood pressure",
      "low blood pressure", "slow healing wounds"
    ],
    "Endocrine System": [
      "fatigue", "weight gain", "weight loss", "dry skin", "hair loss", "cold sensitivity",
      "heat sensitivity", "mood swings", "depression", "irritability", "irregular periods",
      "slow heart rate", "increased hunger", "increased thirst", "frequent urination"
    ],
    "Skeletal System": [
      "joint pain", "bone pain", "swelling", "limited mobility", "stiffness", "fractures",
      "curved spine", "reduced height", "back pain", "weak bones", "tenderness", "joint deformity",
      "cracking joints", "numbness", "tingling"
    ],
    "Musculoskeletal System": [
      "muscle pain", "joint swelling", "stiffness", "fatigue", "weakness", "inflammation",
      "limited movement", "muscle cramps", "joint deformity", "bone aches", "reduced flexibility",
      "joint instability", "tendon pain", "muscle twitching", "loss of balance"
    ],
    "Mental Health": [
      "depression", "anxiety", "mood swings", "insomnia", "social withdrawal", "fatigue",
      "restlessness", "irritability", "concentration problems", "low self-esteem", "hopelessness",
      "suicidal thoughts", "excessive worry", "panic attacks", "lack of motivation"
    ],
    "Visual System": [
      "vision loss", "blurry vision", "light sensitivity", "double vision", "eye strain",
      "dry eyes", "halos around lights", "red eyes", "itchy eyes", "floaters", "trouble seeing at night",
      "color vision deficiency", "shadow over vision", "swollen eyelids", "difficulty focusing"
    ],
    "Immune System": [
      "frequent infections", "fatigue", "fever", "swollen lymph nodes", "rash", "inflammation",
      "autoimmune flares", "chronic illness", "sore throat", "painful joints", "swelling", "itchy eyes",
      "red skin", "cough", "digestive problems"
    ],
    "Pediatrics": [
      "fever", "irritability", "crying", "loss of appetite", "diarrhea", "vomiting", "rash",
      "trouble sleeping", "cough", "runny nose", "fatigue", "lethargy", "abdominal pain",
      "ear pain", "congestion"
    ],
    "Oncology": [
      "weight loss", "fatigue", "persistent cough", "lump", "bleeding", "pain",
      "night sweats", "loss of appetite", "fever", "skin changes", "unusual discharge",
      "change in bowel habits", "neurological symptoms", "jaundice", "persistent infections"
    ]
  };
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [groupSelected, setGroupSelected] = useState([]);

  const symptoms = selectedSystem ? symptomCategories[selectedSystem] || [] : [];

  useEffect(() => {
    const newProgress = groupSelected.length >= 3 ? 30 : 0;
    onProgressChange(newProgress);
  }, [groupSelected, onProgressChange]);

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

export default function Content() {
  const [progress, setProgress] = useState(0);

  return(
    <>
      <Slider
       value={progress}
       getValue={(p) => `${p} of 100%`}
       label="Progress Appointment"
       maxValue={100}
       size="sm"
      />

      <Symptoms onProgressChange={setProgress} />
    </>
  )
}
