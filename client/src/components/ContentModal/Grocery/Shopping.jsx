import {
  Checkbox,
  CheckboxGroup,
  cn,
  Image,
  Input,
  ScrollShadow,
  Select,
  SelectItem,
} from '@heroui/react';
import CustomButton from '../../CustomButton';
import { useState, useEffect } from 'react';
import { useAlert } from '../../../context/AlertContext.jsx';

const STORAGE_KEY = 'selectedItems';
const EXPIRATION_TIME = 24 * 60 * 60 * 1000;

// Save products selected to local storage
const saveToLocalStorage = (data) => {
  const dataWithTimestamp = { items: data, timestamp: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataWithTimestamp));
};

// Load products selected from local storage
const loadFromLocalStorage = () => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (!storedData) return null;

  const parsedData = JSON.parse(storedData);
  const { items, timestamp } = parsedData;

  if (Date.now() - timestamp > EXPIRATION_TIME) {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }

  return items;
};

// Render view of selected products
function ShoppingList({ selectedItems, setSelectedItems }) {
  const { showAlert } = useAlert();
  const [sendObject, setSendObj] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(
    selectedItems[0]?.name || '',
  );

  // Handle quantity change for selected product
  const handleQuantityChange = (quantity) => {
    const updatedItems = selectedItems.map((product) =>
      product.name === selectedProduct
        ? {
            ...product,
            quantity,
            price: (product.base_price * quantity).toFixed(2),
            base_price: product.base_price,
          }
        : product,
    );
    setSelectedItems(updatedItems);
    saveToLocalStorage(updatedItems);
  };

  const handleProductChange = (title) => {
    setSelectedProduct(title);
  };

  // Handle send products to the server
  const handleSend = async () => {
    const updatedItems = selectedItems.map((item) => ({
      ...item,
      price: parseFloat(item.price),
      base_price: parseFloat(item.base_price),
    }));
    showAlert(
      'Products Saved ✅',
      'The shopping list has been saved, go to the cashier.',
    );

    console.log(
      'Payload to send:',
      JSON.stringify({ selectedItems: updatedItems }),
    );

    setSendObj(true);
    try {
      const res = await fetch('http://localhost:3000/api/grocery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedItems: updatedItems }),
      });

      const data = await res.json();
      console.log('Response from server:', data);
      setSendObj(false);
    } catch (error) {
      setSendObj(false);
      console.error('Error sending data:', error);
    }
  };

  // Handle clear all products
  const handleClear = () => {
    setSelectedItems([]);
  };

  // Render view to display selected products
  return (
    <>
      <p>Products selected to buy.</p>
      <p>Products Selected: {selectedItems.length}</p>  
      {selectedItems.length > 0 ? (
        <>
          <CheckboxGroup
            orientation='vertical'
            color='primary'
            onChange={(checkedItems) => {
              const updatedItems = selectedItems.filter(
                (product) => !checkedItems.includes(product.name),
              );
              setSelectedItems(updatedItems);
              saveToLocalStorage(updatedItems);
            }}
          >
            <ScrollShadow
              className='xl:h-[250px] lg:h-[200px]'
              hideScrollBar
              size={70}
            >
              <div className='grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-1 justify-start gap-3 m-3'>
                {selectedItems.map((product) => (
                  <Checkbox key={product.name} value={product.name} lineThrough>
                    <Image
                      alt={product.name}
                      src={product.img}
                      width={100}
                      height={80}
                      shadow='sm'
                      className='object-cover'
                    />
                    <p className='ml-2'>{product.name}</p>
                    <p className='ml-2 font-bold'>{product.quantity} x ${product.price}</p>
                  </Checkbox>
                ))}
              </div>
            </ScrollShadow>
          </CheckboxGroup>
          <div className='flex items-start justify-around sm:flex-col lg:flex-row mb-3 mt-5'>
            <label className='mr-2' htmlFor='productSelect'>
              Select product
            </label>
            <Select
              id='productSelect'
              value={selectedProduct}
              onChange={(e) => handleProductChange(e.target.value)}
              className='border border-gray-300 rounded-md text-center'
              aria-label='Select product'
            >
              {selectedItems.map((product) => (
                <SelectItem key={product.name} value={product.name}>
                  {product.name}
                </SelectItem>
              ))}
            </Select>
            <label className='mr-2 ml-3' htmlFor='quantityInput'>
              Quantity
            </label>
            <Input
              id='quantityInput'
              variant='bordered'
              type='number'
              value={
                selectedItems.find(
                  (product) => product.name === selectedProduct,
                )?.quantity || 1
              }
              onChange={(e) =>
                handleQuantityChange(parseInt(e.target.value, 10))
              }
              className='border border-gray-300 rounded-md text-center'
              min={1}
              max={50}
            />
          </div>
          <CustomButton
            label={'Save changes'}
            onPress={handleSend}
            isLoading={sendObject}
            loadingText='Saving changes...'
          />
          <CustomButton
            label={'Clear all'}
            onPress={handleClear}
            loadingText='Cleaning all...'
          />
          <p className='text-blue-500 mt-5 font-semibold'>
          You can <span className='text-red-500 font-bold'>deleting products by simply clicking on them</span> or <span className='text-green-500 font-bold'>you can change the quantity</span> of each product.
          </p>
        </>
      ) : (
        <p className='text-gray-500'>Not have products selected.</p>
      )}
    </>
  );
}

export default function ShoppingListTab({ selectedProducts = [] }) {
  const [selectedItems, setSelectedItems] = useState(() => {
    const storedItems = loadFromLocalStorage();
    return storedItems && storedItems.length > 0 ? storedItems : [];
  });

  useEffect(() => {
    if (selectedProducts.length > 0) {
      setSelectedItems(
        selectedProducts.map((product) => ({
          ...product,
          base_price: product.price,
          quantity: 1,
        })),
      );
    }
  }, [selectedProducts]);

  useEffect(() => {
    saveToLocalStorage(selectedItems);
  }, [selectedItems]);

  return (
    <>
      <p className='text-2xl font-bold'>Summary to Shopping List</p>
      {selectedItems.length > 0 ? (
        <ShoppingList
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      ) : (
        <p className='text-gray-500'>No products selected.</p>
      )}
    </>
  );
}
