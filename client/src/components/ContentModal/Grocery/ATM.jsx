import {Alert } from "@heroui/react";
import CustomButton from "../../CustomButton";

export default function AtmTab({ paymentStatus, setPaymentStatus, paymentProcessing, setPaymentProcessing, alertVisible, setAlertVisible, alertType, setAlertType }) {
  const handlePayment = () => {
    setPaymentProcessing(true);
    setPaymentStatus("Making Payment...");

    setTimeout(() => {
      const paymentSuccessful = false; // Simulated payment condition

      if (paymentSuccessful) {
        setPaymentStatus("Payment Done ✅");
        setAlertType("success");
      } else {
        setPaymentStatus("Payment Failed");
        setAlertType("danger");
      }

      setPaymentProcessing(false);
      setAlertVisible(true);

      setTimeout(() => {
        setAlertVisible(false);
        setPaymentStatus("Make Payment");
      }, 4500);
    }, 3000);
  };

  return (
    <>
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
