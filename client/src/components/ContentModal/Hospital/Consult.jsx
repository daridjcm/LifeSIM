import React, { useEffect, useState } from 'react';
import {
  CheckboxGroup,
  Select,
  SelectItem,
  Slider,
  Spinner,
} from '@heroui/react';
import CustomButton from '../../CustomButton';
import { symptoms, diseases } from '../../../utils/data';
import { useUser } from '../../../context/UserContext.jsx';
import { useAlert } from '../../../context/AlertContext.jsx';
import handleDownload from '../../SavePDF.jsx';
import { useAppointment } from '../../../context/AppointmentContext.jsx';
import CustomCheckbox from './CustomCheckbox.jsx';
import { doctors } from '../../../utils/data';

const symptomCategories = symptoms;

// Select symptoms
const Symptoms = ({ onProgressChange, onSymptomsChange }) => {
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [groupSelected, setGroupSelected] = useState([]);

  const symptomsList = selectedSystem
    ? symptomCategories[selectedSystem] || []
    : [];

  useEffect(() => {
    const newProgress = groupSelected.length > 5 ? 30 : 0;
    onProgressChange(newProgress);
    onSymptomsChange(groupSelected);
  }, [groupSelected, onProgressChange, onSymptomsChange]);

  return (
    <div className='flex flex-col gap-6 w-full mx-auto'>
      <p className='text-xl font-semibold'>Describe your symptoms</p>

      <Select
        label='Select body system'
        placeholder='Choose a system'
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
        <div className='border p-4 rounded-xl shadow'>
          <h2 className='text-lg font-medium mb-2'>{selectedSystem}</h2>
          <CheckboxGroup
            className='flex flex-wrap gap-2'
            label={`Select symptoms for ${selectedSystem}`}
            orientation='horizontal'
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
          <p className='mt-4 ml-1 text-default-500'>
            Symptoms: {groupSelected.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

// Send report to the server
const SendReport = ({ diseaseDetected, selectedSymptoms }) => {
  const { nextAppointment, fetchAppointments } = useAppointment();
  const { user } = useUser();
  const [diseases, setDiseaseDetected] = useState(diseaseDetected);
  const { showAlert } = useAlert();

  useEffect(() => {
    if (user?.id) {
      fetchAppointments(user?.id);
      console.log(nextAppointment);
    }
  }, [nextAppointment]);

  const handleSendReport = async () => {
    setDiseaseDetected(diseaseDetected);
    const reportData = {
      appointment_id: nextAppointment.id,
      user_id: nextAppointment.user_id,
      doctor: nextAppointment.doctor,
      system: diseases.system,
      disease: diseases.name,
      severity: diseases.severity,
      status: 'completed',
      treatments: diseases.treatments.map((treatment) => treatment),
      symptoms: diseases.symptoms.map((symptom) => symptom).join(', '),
    };

    try {
      // Send report data
      const reportResponse = await fetch(
        'http://localhost:3000/api/appointments/report',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reportData),
        },
      );

      // Update appointment status
      const statusResponse = await fetch(
        `http://localhost:3000/api/appointments/${nextAppointment.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'completed' }),
        },
      );

      const reportResult = await reportResponse.json();
      const statusResult = await statusResponse.json();

      if (reportResponse.ok && statusResponse.ok) {
        showAlert(
          'Downloading Report',
          'Please wait while the report is being downloaded.',
        );
        handleDownload('HealthReport', reportData, user);
      } else {
        console.error(reportResult.error || statusResult.error);
        showAlert('Error', reportResult.error || statusResult.error);
      }
    } catch (error) {
      console.error('Error sending report:', error);
      showAlert('Error', 'An error occurred while sending the report.');
    }
  };

  return (
    <CustomButton
      label='Download and send Report 🖨️'
      className='mt-5'
      onPress={handleSendReport}
    />
  );
};

// Evaluate the diagnosis and symptoms to determine the disease
const Diagnosis = ({ onProgressChange, symptoms, matchedDiseases }) => {
  const [loading, setLoading] = useState(true);
  const { nextAppointment } = useAppointment();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      onProgressChange(70);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onProgressChange]);

  const handleDoctor = () => {
    if (!nextAppointment) return '/images/default-doctor.svg';
    const doctor = doctors.find((doc) => doc.name === nextAppointment.doctor);
    return doctor ? doctor.img[0] : '/images/default-doctor.svg';
  };

  if (loading) {
    return (
      <div className='flex sm:flex-col md:flex-col lg:flex-row items-center text-center'>
        {handleDoctor && <img src={handleDoctor} alt='Doctor' />}
        <div className='flex flex-col text-4xl'>
          Evaluating your health and the diagnosis
          <Spinner
            classNames={{ label: 'text-foreground mt-4' }}
            variant='wave'
          />
        </div>
      </div>
    );
  }

  return (
    <div className='p-5'>
      <h2 className='text-3xl font-semibold mb-4'>Diagnosis of Disease</h2>
      {matchedDiseases.length > 0 ? (
        <ul className='space-y-4'>
          {matchedDiseases.map((disease) => (
            <div
              key={disease.id}
              className='bg-primary rounded-md p-4 text-white shadow-md'
            >
              <li className='text-2xl font-bold'>{disease.system}</li>
              <li className='text-xl'>Disease: {disease.name}</li>
              <li
                className={`text-lg ${disease.severity === 'severe' ? 'text-red-500' : 'text-amber-500'}`}
              >
                Severity: {disease.severity}
              </li>
              {disease.symptoms && disease.symptoms.length > 0 && (
                <div className='mt-2'>
                  <p className='text-lg font-semibold'>Symptoms:</p>
                  <ul className='list-disc list-inside'>
                    {disease.symptoms.map((symptom, index) => (
                      <li key={index} className='text-white'>
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
          <SendReport
            diseaseDetected={matchedDiseases[0]}
            selectedSymptoms={symptoms}
          />
        </ul>
      ) : (
        <p className='text-lg'>
          No diseases matched your symptoms. Please check your symptoms and add
          it.
        </p>
      )}
    </div>
  );
};

// Render the content
export default function Content() {
  const [progress, setProgress] = useState(0);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [matchedDiseases, setMatchedDiseases] = useState([]);
  const { nextAppointment, fetchAppointments } = useAppointment();
  const { user } = useUser();

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

  useEffect(() => {
    if (user?.id) {
      fetchAppointments(user?.id);
      console.log(nextAppointment);
      console.log(fetchAppointments(user?.id));
    }
  }, [user?.id]);
  // convert nextAppointment to variable useState global.
  if (nextAppointment) {
    return (
      <>
        <Slider
          value={progress}
          getValue={(p) => `${p} of 100%`}
          label='Progress Appointment'
          maxValue={100}
          size='sm'
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
            label='Next Step'
            className='mt-5'
            onPress={handleNextStep}
          />
        )}
      </>
    );
  } else {
    return (
      <div>
        Your health cannot be taken care of because it is not yet time. Please
        check the health record or schedule an appointment.
      </div>
    );
  }
}
