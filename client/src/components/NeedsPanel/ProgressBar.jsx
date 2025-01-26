import React from "react";
import { CircularProgress } from "@heroui/react";

const ProgressBar = ({ value, need }) => {
  const color =
    need === "Hungry"
      ? "danger"
      : need === "Health"
      ? "success"
      : need === "Energy"
      ? "warning"
      : "default";

  return (
    <CircularProgress
      value={value}
      max={100}
      color={color}
      showValueLabel={true}
      size="lg"
      className="m-auto"
    />
  );
};

export default ProgressBar;
