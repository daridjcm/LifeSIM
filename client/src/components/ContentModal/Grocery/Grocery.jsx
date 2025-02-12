import { useState } from "react";
import itemsGrocery from "./itemsGrocery.json";
import activitiesUser from "../../../utils/List";
import CardList from "../../CardList";
import { Pagination } from "@heroui/react";

export const itemsArray = itemsGrocery.products;

export default function ContentGrocery({ statusCard }) {
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
    <>
      <CardList
        statusCard={"itemsGrocery"}
        iconShow={false}
        itemsToDisplay={currentItems} 
      />

      <Pagination
        showControls
        page={currentPage}
        total={totalPages}
        size="lg"
        onChange={handlePageChange}
        siblings={1}
        boundaries={1}
      />
    </>
  );
}
