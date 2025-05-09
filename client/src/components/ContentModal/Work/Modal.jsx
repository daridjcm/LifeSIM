import PropTypes from 'prop-types';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react';

export default function ModalComponent({
  title,
  description,
  children,
  isOpen,
  onOpenChange,
  btnColor1,
  btnColor2,
  buttonText1,
  buttonText2,
}) {
  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      className="min-w-fit max-w-fit"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.3, ease: 'easeOut' },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: { duration: 0.2, ease: 'easeIn' },
          },
        },
      }}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {title}
              <hr />
              <p className="text-sm mt-4 text-default-500">{description}</p>
            </ModalHeader>
            <ModalBody className="text-wrap">{children}</ModalBody>
            <ModalFooter>
              {buttonText1 && (
                <Button color={btnColor1} variant="light" onPress={onClose}>
                  {buttonText1}
                </Button>
              )}
              {buttonText2 && (
                <Button color={btnColor2} onPress={onClose}>
                  {buttonText2}
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

ModalComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  btnColor1: PropTypes.string,       // opcional
  btnColor2: PropTypes.string,       // opcional
  buttonText1: PropTypes.string,     // opcional
  buttonText2: PropTypes.string,     // opcional
};
