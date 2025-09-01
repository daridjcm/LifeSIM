import { Tabs, Tab } from '@heroui/react';
import React, { useState } from 'react';
import ProductsTab from '../Grocery/Products.jsx';
import ShoppingListTab from '../Grocery/Shopping.jsx';
import AtmTab from '../Grocery/ATM.jsx';
import {
  CreditCardIcon,
  ListBulletIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/solid';

// Render Tabs for the cafeteria content
const ContentCafeteria = React.memo(
  ({ itemsToDisplay }) => {
    // State Management
    const [paymentStatus, setPaymentStatus] = useState('Make Payment');
    const [paymentProcessing, setPaymentProcessing] = useState(true);

    return (
      <Tabs
        aria-label='Options'
        variant='solid'
        color='warning'
        size='lg'
        fullWidth
      >
        <Tab
          key='menu'
          title={
            <div className='flex items-center space-x-2'>
              <ShoppingCartIcon className='size-6' />
              <span>Menu</span>
            </div>
          }
        >
          <ProductsTab
            itemsToDisplay={itemsToDisplay}
          />
        </Tab>

        <Tab
          key='shoppinglist'
          title={
            <div className='flex items-center space-x-2'>
              <ListBulletIcon className='size-6' />
              <span>Shopping List</span>
            </div>
          }
        >
          <ShoppingListTab />
        </Tab>

        <Tab
          key='atm'
          title={
            <div className='flex items-center space-x-2'>
              <CreditCardIcon className='size-6' />
              <span>ATM (Cashier)</span>
            </div>
          }
        >
          <AtmTab
            paymentStatus={paymentStatus}
            setPaymentStatus={setPaymentStatus}
            paymentProcessing={paymentProcessing}
            setPaymentProcessing={setPaymentProcessing}
          />
        </Tab>
      </Tabs>
    );
  },
);

export default ContentCafeteria;
