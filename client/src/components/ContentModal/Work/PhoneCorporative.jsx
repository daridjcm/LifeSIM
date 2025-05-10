import { useState } from 'react';
import { useDisclosure } from '@heroui/react';
import ModalComponent from './Modal.jsx';
import TableCustomers, { customersCount } from './TableCustomers.jsx';
import CustomButton from '../../CustomButton.jsx';

export default function PhoneCorporative() {
  const [customerCountHandler, setCustomerCount] = useState(customersCount);
  const [chatBoss, setChatBoss] = useState(false);
  const [chatAnalia, setChatAnalia] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Redirect to chat with boss
  const ChatBoss = () => {
    setChatBoss(true);
    setTimeout(() => {
      window.open('/boss', '_blank');
      setChatBoss(false);
    }, 2000);
  };

  // Redirect form to add customer
  const TableCalls = () => {
    onOpen();
  };

  // Redirect to chat with Analia
  const ChatAnalia = () => {
    setChatAnalia(true);
    setTimeout(() => {
      setChatAnalia(false);
      window.open('/analia', '_blank');
    }, 2000);
  };

  {
    /* Render content Phone Corporative */
  }
  return (
    <div className='flex flex-col gap-3 mt-4'>
      <CustomButton
        label={
          chatBoss ? 'Entering to chat with Boss...' : 'Chat with the Boss 📱'
        }
        onPress={ChatBoss}
        id='chatBoss'
      />
      <CustomButton
        label={`Table of Calls ☎`}
        onPress={TableCalls}
        isLoading={false}
        id='tableCalls'
      />
      <CustomButton
        label={
          chatAnalia ? 'Entering to chat Analia...' : 'Chat with Analia 📱'
        }
        onPress={ChatAnalia}
        id='chatAnalia'
      />

      <ModalComponent
        title='Table of Calls'
        description='Here is a table, where you can add a new customer for the call.'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        btnColor1='danger'
        btnColor2='primary'
        buttonText1='Close'
        buttonText2='Save changes'
      >
        <TableCustomers />
      </ModalComponent>
    </div>
  );
}
