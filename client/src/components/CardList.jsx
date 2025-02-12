import { useState } from "react";
import { Card, CardBody, CardFooter, Image, Button } from "@heroui/react";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";
import ModalAction from "./ModalAction";

export default function CardList({ statusCard, iconShow, itemsToDisplay }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleActions(item) {
    setSelectedItem(item);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function getColor(item) {
    return item.title === "Work"
      ? "text-blue-800 bg-blue-400"
      : item.title === "Bank"
        ? "text-cyan-800 bg-cyan-400"
        : item.title === "Grocery"
          ? "text-green-800 bg-green-400"
          : item.title === "Mall"
            ? "text-gray-800 bg-gray-400"
            : item.title === "Cafeteria"
              ? "text-orange-800 bg-orange-400"
              : item.title === "Home"
                ? "text-red-800 bg-red-400"
                : "text-zinc-300 bg-zinc-900";
  }

  console.log(itemsToDisplay);

  const displayItems = Array.isArray(itemsToDisplay) 
    ? itemsToDisplay
    : itemsToDisplay?.activitiesUser || [];

  return (
    <>
      <div className="gap-x-1 gap-y-5 mt-5 mb-5 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        {displayItems.length === 0 ? (
          <p>Not have products for display</p>
        ) : (
          displayItems.map((item, index) => (
            <Card key={index} shadow="sm" className="m-auto max-w-[90%]" aria-label={item.title}>
              <CardBody className="overflow-hidden p-0">
                <Image
                  alt={item.title}
                  className="object-cover"
                  radius="md"
                  shadow="sm"
                  width={"100%"}
                  height={iconShow ? "100%" : "40%"}
                  src={item.img}
                  isBlurred
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <p className="text-default-500">{item.desc}</p>
                <Button
                  size="sm"
                  isPressible
                  onPress={() => handleActions(item)}
                  className={iconShow ? `${getColor(item)} w-[70%] text-sm` : `${getColor(item)} w-full`}
                >
                  {iconShow ? (
                    <>
                    {item.title}
                    <ArrowLeftEndOnRectangleIcon className="size-7 text-zinc-100 opacity-60" />
                    </>
                  ) : `Buy ${item.title}`}
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {isModalOpen && selectedItem && <ModalAction item={selectedItem} onClose={closeModal} />}
    </>
  );
}
