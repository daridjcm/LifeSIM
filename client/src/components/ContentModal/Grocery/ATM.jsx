import { Alert } from "@heroui/react";
import CustomButton from "../../CustomButton";
import { useEffect, useState } from "react";
import handleDownload from "./SavePDF";

const STORAGE_KEY = "atmInvoice";

// Función para guardar la factura en localStorage
const saveInvoiceToLocalStorage = (invoice) => {
  const invoiceWithTimestamp = {
    ...invoice,
    timestamp: Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invoiceWithTimestamp));
};

// Función para cargar la factura desde localStorage si está disponible y no ha expirado
const loadInvoiceFromLocalStorage = () => {
  const storedInvoice = localStorage.getItem(STORAGE_KEY);
  if (!storedInvoice) return null;

  const parsedInvoice = JSON.parse(storedInvoice);
  const { timestamp } = parsedInvoice;

  // Expiración de 24 horas
  const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 1 día en milisegundos
  if (Date.now() - timestamp > EXPIRATION_TIME) {
    localStorage.removeItem(STORAGE_KEY); // Si ha expirado, eliminarlo
    return null;
  }

  return parsedInvoice;
};

export default function AtmTab({
  paymentStatus, setPaymentStatus, paymentProcessing, setPaymentProcessing,
  alertVisible, setAlertVisible, alertType, setAlertType,
}) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [invoice, setInvoice] = useState(loadInvoiceFromLocalStorage()); // Cargar factura desde localStorage
  const [groceryList, setGroceryList] = useState([]);

  useEffect(() => {
    const fetchGroceryList = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/grocery");
        const data = await res.json();
        setGroceryList(data.groceries);
        setTotalAmount(data.groceries.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2));
      } catch (error) {
        console.error("Error fetching grocery list:", error);
      }
    };
    fetchGroceryList();
  }, []);

  const handlePayment = async () => {
    if (groceryList.length === 0) return setAlert("Cart is empty!", "danger");
    setPaymentProcessing(true);
    setPaymentStatus("Making Payment...");
    try {
      const res = await fetch("http://localhost:3000/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalAmount,
          groceryList,
          items: groceryList.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });

      if (!res.ok) throw new Error("Failed to create invoice");

      const invoiceData = await res.json();
      const latestInvoice = invoiceData.invoice;
      setInvoice(latestInvoice);      saveInvoiceToLocalStorage(latestInvoice);

      setAlert("Payment Done ✅", "success");
    } catch (error) {
      setAlert("Payment Failed", "danger");
      console.error("Error during payment:", error);
    } finally {
      setPaymentProcessing(false);
    }
  };

  const setAlert = (status, type) => {
    setPaymentStatus(status);
    setAlertType(type);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 4500);
  };

  return (
    <>
      <p className="text-2xl font-bold">Summary Purchase</p>
      <p className="font-bold text-xl">Total: ${totalAmount}</p>
      <div className="flex flex-col gap-3 bg-gradient-to-r from-green-700 to-green-500 p-10 rounded-md mt-7 mb-3 text-slate-50 text-xl shadow-lg w-full">
        <p>Card LifeSIM</p>
        <ul>
          <li className="text-green-slate-100 opacity-70">1234 5678 9XXX XXXX</li>
          <li>Titular <span>Usuario</span></li>
        </ul>
        <div className="flex flex-col text-end text-slate-100 opacity-70">
          <p>ID:</p> 12345abc
        </div>
      </div>

      <div className="flex gap-3">
        <CustomButton label={paymentProcessing ? paymentStatus : paymentStatus} onPress={handlePayment} />
        {invoice && (
          <CustomButton label="Download Report" onPress={() => handleDownload(invoice)} />
        )}
      </div>

      {alertVisible && (
        <Alert
          color={alertType}
          title={alertType === "success" ? "Payment Done" : "Payment Failed"}
          description={alertType === "success" ? "Payment has been made." : "Payment has been rejected."}
          isVisible={alertVisible}
          variant="faded"
          className="mt-5"
          onClose={() => setAlertVisible(false)}
        />
      )}
    </>
  );
}
