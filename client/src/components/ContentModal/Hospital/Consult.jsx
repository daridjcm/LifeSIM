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
  }, [user?.id]);

  const date = new Date();
  const dateFormat = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const handleSendReport = async () => {
    setDiseaseDetected(diseaseDetected);
    const reportData = {
      dateEntered: dateFormat,
      date: nextAppointment.date,
      time: nextAppointment.time,
      appointment_id: nextAppointment.id,
      user_id: nextAppointment.user_id,
      doctor: nextAppointment.doctor,
      system: diseases.system,
      disease: diseases.name,
      severity: diseases.severity,
      status: 'completed',
      treatments: diseases.treatments.map((treatment) => treatment),
      symptoms: diseases.symptoms.map((symptom) => symptom).join(', '),
      notes: diseases.notes || 'N/A',
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

  const enrichedAppointment = nextAppointment
    ? {
        ...nextAppointment,
        doctorData: doctors.find(
          (doc) =>
            doc.name === nextAppointment.doctor &&
            doc.title === nextAppointment.title,
        ),
      }
    : null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      onProgressChange(70);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onProgressChange]);

  if (loading) {
    return (
      <div className='flex sm:flex-col md:flex-col lg:flex-row items-center text-center'>
        {enrichedAppointment && enrichedAppointment.doctorData && (
          <div className='flex items-center gap-4'>
            <img
              src={enrichedAppointment.doctorData.img[0]}
              alt={enrichedAppointment.doctorData.name}
            />
          </div>
        )}
        Evaluating your health and the diagnosis 🤔
        <Spinner
          classNames={{ label: 'flex items-center gap-2 text-foreground' }}
          color='primary'
          variant='simple'
          size='lg'
        />
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
  const { nextAppointment } = useAppointment();
  const [isWithinTimeWindow, setIsWithinTimeWindow] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null); // ⏳ countdown state

  const { showAlert } = useAlert();

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
    if (nextAppointment?.dateObj) {
      const appointmentTime = new Date(nextAppointment.dateObj).getTime();
      const currentTime = new Date().getTime();
      const timeDifference = appointmentTime - currentTime;

      if (isNaN(timeDifference)) {
        showAlert('Error ❌', 'Invalid appointment time.');
        return;
      }

      let countdownInterval;
      let openTimer;
      let cancelTimer;

      if (timeDifference > 0) {
        countdownInterval = setInterval(() => {
          const now = new Date().getTime();
          const diff = appointmentTime - now;

          if (diff <= 0) {
            clearInterval(countdownInterval);
            setTimeLeft('The appointment is starting...');
          } else {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
          }
        }, 1000);

        const openTime = timeDifference - 5 * 60 * 1000;
        if (openTime > 0) {
          openTimer = setTimeout(() => {
            showAlert('✅', 'The appointment room is now open. You may enter.');
            setIsWithinTimeWindow(true);
          }, openTime);
        } else {
          setIsWithinTimeWindow(true);
        }

        cancelTimer = setTimeout(
          async () => {
            if (!isInConsultation) {
              showAlert(
                '🚫',
                'The appointment was canceled because you entered too late (more than 1 min after the start).',
              );

              await fetch(
                `http://localhost:3000/api/appointments/${nextAppointment.id}`,
                {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ status: 'canceled' }),
                },
              );

              setIsWithinTimeWindow(false);
            }
          },
          timeDifference + 1 * 60 * 1000,
        );
      } else {
        if (currentTime - appointmentTime <= 1 * 60 * 1000) {
          showAlert('✅', 'The appointment has started. You may enter now.');
          setIsWithinTimeWindow(true);
        } else {
          showAlert(
            '🚫',
            'The appointment was canceled because the time limit expired.',
          );
          setIsWithinTimeWindow(false);
        }
      }

      return () => {
        clearInterval(countdownInterval);
        clearTimeout(openTimer);
        clearTimeout(cancelTimer);
      };
    } else {
      showAlert('Warning ⚠️', 'No appointment found.');
      setIsWithinTimeWindow(false);
    }
  }, [nextAppointment]);

  if (nextAppointment && isWithinTimeWindow) {
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
      <div className='text-center mt-10'>
        {nextAppointment ? (
          // ✅ Appointment is starting → show countdown
          timeLeft && (
            <p className='text-lg font-bold mt-4 text-blue-600'>
              ⏳ Next appointment starts in:{' '}
              <span className='font-bold bg-blue-600 text-white rounded-md px-2 py-1'>
                {timeLeft}
              </span>
            </p>
          )
        ) : (
          // ❌ No appointment → show message
          <p>
            Do you have an appointment scheduled? Please check the health record
            or schedule an appointment. You must assist before 5 minutes of the
            time scheduled or the appointment will be canceled.
          </p>
        )}
      </div>
    );
  }
}
