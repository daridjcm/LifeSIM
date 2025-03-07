import { Tabs, Tab } from "@heroui/react";
import React, { useState } from "react";
import ProductsTab from "./Products.jsx";
import ShoppingListTab from "./Shopping.jsx";
import AtmTab from "./ATM.jsx";
import {
  CreditCardIcon,
  ListBulletIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";

const ContentGrocery = React.memo(
  ({ itemsToDisplay, page, total, onChange }) => {
    // State Management
    const [paymentStatus, setPaymentStatus] = useState("Make Payment");
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState("success"); // success or danger
    const [selectedProducts, setSelectedProducts] = useState([]);

    return (
      <Tabs
        aria-label="Options"
        variant="solid"
        color="primary"
        size="lg"
        fullWidth
      >
        <Tab
          key="products"
          title={
            <div className="flex items-center space-x-2">
              <ShoppingCartIcon className="size-6" />
              <span>Products</span>
            </div>
          }
        >
          <ProductsTab
            itemsToDisplay={itemsToDisplay}
            page={page}
            total={total}
            onChange={onChange}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
        </Tab>

        <Tab
          key="shoppinglist"
          title={
            <div className="flex items-center space-x-2">
              <ListBulletIcon className="size-6" />
              <span>Shopping List</span>
            </div>
          }
        >
          <ShoppingListTab selectedProducts={selectedProducts} />
        </Tab>

        <Tab
          key="atm"
          title={
            <div className="flex items-center space-x-2">
              <CreditCardIcon className="size-6" />
              <span>ATM (Cashier)</span>
            </div>
          }
        >
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
  },
);

export default ContentGrocery;
