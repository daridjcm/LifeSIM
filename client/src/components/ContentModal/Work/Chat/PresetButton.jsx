import React, { useState, useContext, useEffect } from "react";
import { Button } from "@heroui/react";
import { TimeContext } from "../../../../context/TimeContext.jsx";

export function PresetButton({ response, onClick }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const time = useContext(TimeContext);
  const [initialDay, setInitialDay] = useState(time ? time.getDate() : null);

  useEffect(() => {
    if (time && time.getDate() !== initialDay) {
      setIsDisabled(true);
    }
  }, [time, initialDay]);

  const handleClick = () => {
    setIsDisabled(true);
    onClick(response);
  };

  return (
    <Button
      variant="solid"
      size="lg"
      onPress={handleClick}
      color="default"
      className="w-full m-auto text-wrap"
      isDisabled={isDisabled}
    >
      {response.content}
    </Button>
  );
}
