import { useMemo, useState } from 'react';
import { activitiesUser, menu } from '../../../utils/data.js';
import ContentCafeteria from './ContentCafeteria.jsx';

// Handle menu display as scrollable list (no pagination)
export default function Index({ statusCard }) {
  const displayedItems = useMemo(() => {
    return statusCard === 'activitiesUser' ? activitiesUser : menu;
  }, [statusCard]);

  const [selectedProducts, setSelectedProducts] = useState([]);

  if (!Array.isArray(displayedItems)) {
    console.error('Error: displayedItems is not an array', displayedItems);
    return <p>No products available to display.</p>;
  }

  return (
    <div className="h-[calc(100vh-150px)] overflow-y-auto p-2">
      <ContentCafeteria
        itemsToDisplay={displayedItems} 
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
    </div>
  );
}
