import CustomButton from "../../CustomButton.jsx";
import { Chip, ScrollShadow } from "@heroui/react";
// import { useEffect, useState } from "react";

// const response = await fetch(
//   "http://localhost:3000/api/appointments/report",
//   {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(reportData),
//   },
// ); // Fetch the report data from the server

// const pillsData = await response.JSON();

export default function PillsReceted() {
  // const [pills, setPills] = useState([]);

  // useEffect(() => {
  //   // Simulate fetching data
  //   setPills(pillsData.treatments);
  // }, [response]);
  // TODO: Fix fetch, because causes error SIGILL

  return (
    <div className="flex sm:flex-col md:flex-row lg:flex-row justify-between w-full gap-5">
      {/* Comercial Pills Section */}
      <div className="bg-zinc-100 sm:w-full md:w-[50%] lg:w-[50%] p-2">
        <p className="font-semibold">Pills Comercial</p>
        <div className="flex justify-between bg-zinc-200 p-4 rounded-lg">
          <ScrollShadow
            hideScrollBar
            className="sm:h-[550px] md:h-[400px] lg:h-[300px]"
          >
            <div className="mb-2">
              <p className="text-xl text-blue-500 flex-col">Fluoxetina</p>
              <Chip
                className="capitalize"
                color="primary"
                size="sm"
                variant="flat"
              >
                30 tablets
              </Chip>
              <p className="flex-col text-sm">
                It is used to treat depression, obsessive-compulsive disorder,
                and bulimia nervosa, among others.
              </p>
            </div>
            <CustomButton label="Buy it for $xxx" variant="solid" size="sm" />
          </ScrollShadow>
        </div>
      </div>

      {/* Receted Pills Section */}
      <div className="bg-zinc-100 sm:w-full md:w-[50%] lg:w-[50%] p-2">
        <p className="font-semibold">Pills Receted</p>
        <div className="flex justify-between bg-zinc-200 p-4 rounded-lg">
          <ScrollShadow
            hideScrollBar
            className="sm:h-[550px] md:h-[400px] lg:h-[300px]"
          >
            {pills.map((pill, index) => (
              <div className="mb-4" key={index}>
                <p className="text-xl text-blue-500">{pill.pill_name}</p>
                <Chip
                  className="capitalize"
                  color="primary"
                  size="sm"
                  variant="flat"
                >
                  30 tablets
                </Chip>
                <p className="text-sm">{pill.pill_description}</p>
                <CustomButton
                  label={`Collect it ($${pill.pill_price})`}
                  variant="solid"
                  size="sm"
                />
              </div>
            ))}
          </ScrollShadow>
        </div>
      </div>
    </div>
  );
}
