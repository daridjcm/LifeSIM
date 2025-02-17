import { useState } from "react";
import activitiesUser from "../../../utils/List";
import { Index } from "./Grocery";
import products from "../../../utils/Products";

export default function ContentGrocery({ statusCard }) {
  const itemsArray = Object.values(products.products);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const displayedItems = statusCard === "activitiesUser" ? activitiesUser : itemsArray;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayedItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    console.log("Page changed to:", newPage);
    setCurrentPage(newPage);
  };

  if (!Array.isArray(displayedItems)) {
    console.error("Error: displayedItems is not an array", displayedItems);
    return null; // Avoid breaking the app
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
