import { Image } from "@heroui/react"
import Card from "../../Card.jsx"
import {ClockIcon} from "@heroicons/react/24/solid"

export default function Patient() {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-6">
      <div className="border border-zinc-300 rounded-lg p-5 sm:w-full md:w-full lg:w-2/4 lg:h-auto">
        <p className="text-3xl font-semibold">Patient Identification</p>
        <p>Personal information and current status</p>

        <div className="mt-5 mb-8">
          <Image />
          <p>Full Name</p>
          <p>ID:</p>
          <p>Age:</p>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-row w-full gap-4">
          <div className="border border-zinc-300 p-3 rounded-md w-full sm:w-2/4 lg:w-2/4">
            <p className="opacity-60">Blood type</p>
            <p className="font-bold">A+</p>
          </div>
          <div className="border border-zinc-300 p-3 rounded-md w-full sm:w-2/4 lg:w-2/4">
            <p className="opacity-60">Allergies</p>
            <p className="font-bold">None</p>
          </div>
        </div>
        <div className="flex-col border border-zinc-300 p-3 rounded-md w-full mt-5">
          <p className="font-semibold">Appointment Status:</p>
          <p className="flex items-center max-w-72 mt-3"><ClockIcon className="size-7 mr-1 text-blue-500" />You have an appointment scheduled for</p>
        </div>
      </div>

      <div className="border border-zinc-300 rounded p-5 sm:w-full md:w-full lg:w-2/4 lg:h-auto">
        <p className="text-3xl font-semibold">Health Insurance</p>
        <p className="mb-5">Details of your current coverage</p>

        <Card type="Health Insurance"/>

        <div className="bg-yellow-100 p-3">
          <p className="text-amber-500 opacity-80 font-semibold">Note:</p>
          <p className="mb-3">If your health insurance plan in status <span className="text-red-400">expired</span>, you must go to the <span className="text-cyan-400 font-semibold">Bank</span> and renew it.</p>
          <p>If you are a new user, you must apply for your health insurance at the Bank to receive the exclusive benefits included in the plan.</p>
        </div>
      </div>
    </div>
  )
}
