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
import { FaceSmileIcon } from '@heroicons/react/20/solid';
import {Content1} from './Content.jsx';

export default function NeedsPanel () {
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
        <FaceSmileIcon />
      </Button>
      <Drawer isOpen={isOpen} size='xs' onOpenChange={onClose}>
        <DrawerContent>
          <DrawerHeader>Needs Panel</DrawerHeader>
          <DrawerBody>
            <Content1 />
          </DrawerBody>
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
