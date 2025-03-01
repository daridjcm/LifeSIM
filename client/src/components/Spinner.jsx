import { Spinner } from "@heroui/react";
import PropTypes from 'prop-types';

export default function Spinner({ color, label }) {
  return (
    <div>
      <Spinner color={color} variant="waves" />
      {label && <div>{label}</div>}
    </div>
  );
}

Spinner.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string,
};
