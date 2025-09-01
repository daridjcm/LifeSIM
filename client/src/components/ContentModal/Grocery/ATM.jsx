import { useState, useEffect } from 'react';
import { useShoppingCart } from '../../../context/ShoppingContext.jsx';
import { useAlert } from '../../../context/AlertContext.jsx';
import { useUser } from '../../../context/UserContext.jsx';
import CustomButton from '../../CustomButton';
import Card from '../../Card.jsx';
import handleDownload from '../../SavePDF.jsx';

export default function AtmTab({
  paymentStatus,
  setPaymentStatus,
  paymentProcessing,
  setPaymentProcessing,
}) {
  const { selectedProducts, clearCart } = useShoppingCart();
  const [total_amount, setTotalAmount] = useState(0);
  const [method, setMethod] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const { showAlert } = useAlert();
  const { user } = useUser();
  const [showProcessingCard, setShowProcessingCard] = useState(false);

  useEffect(() => {
    const total = selectedProducts.reduce(
      (sum, item) => {
        const basePrice = parseFloat(item.base_price || item.price);
        return sum + (basePrice * item.quantity);
      },
      0
    );
    setTotalAmount(total.toFixed(2));
  }, [selectedProducts]);

  const handlePayment = async (paymentMethod) => {
    if (selectedProducts.length === 0) {
      showAlert('Your cart is empty!', 'Please, add some products to proceed');
      return;
    }
    setMethod(paymentMethod);
    setPaymentProcessing(true);
    setPaymentStatus('processing');
    setShowProcessingCard(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      const products = selectedProducts.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        base_price: item.base_price || item.price, // Static base price (price per unit)
        price: (parseFloat(item.base_price || item.price) * item.quantity).toFixed(2), // Dynamic total price
      }));

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
         },
        body: JSON.stringify({
          user_id: user?.id,
          invoiceNumber: Date.now(),
          items: products,
          total_amount,
          payment_method: paymentMethod,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setInvoice(data.invoice);
        setPaymentStatus(true);
        showAlert('Payment processed successfully!', 'Payment completed ✅');
      } else {
        throw new Error(data.message || 'Payment failed');
      }
    } catch (error) {
      setPaymentStatus('Payment Failed');
      showAlert('Error to pay products', 'Payment failed ❌');
    } finally {
      setPaymentProcessing(false);
      setShowProcessingCard(false);
      clearCart();
    }
  };

  return (
    <div className='space-y-4'>
      <div className='bg-white rounded-lg shadow p-4'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-xl font-bold'>Payment Summary</h3>
          {invoice && (
            <CustomButton
              label='Download Invoice'
              onPress={() => handleDownload('Invoice', invoice, user)}
              color='success'
              size='sm'
            />
          )}
        </div>

        <div className='space-y-2'>
          {selectedProducts.map((product) => (
            <div key={product.id} className='flex justify-between items-center'>
              <div className='flex-1'>
                <span className='font-medium'>{product.name}</span>
                <span className='text-gray-500 ml-2'>x{product.quantity}</span>
              </div>
              <div className='flex flex-col items-end gap-1'>
                <div className='text-sm text-gray-500'>
                  ${product.base_price || product.price}
                </div>
                <div className='font-medium'>
                  ${(parseFloat(product.base_price || product.price) * product.quantity)}
                </div>
              </div>
            </div>
          ))}

          <div className='border-t pt-2 mt-4'>
            <div className='flex justify-between font-bold text-lg'>
              <span>Total:</span>
              <span>${total_amount}</span>
            </div>
          </div>
        </div>

        <div className='mt-6 space-x-4'>
          <CustomButton
            label='Pay with Cash'
            onPress={() => handlePayment('cash')}
            disabled={paymentProcessing}
            loading={paymentProcessing}
          />
          <CustomButton
            label='Pay with Card'
            onPress={() => handlePayment('card')}
            disabled={paymentProcessing}
            loading={paymentProcessing}
          />
        </div>
      </div>

      {/* Show payment method card during processing */}
      {showProcessingCard && (
        <Card
          type={method === 'cash' ? 'Cash' : 'Credit Card'}
          holder={user?.name || 'Card Holder'}
          id={user?.id || '000000'}
          expiry='12/25'
          number_card={method === 'cash' ? 'CASH PAYMENT' : '**** **** **** 1234'}
        />
      )}
    </div>
  );
}
