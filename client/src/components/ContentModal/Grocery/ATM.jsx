import { Tabs, Tab, Pagination, Alert } from "@heroui/react";
import CardList from "../../CardList";
import { useState } from "react";
import CustomButton from "../../CustomButton";
import ShoppingList from "./ShoppingList";

export function Index({ itemsToDisplay, page, total, onChange }) {
  const [paymentStatus, setPaymentStatus] = useState("Make Payment");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("success"); // success or danger
  const [selectedProducts, setSelectedProducts] = useState([]); // Moved state here

  const handlePayment = () => {
    setPaymentProcessing(true);
    setPaymentStatus("Making Payment...");

    setTimeout(() => {
      const paymentSuccessful = false; // This depends of money.

      if (paymentSuccessful) {
        setPaymentStatus("Payment Done ✅");
        setAlertType("success");
      } else {
        setPaymentStatus("Payment Failed");
        setAlertType("danger");
      }

      setPaymentProcessing(false);
      setAlertVisible(true);

      // Hidden alert
      setTimeout(() => {
        setAlertVisible(false);
        setPaymentStatus("Make Payment");
      }, 4500);
    }, 3000);
  };

  return (
    <Tabs aria-label="Options" variant="underline">
      <Tab key="products" title="Products">
        <CardList
          statusCard="itemsGrocery"
          iconShow={false}
          itemsToDisplay={itemsToDisplay}
          selectedProducts={selectedProducts} // ✅ Pass selectedProducts
          setSelectedProducts={setSelectedProducts} // ✅ Pass setSelectedProducts
        />
        <Pagination
          showControls
          page={page}
          total={total}
          size="lg"
          onChange={onChange}
          siblings={1}
          boundaries={1}
          className="flex justify-center"
          showShadow
          radius="full"
        />
      </Tab>

      <Tab key="shoppinglist" title="Shopping List">
        <p className="text-2xl font-bold">Summary to Shopping List</p>
        <ShoppingList selectedItems={selectedProducts} />
      </Tab>

      <Tab key="atm" title="ATM (Cashier)">
        <p className="text-2xl font-bold">Summary Purchase</p>
        <p className="font-bold text-xl">Total: $</p>
        <div className="flex flex-col gap-3 bg-gradient-to-r from-green-700 to-green-500 p-10 rounded-md mt-7 mb-3 text-slate-50 text-xl shadow-lg w-full">
          <p>Card LifeSIM</p>
          <ul>
            <li className="text-green-slate-100 opacity-70">1234 5678 9XXX XXXX</li>
            <li>Titular <span>Usuario</span></li>
          </ul>
          <div className="flex flex-col text-end text-slate-100 opacity-70">
            <p>ID:</p>
            12345abc
          </div>
        </div>

        <CustomButton
          label={paymentProcessing ? paymentStatus : paymentStatus}
          onPress={handlePayment}
        />

        {alertVisible && (
          <Alert
            color={alertType} // The color depends if is success o danger
            title={alertType === "success" ? "Payment Done" : "Payment Failed"}
            description={alertType === "success" ? "Payment has been made." : "Payment has been rejected."}
            isVisible={alertVisible}
            variant="faded"
            onClose={() => setAlertVisible(false)} // Close alert manually.
          />
        )}
      </Tab>
    </Tabs>
  );
}
