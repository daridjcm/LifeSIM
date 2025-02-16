import { useState } from "react";
import itemsGrocery from "./itemsGrocery.json";
import activitiesUser from "../../../utils/List";
import { Index } from "./Grocery";


export default function ContentGrocery({ statusCard }) {
  const itemsArray = itemsGrocery.products;
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
