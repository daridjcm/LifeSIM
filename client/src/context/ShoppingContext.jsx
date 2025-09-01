import { createContext, useContext, useState, useEffect } from 'react';

const ShoppingContext = createContext();

const STORAGE_KEY = 'selectedItems';

export function ShoppingProvider({ children }) {
  const [selectedProducts, setSelectedProducts] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    try {
      const { items } = JSON.parse(stored);
      return items || [];
    } catch {
      return [];
    }
  });

  const addProduct = (product) => {
    setSelectedProducts(prev => [...prev, { ...product, quantity: 1 }]);
  };

  const removeProduct = (productId) => {
    setSelectedProducts(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setSelectedProducts(prev => 
      prev.map(item => item.id === productId ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => {
    setSelectedProducts([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: selectedProducts }));
  }, [selectedProducts]);

  return (
    <ShoppingContext.Provider value={{
      selectedProducts,
      addProduct,
      removeProduct,
      updateQuantity,
      clearCart
    }}>
      {children}
    </ShoppingContext.Provider>
  );
}

export const useShoppingCart = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error('useShoppingCart must be used within a ShoppingProvider');
  }
  return context;
};