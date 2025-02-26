import React from 'react';
import { Button } from '@heroui/react';

const CustomButton = ({ label, onPress, isLoading, loadingText, icon, id }) => {
  return (
    <Button color="primary" variant="flat" size="md" onPress={onPress} aria-label={label} id={id} className='mr-4'>
      {isLoading ? loadingText : label} {icon}
    </Button>
  );
};

export default CustomButton;
