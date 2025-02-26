import { useState } from "react";
import { Checkbox } from "@heroui/react";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import PorcentageTasks from "../../PorcentageTasks.jsx";
import PhoneCorporative from "./PhoneCorporative.jsx";
import CustomButton from "../../CustomButton.jsx";

export default function ContentWork() {
  const [submitSignature, setSubmitSignature] = useState(false);

  return (
    <>
      <div className="flex flex-row justify-around mb-8">
        <p>Profession:</p>
        <p>Work Experience (years):</p>
        <p>Company:</p>
        <p className="flex items-center gap-1">Money earned per day <BanknotesIcon className="size-5" />
          <span id="moneyPerDay" className="text-green-500">($0)</span>
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
        <div className="w-full bg-slate-100 rounded p-4 lg:col-span-1">
          <p className="text-xl font-bold">How start your job daily</p>
          <ul className="list-decimal list-inside">
            <li>Chat with the Boss to talk her about the tasks today 📞 </li>
            <li>Add customers in the table of calls according to the excel file that has been given to you by the boss 💁</li>
            <li>Signature for confirming that you have completed your tasks, this will generate a report for the boss and it will send to him.</li>
            <li>Type you to Analia when you has been completed the tasks to notify that you will close your work per today</li>
          </ul>
        </div>

        <div className="w-full bg-slate-100 rounded p-4 lg:col-span-1">
          <p className="text-xl font-bold">Tasks Today</p>
          <hr />
          <div className="flex flex-col gap-2 mt-4">
            <Checkbox id="task2" color="success" size="md">
              Type with the Boss 📞
            </Checkbox>
            <Checkbox id="task3" color="success" size="md">
              Check the file that the boss gave you today 📄
            </Checkbox>
            <Checkbox id="task4" color="success" size="md">
              Add new customers according to the excel file and enter it in the table of calls 💁
            </Checkbox>
            <Checkbox id="task1" color="success" size="md">
              Make inform in computer (signature) 💻
            </Checkbox>
            <Checkbox id="task5" color="success" size="md">
              Please signature to confirm that you have completed your tasks before writing to Analia
            </Checkbox>
            <Checkbox id="task6" color="success" size="md">
              Type to Analia when you have finished the tasks ✅
            </Checkbox>
          </div>
        </div>

        <div className="w-full bg-slate-100 rounded p-4 lg:col-span-1">
          <p className="text-xl font-bold">Phone Corporative</p>
          <hr />
          <PhoneCorporative />
        </div>
      </div>

      <div className="w-full bg-slate-100 rounded p-4 mt-4">
        <p className="text-xl font-bold">Tasks assigned by your Boss</p>
        <ul id="tasksList" className="list-none list-inside hidden">
          <li>
            Check excel file with the customers and later, add them to the table of calls <PorcentageTasks value={40} />
          </li>
          Signature in here to confirm your job today. <PorcentageTasks value={35} />
          <br />
          <li>
            <input type="text" name="CheckSignature" id="checkSignature" className="border-2 mt-1 mb-3 ml-2 w-full px-2 py-1 rounded transition-all duration-200 hover:border-green-500 focus:border-green-500 border-slate-300 focus:outline-none focus:ring-1 focus:ring-green-500" placeholder="Type your username" />
          </li>
          <li>
            Notify Analia about the tasks you have finished <PorcentageTasks value={25} />
          </li>
        </ul>
        <CustomButton label='Submit' onPress={() => { 
          let valueSaved = document.getElementById('checkSignature').value;
          valueSaved === user.username ? setSubmitSignature(true) : setSubmitSignature(false);
        }} isLoading={false} loadingText={'Submitting signature to boss...'} id='submitSignature' />
      </div>
    </>
  );
}
