import { useState } from "react";
import { Card, CardBody, CardFooter, Chip, Button, } from "@heroui/react";
import { ArrowLeftEndOnRectangleIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import ModalAction from "./ModalAction";

export default function CardList({ statusCard, iconShow, itemsToDisplay, selectedProducts, setSelectedProducts }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleActions(item) {
    setSelectedItem(item);
    setIsModalOpen(true);
  }

  const handleProducts = (itemProduct) => {
    setSelectedProducts((prev) =>
      prev.includes(itemProduct.title)
        ? prev.filter((i) => i !== itemProduct.title)
        : [...prev, itemProduct.title]
    );
  };

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

  const displayItems = Array.isArray(itemsToDisplay)
    ? itemsToDisplay
    : itemsToDisplay?.activitiesUser || itemsToDisplay?.products;

  return (
    <>
      <div className="gap-x-1 gap-y-5 mt-5 mb-5 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
        {displayItems.length === 0 ? (
          <p>No hay productos para mostrar</p>
        ) : (
          displayItems.map((item, index) => (
            <Card key={index} shadow="sm" className="m-auto max-w-[90%] min-w-[90%]" aria-label={item.title}>
              <CardBody className="overflow-hidden p-0">
                <img src={item.img} alt={item.title} className={iconShow ? "w-full h-full" : "object-cover sm:w-40 sm:h-32 lg:w-full lg:h-42 m-auto"} />
                {iconShow ? null : (
                  <div className="flex justify-end mx-4">
                    <Chip color={item.category =='Fast Food' ? "primary" : item.category == 'Fruits' ? "secondary" : item.category == 'Vegetables' ? "success" : "danger" } variant="bordered">
                      {item.category}
                    </Chip>
                  </div>
                )}
              </CardBody>
              <CardFooter className="text-small justify-between">
                <p className="text-default-500 text-xl">{item.desc}</p>
                <div className={iconShow ? "flex gap-2" : "flex gap-2 w-full"}>
                  <Button
                    size="md"
                    isPressible
                    onPress={() => (iconShow ? handleActions(item) : handleProducts(item))}
                    className={`${getColor(item)} w-full`}
                  >
                    {iconShow ? (
                      <>
                        {item.title}
                        <ArrowLeftEndOnRectangleIcon className="size-7 text-zinc-100 opacity-60" />
                      </>
                    ) : (
                      <>
                        {selectedProducts.includes(item.title) ? `${item.title} added` : `Buy ${item.title} for ${item.price}`}
                        <ShoppingCartIcon className="size-5 text-white ml-1" />
                      </>
                    )}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedItem && <ModalAction item={selectedItem} onClose={closeModal} />}
    </>
  );
}
