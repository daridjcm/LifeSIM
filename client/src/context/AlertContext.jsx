import { createContext, useContext, useState } from "react";
import AlertComp from "../components/AlertComp.jsx";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ visible: false, title: "", description: "" });

  const showAlert = (title, description) => {
    setAlert({ visible: true, title, description });
    setTimeout(() => setAlert({ ...alert, visible: false }), 7000);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {alert.visible && (
        <div className="fixed top-5 z-[9999] w-full flex justify-center pointer-events-none">
          <AlertComp title={alert.title} description={alert.description} />
        </div>
      )}
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
