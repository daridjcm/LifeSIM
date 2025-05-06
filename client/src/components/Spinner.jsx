import { Spinner } from '@heroui/react';
import PropTypes from 'prop-types';

export default function SpinnerComp({ color, label, size }) {
  return (
    <Spinner
      color={color || 'primary'}
      variant="waves"
      size={size || 'md'}
      label={label}
    />
  );
}

Spinner.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string,
  size: PropTypes.string,
};
