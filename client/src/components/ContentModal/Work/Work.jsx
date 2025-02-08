import { Checkbox } from "@heroui/react";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import PorcentageTasks from "../../PorcentageTasks";
import PhoneCorporative from "./PhoneCorporative";

export default function ContentWork() {
  return (
    <>
      <div className="flex flex-col mb-8">
        <p>Profession:</p>
        <p>Work Experience (years):</p>
        <p>Company:</p>
        <p className="flex items-center gap-1">Money earned per day <BanknotesIcon className="size-5" />
          <span id="moneyPerDay" className="text-green-500">($0)</span>
        </p>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <section className="bg-slate-100 rounded p-4">
          <p className="text-xl font-bold">How start your job daily</p>
          <ul className="list-decimal list-inside">
            <li>Call Boss to talk her about the tasks today 📞 </li>
            <li>Make inform in computer 💻</li>
            <li>Type you to Analia  when you has been completed the tasks to notify that you will close your work per today</li>
          </ul>
        </section>
        <section className="bg-slate-100 rounded p-4">
          <p className="text-xl font-bold">Tasks Today</p>
          <hr />
          <div className="flex flex-col gap-2 mt-4">
            <Checkbox id="task1" color="success" size="md">
              Make inform in computer 💻
            </Checkbox>
            <Checkbox id="task2" color="success" size="md">
              Assistance the customers 💁
            </Checkbox>
            <Checkbox id="task3" color="success" size="md">
              Messange to Analia 📝
            </Checkbox>
          </div>
        </section>
        <section className="bg-slate-100 rounded p-4">
          <p className="text-xl font-bold">Phone Corporative</p>
          <hr />
            <PhoneCorporative />
        </section>
      </div>
        <section className="bg-slate-100 rounded p-4 w-full mt-5">
          <p className="text-xl font-bold">Tasks assigned by your Boss</p>
          <ul id="tasksList" className="list-decimal list-inside hidden">
            <li>
              Check list of clients and call them <PorcentageTasks value={15} />
            </li>
            <li>
              Once you have spoken to them, confirm their attendance in the excel file or modal table <PorcentageTasks value={30} />
            </li>
            <li>
              You make the inform in an Word file or modal. Save the changes and go away <PorcentageTasks value={15} />
            </li>
            <li>
              Signature in here to confirm your job today <PorcentageTasks value={25} />
              <br />
              <input type="text" name="CheckSignature" id="checkSignature" className="border-2 mt-1 mb-3 ml-2 w-full px-2 py-1 rounded transition-all duration-200 hover:border-green-500 focus:border-green-500 border-slate-300 focus:outline-none focus:ring-1 focus:ring-green-500" placeholder="Type your username" />
            </li>
            <li>
              Type Analia and go away <PorcentageTasks value={15} />
            </li>
          </ul>
        </section>
    </>
  );
}