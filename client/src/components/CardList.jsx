import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  Button,
  Tooltip,
  Image,
} from '@heroui/react';
import {
  ArrowLeftEndOnRectangleIcon,
  ShoppingCartIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid';
import ModalAction from './ModalAction.jsx';
import { menu } from '../utils/data.js';

const CardList = React.memo(
  ({
    statusCard,
    iconShow,
    itemsToDisplay,
    selectedProducts,
    setSelectedProducts,
  }) => {
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

    const closeModal = () => setIsModalOpen(false);

    // Detectar si estamos mostrando productos
    const isProducts =
      statusCard === 'itemsGrocery' ||
      Array.isArray(itemsToDisplay?.products) ||
      (Array.isArray(itemsToDisplay) && itemsToDisplay[0]?.category);

    const displayItems = Array.isArray(itemsToDisplay)
      ? itemsToDisplay
      : itemsToDisplay?.activitiesUser ??
        itemsToDisplay?.products ??
        [];

    const gridClasses = isProducts
      ? 'grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 px-2'
      : 'grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 mb-5';

    return (
      <>
        <div className={gridClasses}>
          {displayItems.length === 0 ? (
            <p>No items to show.</p>
          ) : (
            displayItems.map((item, index) => (
              <Card
                key={index}
                shadow="md"
                className={isProducts ? 'w-full min-h-[200px]' : 'w-full'}
                aria-label={item.name}
              >
                <CardBody className="overflow-hidden p-0">
                  <div
                    className={`flex justify-center items-center m-2 w-full ${
                      isProducts ? 'h-[150px]' : 'h-[250px]'
                    }`}
                  >
                    {/* If is NOT combo → single image */}
                    {item.category !== 'Combo' ? (
                      <Image
                        src={item.img}
                        alt={item.name}
                        isBlurred
                        classNames={{
                          img: `object-contain ${
                            isProducts
                              ? 'max-h-[140px]'
                              : 'max-h-[230px]'
                          } w-auto`,
                        }}
                      />
                    ) : (
                      // If is combo → multiple images of products
                      <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                        {item.products.map((prodId) => {
                          const product = menu.find((p) => p.id === prodId);
                          return (
                            <Image
                              key={prodId}
                              src={product?.img}
                              alt={product?.name}
                              isBlurred
                              classNames={{
                                img: 'object-contain max-h-[100px] w-auto',
                              }}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {!iconShow && (
                    <div className="flex gap-2 justify-end mx-4">
                      <div className="flex justify-start items-start w-full lg:flex-row flex-col gap-2">
                        <p
                          className={`font-bold ${
                            isProducts ? 'text-sm' : 'text-base'
                          }`}
                        >
                          {item.name}
                        </p>
                      <Tooltip
                        color={getColor2(item).color}
                        content={getColor2(item).content}
                        delay={1000}
                        >
                        <Chip
                          className="cursor-pointer"
                          color={getColor2(item).color}
                          variant="bordered"
                          >
                          {item.category}
                        </Chip>
                      </Tooltip>

                      <Tooltip color={'success'} delay={1000}>
                        <Chip
                          className="cn base closeButton cursor-pointer"
                          color={'success'}
                          variant="bordered"
                          >
                          {item.price} LSD
                        </Chip>
                      </Tooltip>
                    </div>
                          </div>
                  )}
                </CardBody>

                <CardFooter className="text-small justify-between">
                  <p
                    className={`text-default-500 ${
                      isProducts ? 'text-sm' : 'text-xl'
                    }`}
                  >
                    {item.desc}
                  </p>
                  <div className="flex gap-2 w-full">
                    <Button
                      size={isProducts ? 'sm' : 'md'}
                      isPressible
                      onPress={() =>
                        iconShow ? handleActions(item) : handleProducts(item)
                      }
                      className={`${getColor(item)} w-full`}
                    >
                      {iconShow ? (
                        <>
                          {item.name}
                          <ArrowLeftEndOnRectangleIcon className="size-5 text-zinc-100 opacity-60" />
                        </>
                      ) : selectedProducts.includes(item) ? (
                        <>
                          {item.name} added
                          <CheckCircleIcon className="size-5 text-green-500 ml-1" />
                        </>
                      ) : (
                        <>
                          Buy {item.price} LSD
                          <ShoppingCartIcon className="size-4 text-white ml-1" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>

        {isModalOpen && selectedItem && (
          <ModalAction item={selectedItem} onClose={closeModal} />
        )}
      </>
    );
  },
);

export default CardList;

// --- helpers
function getColor(item) {
  switch (item.name) {
    case 'Work':
      return 'text-blue-800 bg-blue-400';
    case 'Bank':
      return 'text-cyan-800 bg-cyan-400';
    case 'Grocery':
      return 'text-green-800 bg-green-400';
    case 'Hospital':
      return 'text-blue-800 bg-blue-400';
    case 'Cafeteria':
      return 'text-orange-800 bg-orange-400';
    case 'Home':
      return 'text-red-800 bg-red-400';
    default:
      return 'text-zinc-300 bg-zinc-900';
  }
}

function getColor2(item) {
  switch (item.category) {
    case 'Protein':
      return { color: 'primary' };
    case 'Fruit':
      return { color: 'secondary' };
    case 'Vegetable':
      return { color: 'success' };
    case 'Carbohydrate':
      return { color: 'warning' };
    case 'Coffees':
      return { color: 'default' };
    case 'Bakery':
      return { color: 'secondary' };
    case 'Desserts':
      return { color: 'primary' };
    case 'Drinks':
      return { color: 'warning' };
    case 'Combo':
      return {
        color: 'danger',
        content: 'With two products included and discount %!',
      };
    default:
      return { color: 'default', content: 'Others.' };
  }
}
