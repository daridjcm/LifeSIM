import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { AlertProvider } from './context/AlertContext.jsx';
import { AppointmentProvider } from './context/AppointmentContext.jsx';
import { BankProvider } from './context/BankContext.jsx';

// Use provider for the Alert and User contexts for the wrapping of the App component
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <AlertProvider>
        <BankProvider>
          <AppointmentProvider>
            <App />
          </AppointmentProvider>
        </BankProvider>
      </AlertProvider>
    </UserProvider>
  </StrictMode>,
);
