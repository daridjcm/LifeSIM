import { useState, useEffect } from "react";
import { Button, Modal } from "@heroui/react";
import { useDisclosure } from "@heroui/react";
import ModalComponent from "../Modal";
import TableCustomers, { customersCount } from "../../../utils/TableCustomers";
export default function PhoneCorporative() {
  const [customerCountHandler, setCustomerCount] = useState(customersCount);
  const [isCallingBoss, setIsCallingBoss] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Destructure to use state management for modal

  const CallBoss = () => {
    isCallingBoss ? 'Calling...' : 'Call Boss 📞'
    setIsCallingBoss(true);
    // setTimeout(() => {
    //   window.location.href = '/';
    // }, 2000);
  };

  const AddNewCustomer = () => {
    onOpen()
  };

  const TypeAnalia = () => {
    

  };

  return (
    <div className="flex flex-col gap-3 mt-4">
      <Button color="primary" variant="ghost" size="md" onPress={CallBoss} aria-label="Call Boss">
        Call Boss 📞 
      </Button>
      <Button
        color="primary"
        variant="ghost"
        size="md"
        onPress={AddNewCustomer}
        aria-label={`${customerCountHandler} customers`}
      >
        Add a new Customer ({customerCountHandler}) ☎
      </Button>
      <Button color="primary" variant="ghost" size="md" onPress={TypeAnalia} aria-label="Type to Analia">
        Type to Analia 📝
      </Button>

      <ModalComponent title="Table of Calls" desc="Here is a table, where you can add a new customer for the call." isOpen={isOpen} onOpenChange={onOpenChange}>
        <TableCustomers />
      </ModalComponent>
    </div>
  );
}
