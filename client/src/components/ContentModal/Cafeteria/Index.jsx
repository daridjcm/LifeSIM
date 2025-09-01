import { useMemo } from 'react';
import { activitiesUser, menu } from '../../../utils/data.js';
import ContentCafeteria from './ContentCafeteria.jsx';

export default function Index({ statusCard }) {
  const displayedItems = useMemo(() => {
    return statusCard === 'activitiesUser' ? activitiesUser : menu;
  }, [statusCard]);

  if (!Array.isArray(displayedItems)) {
    console.error('Error: displayedItems is not an array', displayedItems);
    return <p>No products available to display.</p>;
  }

  return (
      <div className="h-[calc(100vh-150px)] overflow-y-auto p-2">
        <ContentCafeteria itemsToDisplay={displayedItems} />
      </div>
  );
}
