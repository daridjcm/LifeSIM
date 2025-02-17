import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter, 
  useDisclosure, 
  ScrollShadow,
  Button
} from "@heroui/react";
import { FaceSmileIcon } from "@heroicons/react/20/solid";
import Content from "./Content";

const NeedsPanel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="z-10 fixed bottom-0 right-0 p-3">
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
      <Drawer isOpen={isOpen} size="xs" onOpenChange={onClose}>
        <DrawerContent>
          <DrawerHeader>Needs Panel</DrawerHeader>
          <DrawerBody>
            <Content />
          </DrawerBody>
          <DrawerFooter>
            <Button color="primary" onPress={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <ScrollShadow />
    </>
  );
};

export default NeedsPanel;
