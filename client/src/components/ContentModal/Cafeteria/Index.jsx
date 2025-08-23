import { useMemo } from 'react';
import { useState, useEffect } from 'react';
import { activitiesUser, menu } from '../../../utils/data.js';
import ContentCafeteria from './ContentCafeteria.jsx';

// Handle products display and pagination
export default function Index({ statusCard }) {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const displayedItems = useMemo(() => {
    return statusCard === 'activitiesUser' ? activitiesUser : menu;
  }, [statusCard]);

  // Reset the current page when statusCard changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusCard]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = useMemo(() => {
    return displayedItems.slice(indexOfFirstItem, indexOfLastItem);
  }, [displayedItems, indexOfFirstItem, indexOfLastItem]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (!Array.isArray(displayedItems)) {
    console.error('Error: displayedItems is not an array', displayedItems);
    return <p>No products available to display.</p>;
  }

  const totalPages = Math.ceil(displayedItems.length / itemsPerPage);

  return (
    <ContentCafeteria
      itemsToDisplay={currentItems}
      page={currentPage}
      total={totalPages}
      onChange={handlePageChange}
    />
  );
}
