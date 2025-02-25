import { useState, useEffect } from "react";
import { Index } from "./Grocery";
import { activitiesUser, products } from "../../../utils/data"

export default function ContentGrocery({ statusCard }) {
  const itemsArray = products;
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const displayedItems = statusCard === "activitiesUser" ? activitiesUser : itemsArray;

  // Reset the current page when statusCard changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusCard]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayedItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    console.log("Page changed to:", newPage);
    setCurrentPage(newPage);
  };

  if (!Array.isArray(displayedItems)) {
    console.error("Error: displayedItems is not an array", displayedItems);
    return <p>No products available to display.</p>;
  }

  const totalPages = Math.ceil(displayedItems.length / itemsPerPage);

  return (
    <Index
      itemsToDisplay={currentItems}
      page={currentPage}
      total={totalPages}
      onChange={handlePageChange}
    />
  );
}
