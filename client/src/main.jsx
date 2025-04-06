import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import {AlertProvider} from "./context/AlertContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </UserProvider>
  </StrictMode>,
);
