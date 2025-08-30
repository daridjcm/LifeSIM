import { useMemo, useState } from 'react';
import { activitiesUser, products } from '../../../utils/data.js';
import ContentGrocery from './ContentGrocery.jsx';

// Handle products display as scrollable list (no pagination)
export default function Index({ statusCard }) {
  const displayedItems = useMemo(() => {
    return statusCard === 'activitiesUser' ? activitiesUser : products;
  }, [statusCard]);

  const [selectedProducts, setSelectedProducts] = useState([]);

  if (!Array.isArray(displayedItems)) {
    console.error('Error: displayedItems is not an array', displayedItems);
    return <p>No products available to display.</p>;
  }

  return (
    <div className="h-[calc(100vh-150px)] overflow-y-auto p-2">
      <ContentGrocery
        itemsToDisplay={displayedItems} 
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
    </div>
  );
}
