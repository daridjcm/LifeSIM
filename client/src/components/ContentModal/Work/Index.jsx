import { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@heroui/react';
import PorcentageTasks from '../../PorcentageTasks.jsx';
import PhoneCorporative from './PhoneCorporative.jsx';
import CustomButton from '../../CustomButton.jsx';
import { useUser } from '../../../context/UserContext.jsx';
import { useAlert } from '../../../context/AlertContext.jsx';

export default function Index() {
  const { user } = useUser();
  const [values, setValues] = useState([]);

  const signatureHabilitated = () => {
    if (values.length >= 6) {
      return true;
    } else {
      return false;
    }
  };
  // Render the dashboard to Work
  return (
    <>
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
        <div className="w-full bg-slate-100 rounded p-4 lg:col-span-1">
          <p className="text-xl font-bold">How start your job daily</p>
          <ul className="list-decimal list-inside flex flex-col gap-4">
            <li>Chat with the Boss to talk her about the tasks today 📞 </li>
            <li>
              Add customers in the table of calls according to the CSV file that
              has been given to you by the boss 💁
            </li>
            <li>
              Signature for confirming that you have completed your tasks, this
              will generate a report for the boss and it will send to him.
            </li>
            <li>
              Type you to Analia when you has been completed the tasks to notify
              that you will close your work per today
            </li>
          </ul>
        </div>

        <div className="w-full bg-slate-100 rounded p-4 lg:col-span-1">
          <p className="text-xl font-bold">Tasks Today</p>
          <hr />
          <CheckboxGroup
            className="flex flex-col gap-2"
            size="md"
            color="success"
            defaultValue={values}
            onChange={(newValues) => {
              setValues(newValues);
              console.log(values);
            }}
            label="Complete the tasks today"
            orientation="horizontal"
            isDisabled={true}
            id="tasksList"
          >
            <Checkbox value="task1">
              Type with the Boss in your phone corporative 📞
            </Checkbox>
            <Checkbox value="task2">
              Check the file that the boss gave you today 📄
            </Checkbox>
            <Checkbox value="task3">
              Add new customers according to the CSV file and enter it in the
              table of calls 💁
            </Checkbox>
            <Checkbox value="task4">
              Make inform in computer (signature) 💻
            </Checkbox>
            <Checkbox value="task5">
              Please signature to confirm that you have completed your tasks
              before writing to Analia
            </Checkbox>
            <Checkbox value="task6">
              Type to Analia when you have finished the tasks ✅
            </Checkbox>
          </CheckboxGroup>
          {/* </div> */}
        </div>

        <div className="w-full bg-slate-100 rounded p-4 lg:col-span-1">
          <p className="text-xl font-bold">Phone Corporative</p>
          <hr />
          <PhoneCorporative />
        </div>
      </div>

      <div className="w-full bg-slate-100 rounded p-4 mt-4">
        <p className="text-xl font-bold">Report Day</p>
        <div className="flex flex-row gap-2">
          <p>Signature here to confirm your job today.</p>
          <PorcentageTasks value={35} />
        </div>
        {values.length >= 6 ? (
          <SignatureForm username={user.username} />
        ) : (
          '(You need to complete all the tasks to signature your job today) ✅'
        )}
      </div>
    </>
  );
}

function SignatureForm({ username }) {
  const { showAlert } = useAlert();
  const [signatureInput, setSignatureInput] = useState('');
  const [submitSignature, setSubmitSignature] = useState(false);

  const handleSubmit = () => {
    const isMatch = signatureInput.trim() === username;
    setSubmitSignature(isMatch);
    if (isMatch) {
      showAlert('Signature submitted successfully!');
    } else {
      showAlert('Signature does not match your username.');
    }
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        value={signatureInput}
        onChange={(e) => setSignatureInput(e.target.value)}
        placeholder="Type your username"
        className="border-2 w-full px-2 py-1 rounded transition-all duration-200 hover:border-green-500 focus:border-green-500 border-slate-300 focus:outline-none focus:ring-1 focus:ring-green-500"
      />
      <div className="mt-2">
        <CustomButton
          label="Submit"
          onPress={handleSubmit}
          isLoading={false}
          loadingText={'Submitting signature to boss...'}
          id="submitSignature"
        />
      </div>
    </div>
  );
}
