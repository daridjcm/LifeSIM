import { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  Button,
  Tooltip,
} from "@heroui/react";
import {
  ArrowLeftEndOnRectangleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import ModalAction from "./ModalAction.jsx";

export default function CardList({
  statusCard,
  iconShow,
  itemsToDisplay,
  selectedProducts,
  setSelectedProducts,
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleActions(item) {
    setSelectedItem(item);
    setIsModalOpen(true);
  }

  const handleProducts = (itemProduct) => {
    setSelectedProducts((prev) =>
      prev.includes(itemProduct)
        ? prev.filter((i) => i !== itemProduct)
        : [...prev, itemProduct],
    );
  };

  function closeModal() {
    setIsModalOpen(false);
  }

  function getColor(item) {
    switch (item.name) {
      case "Work":
        return "text-blue-800 bg-blue-400";
      case "Bank":
        return "text-cyan-800 bg-cyan-400";
      case "Grocery":
        return "text-green-800 bg-green-400";
      case "Mall":
        return "text-gray-800 bg-gray-400";
      case "Cafeteria":
        return "text-orange-800 bg-orange-400";
      case "Home":
        return "text-red-800 bg-red-400";
      default:
        return "text-zinc-300 bg-zinc-900";
    }
  }

  function getColor2(item) {
    switch (item.category) {
      case "Fast Food":
        return { color: "primary", content: "Consumed quickly, less filling." };
      case "Fruit":
        return {
          color: "secondary",
          content: "Combines well with others, serves satiety.",
        };
      case "Vegetable":
        return {
          color: "success",
          content: "Combines well with others, serves satiety",
        };
      case "Drink":
        return {
          color: "danger",
          content: "Excessive consumption shortens longevity.",
        };
      default:
        return { color: "default", content: "Others." };
    }
  }

  const displayItems = Array.isArray(itemsToDisplay)
    ? itemsToDisplay
    : (itemsToDisplay?.activitiesUser ?? itemsToDisplay?.products ?? []);

  return (
    <>
      <div className="gap-x-1 gap-y-5 mt-5 mb-5 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
        {displayItems === 0 ? (
          <p>No hay productos para mostrar</p>
        ) : (
          displayItems.map((item, index) => (
            <Card
              key={index}
              shadow="sm"
              className="m-auto max-w-[90%] min-w-[90%]"
              aria-label={item.name}
            >
              <CardBody className="overflow-hidden p-0">
                <img
                  src={item.img}
                  alt={item.name}
                  className={
                    iconShow
                      ? "w-full h-full"
                      : "object-cover w-full max-w-fit sm:h-24 md:h-20 lg:max-h-fit m-auto"
                  }
                />
                {iconShow ? null : (
                  <div className="flex justify-end mx-4">
                    <Tooltip
                      color={getColor2(item).color}
                      content={getColor2(item).content}
                      delay={1000}
                    >
                      <Chip
                        className="cn base closeButton cursor-pointer"
                        color={getColor2(item).color}
                        variant="bordered"
                      >
                        {item.category}
                      </Chip>
                    </Tooltip>
                  </div>
                )}
              </CardBody>
              <CardFooter className="text-small justify-between">
                <p className="text-default-500 text-xl">{item.desc}</p>
                <div className={iconShow ? "flex gap-2" : "flex gap-2 w-full"}>
                  <Button
                    size="md"
                    isPressible
                    onPress={() =>
                      iconShow ? handleActions(item) : handleProducts(item)
                    }
                    className={`${getColor(item)} w-full`}
                  >
                    {iconShow ? (
                      <>
                        {item.name}
                        <ArrowLeftEndOnRectangleIcon className="size-7 text-zinc-100 opacity-60" />
                      </>
                    ) : (
                      <span className="flex items-center text-pretty">
                        {selectedProducts.includes(item)
                          ? `${item.name} added`
                          : `Buy ${item.name} for ${item.price}`}
                        <ShoppingCartIcon className="size-5 text-white ml-1" />
                      </span>
                    )}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <ModalAction item={selectedItem} onClose={closeModal} />
      )}
    </>
  );
}
