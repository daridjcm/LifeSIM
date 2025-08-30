import { useEffect, useState } from 'react';
import { useAlert } from '../../../context/AlertContext.jsx';
import CustomButton from '../../CustomButton.jsx';
import Card from '../../Card';
import handleDownload from '../../SavePDF.jsx';
import ModalComponent from '../../ContentModal/Work/Modal.jsx';
import { useUser } from '../../../context/UserContext.jsx';

const STORAGE_KEY = 'atmInvoice';

const saveInvoiceToLocalStorage = (invoice) => {
  const invoiceWithTimestamp = { ...invoice, timestamp: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invoiceWithTimestamp));
};

const loadInvoiceFromLocalStorage = () => {
  const storedInvoice = localStorage.getItem(STORAGE_KEY);
  if (!storedInvoice) return null;

  const parsedInvoice = JSON.parse(storedInvoice);
  const { timestamp } = parsedInvoice;

  const EXPIRATION_TIME = 24 * 60 * 60 * 1000;
  if (Date.now() - timestamp > EXPIRATION_TIME) {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }

  return parsedInvoice;
};

export default function AtmTab({
  products,
  paymentStatus,
  setPaymentStatus,
  paymentProcessing,
  setPaymentProcessing,
}) {
  const [total_amount, setTotalAmount] = useState(0);
  const [invoice, setInvoice] = useState(loadInvoiceFromLocalStorage());
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const { showAlert } = useAlert();
  const { user } = useUser();

  useEffect(() => {
    const total = products.reduce(
      (sum, item) => sum + parseFloat(item.price),
      0,
    );
    return setTotalAmount(total.toFixed(2));
  }, [products]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch('http://localhost:3000/api/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setUserData(data.user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handlePayment = () => {
    if (products.length === 0) {
      return showAlert('Error', 'Cart is empty!');
    }
    setShowPaymentModal(true);
  };
  console.log('User Data:', userData);

  const processPayment = async (method) => {
    setPaymentProcessing(true);
    setPaymentStatus('Processing Payment...');
    setShowPaymentModal(false);
    method = method.toLowerCase();

    try {
      const items = products.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      const requestData = {
        user_id: userData.id,
        invoiceNumber: Date.now(),
        items: items,
        total_amount,
        payment_method: method,
      };
      console.log(requestData);
      console.log(products);

      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Error details:', errorDetails);
        throw new Error('Failed to create invoice');
      } else {
        const invoiceData = await res.json();
        const latestInvoice = invoiceData.invoice;
        setInvoice(latestInvoice);
        saveInvoiceToLocalStorage(latestInvoice);
      }
      setPaymentStatus('Products paid successfully');
      showAlert('Products paid successfully', 'Payment completed ✅');
    } catch (error) {
      showAlert('Error to pay products', 'Payment failed ❌');
      console.error('Payment error:', error);
    } finally {
      setPaymentProcessing(false);
    }
  };

  return (
    <>
      <p className='text-2xl font-bold'>Summary Purchase</p>
      <p className='font-bold text-xl'>Total: ${total_amount} LSD</p>
      <p className='font-bold text-xl'>Products Selected: {products.length}</p>
      <Card type='Shopping Card' holder={user?.username} id={user?.id} />

      <div className='flex gap-3'>
        <CustomButton
          label={paymentProcessing ? paymentStatus : 'Make Payment'}
          onPress={handlePayment}
          disabled={paymentProcessing}
        />
        {paymentStatus == 'Products paid successfully' && (
          <CustomButton
            label='Download Report 🧾'
            onPress={() => handleDownload('Invoice', invoice, userData)}
          />
        )}
      </div>

      {showPaymentModal && (
        <ModalComponent
          title='Choose Payment Method'
          description='Select how you want to pay'
          isOpen={showPaymentModal}
          onOpenChange={setShowPaymentModal}
        >
          <div className='flex flex-col gap-3'>
            <CustomButton
              label='Cash 💵'
              onPress={() => processPayment('Cash')}
            />
            <CustomButton
              label='Card 💳'
              onPress={() => processPayment('Card')}
            />
          </div>
        </ModalComponent>
      )}
    </>
  );
}
