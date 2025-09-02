import { useState } from 'react';
import { useDisclosure } from '@heroui/react';
import ModalComponent from './Modal.jsx';
import TableCustomers, { customersCount } from './TableCustomers.jsx';
import CustomButton from '../../CustomButton.jsx';

export default function PhoneCorporative({ tasks, setTasks }) {
  const [chatBossClickCount, setChatBossClickCount] = useState(0);
  const [customerCountHandler, setCustomerCount] = useState(customersCount);
  const [chatBoss, setChatBoss] = useState(false);
  const [chatAnalia, setChatAnalia] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleTaskCompletion = (task) => {
    setTasks((prevTasks) =>
      prevTasks.includes(task) ? prevTasks : [...prevTasks, task],
    );
  };

  const downloadCustomers = () => {
    fetch('/ia/download')
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'customers.csv';
        a.click();
      })
      .catch((err) => console.error('Error al descargar CSV:', err));
  };

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

  const handleChatBossClick = () => {
    setChatBossClickCount((prevCount) => prevCount + 1);

    if (chatBossClickCount === 0 && !tasks.includes('task1')) {
      handleTaskCompletion('task1');
    } else if (chatBossClickCount === 1 && !tasks.includes('task4')) {
      handleTaskCompletion('task4');
    }
    ChatBoss();
  };

  return (
    <div className='flex flex-col gap-3 mt-4'>
      <CustomButton
        label={
          chatBoss
            ? 'Entering to chat with the Boss...'
            : 'Chat with the Boss 📱'
        }
        onPress={handleChatBossClick}
        id='chatBoss'
      />
      <CustomButton
        label='Check the file of customers 📂'
        onPress={() => {
          handleTaskCompletion('task2');
          setCustomerCount(customersCount);
          downloadCustomers();
        }}
      />

      <CustomButton
        label='Table of Calls ☎'
        onPress={() => {
          handleTaskCompletion('task3');
          TableCalls(); // Fix: Call function separately
        }}
        isLoading={false}
        id='tableCalls'
      />

      <CustomButton
        label={
          chatAnalia ? 'Entering to chat Analia...' : 'Chat with Analia 📱'
        }
        onPress={() => {
          handleTaskCompletion('task5');
          ChatAnalia(); // Fix: Call function separately
        }}
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
