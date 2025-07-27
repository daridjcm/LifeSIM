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
import { PhoneIcon } from '@heroicons/react/20/solid';

const Phone = () => {
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
        <PhoneIcon />
      </Button>
      <Drawer isOpen={isOpen} size='xs' onOpenChange={onClose}>
        <DrawerContent>
          <DrawerHeader>Phone</DrawerHeader>
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

export default Phone;
