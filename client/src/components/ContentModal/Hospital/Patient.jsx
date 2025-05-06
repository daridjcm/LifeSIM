import { Image } from "@heroui/react";
import Card from "../../Card.jsx";
import { ClockIcon } from "@heroicons/react/24/solid";
import { useUser } from "../../../context/UserContext.jsx";
import { useEffect, useState } from "react";
import { useAppointment } from "../../../context/AppointmentContext.jsx";

export default function Patient() {
  const { user } = useUser();
  const { nextAppointment, fetchAppointments } = useAppointment();

  useEffect(() => {
    if (user?.id) {
      fetchAppointments(user?.id);
    }
  }, [user?.id]);

  // Render view information of patient
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-6">
      <div className="border border-zinc-300 rounded-lg p-5 sm:w-full md:w-full lg:w-2/4 lg:h-auto">
        <p className="text-3xl font-semibold">Patient Identification</p>
        <p>Personal information and current status</p>

        <div className="mt-5 mb-8">
          <Image />
          <p>
            User Name: <span>{user?.username}</span>
          </p>
          <p>
            ID: <span>{user?.id}</span>
          </p>
          <p>
            Gender:{" "}
            <span
              className={
                user?.gender === "female"
                  ? "bg-pink-300 px-3 py-0 rounded-md"
                  : "bg-blue-300 px-3 py-1 rounded-md"
              }
            >
              {user?.gender}
            </span>
          </p>
          <p>
            Email:{" "}
            <span className="text-blue-500 cursor-pointer">{user?.email}</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-row w-full gap-4">
          <div className="border border-zinc-300 p-3 rounded-md w-full sm:w-2/4 lg:w-2/4">
            <p className="opacity-60">Blood type</p>
            <p className="font-bold">{user?.blood_type || "N/A"}</p>
          </div>
          <div className="border border-zinc-300 p-3 rounded-md w-full sm:w-2/4 lg:w-2/4">
            <p className="opacity-60">Allergies</p>
            <p className="font-bold">None</p>
          </div>
        </div>

        <div className="flex-col border border-zinc-300 p-3 rounded-md w-full mt-5">
          <p className="font-semibold">Appointment Status:</p>
          <p className="flex items-center mt-3">
            <ClockIcon className="size-28 mr-1 text-blue-500" />
            <span>
              {nextAppointment
                ? `You have an appointment with ${nextAppointment.title}. ${nextAppointment.doctor} (${nextAppointment.specialist}) on ${nextAppointment.date} at ${nextAppointment.time}`
                : "Not have appointments scheduled"}
            </span>
          </p>
        </div>
      </div>

      <div className="border border-zinc-300 rounded p-5 sm:w-full md:w-full lg:w-2/4 lg:h-auto">
        <p className="text-3xl font-semibold">Health Insurance</p>
        <p className="mb-5">Details of your current coverage</p>

        <div className="flex flex-col gap-5 sm:max-w-md m-auto">
          <Card type="Health Insurance" holder={user?.username} id={user?.id} />
          <div className="bg-yellow-100 p-3 h-fit">
            <p className="text-amber-500 opacity-80 font-semibold">Note:</p>
            <p className="mb-3">
              If your health insurance plan in status{" "}
              <span className="text-red-400">expired</span>, you must go to the{" "}
              <span className="text-cyan-400 font-semibold">Bank</span> and
              renew it.
            </p>
            <p>
              If you are a new user, you must apply for your health insurance at
              the Bank to receive the exclusive benefits included in the plan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
