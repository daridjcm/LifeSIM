import { Alert } from "@heroui/react";
import CustomButton from "../../CustomButton";
import { useEffect, useState } from "react";
import handleDownload from "./SavePDF";

export default function AtmTab({
  paymentStatus,
  setPaymentStatus,
  paymentProcessing,
  setPaymentProcessing,
  alertVisible,
  setAlertVisible,
  alertType,
  setAlertType,
}) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    // Fetch groceryList from the server and calculate total amount
    const fetchGroceryList = async () => {
      try {
        const res = await fetch("http://localhost:3000/grocery");
        const data = await res.json();
        const total = data.groceryList.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
        setTotalAmount(total);
      } catch (error) {
        console.error("Error fetching grocery list:", error);
      }
    };

    fetchGroceryList();
  }, []);

  const handlePayment = async () => {
    setPaymentProcessing(true);
    setPaymentStatus("Making Payment...");

    setTimeout(async () => {
      try {
        const res = await fetch("http://localhost:3000/grocery/invoice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setPaymentStatus("Payment Done ✅");
        setAlertType("success");
        setInvoice(data.invoice);
        console.log("Invoice created:", data.invoice);

        // Incrementar invoiceNumber en localStorage
        let invoiceNumber = localStorage.getItem('invoiceNumber');
        if (!invoiceNumber) {
          invoiceNumber = 1;
        } else {
          invoiceNumber = parseInt(invoiceNumber) + 1;
        }
        localStorage.setItem('invoiceNumber', invoiceNumber);

      } catch (error) {
        setPaymentStatus("Payment Failed");
        setAlertType("danger");
        console.error("Error during payment:", error);
      } finally {
        setPaymentProcessing(false);
        setAlertVisible(true);

        setTimeout(() => {
          setAlertVisible(false);
          setPaymentStatus("Make Payment");
        }, 4500);
      }
    }, 3000);
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
          <p>ID:</p>
          12345abc
        </div>
      </div>

      <div className="flex gap-3">
        <CustomButton
          label={paymentProcessing ? paymentStatus : paymentStatus}
          onPress={handlePayment}
        />

        {invoice && (
          <CustomButton
            label={"Download Report"}
            onPress={() => handleDownload(invoice)}
          />
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