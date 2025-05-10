import React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  ScrollShadow,
  Button,
} from '@heroui/react';
import { InboxIcon } from '@heroicons/react/20/solid';

const Inventory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        className='p-1 text-white'
        size='lg'
        color='primary'
        onPress={onOpen}
        isIconOnly
      >
        <InboxIcon />
      </Button>
      <Drawer isOpen={isOpen} size='xs' onOpenChange={onClose}>
        <DrawerContent>
          <DrawerHeader>Inventory</DrawerHeader>
          <DrawerBody>{/* <Content2 /> */}</DrawerBody>
          <DrawerFooter>
            <Button color='primary' onPress={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <ScrollShadow />
    </>
  );
};

export default Inventory;
