import {Alert} from "@heroui/react";

export default function AlertComp({title, description}) {
  return (
    <div className="flex items-center justify-center w-full">
      <Alert description={description} title={title} />
    </div>
  );
}
