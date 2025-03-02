import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

export default function ModalComponent({
  title,
  description,
  children,
  isOpen,
  onOpenChange,
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
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
      onOpenChange={onOpenChange} // Pass onOpenChange to Modal to control state
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
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Save changes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
