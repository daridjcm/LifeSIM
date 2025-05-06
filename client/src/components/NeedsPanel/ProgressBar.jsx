import React from 'react';
import { CircularProgress } from '@heroui/react';

const ProgressBar = ({ value, need }) => {
  const color =
    need === 'Hunger'
      ? 'danger'
      : need === 'Health'
        ? 'success'
        : need === 'Energy'
          ? 'warning'
          : need === 'Hygiene'
            ? 'primary'
            : need === 'Bladder'
              ? 'secondary'
              : 'default';

  return (
    <CircularProgress
      value={value}
      max={100}
      color={color}
      size="lg"
      className="m-auto"
      showValueLabel={true}
      aria-labelledby={`${need}-progress`}
    />
  );
};

export default ProgressBar;
