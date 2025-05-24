import React, { createContext, useContext, useState, useEffect } from 'react';

const BankContext = createContext();

export const useBank = () => useContext(BankContext);

export const BankProvider = ({ children }) => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBankAccounts = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/bank', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data?.error || 'Failed to fetch bank accounts');

      setBankAccounts(data.bankAccounts);
    } catch (err) {
      console.error('Error fetching bank accounts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  return (
    <BankContext.Provider
      value={{
        bankAccounts,
        loading,
        error,
        refetchBankAccounts: fetchBankAccounts,
      }}
    >
      {children}
    </BankContext.Provider>
  );
};
