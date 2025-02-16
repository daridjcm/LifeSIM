import { Tabs, Tab } from "@heroui/react";
import { useState } from "react";
import ProductsTab from "./Products";
import ShoppingListTab from "./Shopping";
import AtmTab from "./ATM";

export function Index({ itemsToDisplay, page, total, onChange }) {
  // State Management
  const [paymentStatus, setPaymentStatus] = useState("Make Payment");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("success"); // success or danger
  const [selectedProducts, setSelectedProducts] = useState([]);

  return (
    <Tabs aria-label="Options" variant="underline">
      
      <Tab key="products" title="Products">
        <ProductsTab
          itemsToDisplay={itemsToDisplay}
          page={page}
          total={total}
          onChange={onChange}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />
      </Tab>
      
      <Tab key="shoppinglist" title="Shopping List">
        <ShoppingListTab selectedProducts={selectedProducts} />
      </Tab>

      <Tab key="atm" title="ATM (Cashier)">
        <AtmTab
          paymentStatus={paymentStatus}
          setPaymentStatus={setPaymentStatus}
          paymentProcessing={paymentProcessing}
          setPaymentProcessing={setPaymentProcessing}
          alertVisible={alertVisible}
          setAlertVisible={setAlertVisible}
          alertType={alertType}
          setAlertType={setAlertType}
        />
      </Tab>
    </Tabs>
  );
}
