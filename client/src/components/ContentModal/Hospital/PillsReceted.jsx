import CustomButton from "../../CustomButton.jsx";
import { Chip, ScrollShadow } from "@heroui/react";

// Render view to pills receted in the report
// TODO: Get pills receted from API and display them here
export default function PillsReceted() {
  return (
    <div className="flex sm:flex-col md:flex-row lg:flex-row justify-between w-full gap-5">
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
      <div className="bg-zinc-100 sm:w-full md:w-[50%] lg:w-[50%] p-2">
        <p className="font-semibold">Pills Receted</p>
        <div className="flex justify-between bg-zinc-200 p-4 rounded-lg">
          <ScrollShadow
            hideScrollBar
            className="sm:h-[550px] md:h-[400px] lg:h-[300px]"
          >
            <div className="mb-2">
              <p className="text-xl text-blue-500">Duloxetina</p>
              <Chip
                className="capitalize"
                color="primary"
                size="sm"
                variant="flat"
              >
                30 tablets
              </Chip>
              <p className="text-sm">
                It is used to treat depression in adults and generalized anxiety
                disorder.
              </p>
            </div>
            <CustomButton label="Collect it" variant="solid" size="sm" />
          </ScrollShadow>
        </div>
      </div>
    </div>
  );
}
