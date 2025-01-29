import React from "react";
import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Button, useDisclosure, ScrollShadow } from "@heroui/react";
import { FaceSmileIcon } from "@heroicons/react/20/solid";
import Content from "./Content";

const NeedsPanel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="fixed bottom-0 right-0 p-3">
        <Button
          className="p-1 text-white"
          size="lg"
          color="primary"
          onPress={onOpen}
          isIconOnly
        >
          <FaceSmileIcon />
        </Button>
      </div>
      <Modal backdrop="opaque" size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Needs Panel</ModalHeader>
          <ModalBody>
            <Content />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ScrollShadow />
    </>
  );
};

export default NeedsPanel;
