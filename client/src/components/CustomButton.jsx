import React from "react";
import { Button } from "@heroui/react";

const CustomButton = ({ label, onPress, isLoading, loadingText, icon, id, variant, size }) => {
  return (
    <Button
      color="primary"
      variant={variant || "flat"} 
      size={size || "md"}
      onPress={onPress}
      aria-label={label}
      id={id}
      className="mr-2"
    >
      {isLoading ? loadingText : label} {icon}
    </Button>
  );
};

export default CustomButton;
