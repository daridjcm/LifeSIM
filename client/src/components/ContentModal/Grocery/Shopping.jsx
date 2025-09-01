import { useShoppingCart } from '../../../context/ShoppingContext.jsx';
import { ScrollShadow, Image } from '@heroui/react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { menu } from '../../../utils/data.js';

function ShoppingList() {
  const { selectedProducts, removeProduct, updateQuantity } = useShoppingCart();

  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    }
  };

  const getComboImages = (combo) => {
    return combo.products
      .map((id) => menu.find((p) => p.id === id)?.img)
      .filter(Boolean); 
  };

  return (
    <div className="space-y-4">
      <p>Products Selected: {selectedProducts.length}</p>

      <ScrollShadow className="h-[calc(100vh-300px)]" hideScrollBar size={70}>
        <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-1 gap-3 m-3">
          {selectedProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col bg-white rounded-lg shadow p-3"
            >
              {"products" in product ? (
                <div className="flex gap-2 justify-center">
                  {getComboImages(product).map((src, index) => (
                    <Image
                      key={index}
                      alt={`${product.name} - part ${index + 1}`}
                      src={src}
                      width={100}
                      height={80}
                      className="object-contain rounded"
                    />
                  ))}
                </div>
              ) : (
                <Image
                  alt={product.name}
                  src={product.img}
                  width={150}
                  height={100}
                  className="object-contain rounded"
                />
              )}

              <div className="mt-2">
                <p className="font-medium">{product.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(product.id, product.quantity - 1)
                      }
                      className="px-2 py-1 bg-gray-100 rounded"
                    >
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(product.id, product.quantity + 1)
                      }
                      className="px-2 py-1 bg-gray-100 rounded"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-bold">${product.price}</p>
                </div>
                <button
                  onClick={() => removeProduct(product.id)}
                  className="mt-2 text-red-500 hover:text-red-700"
                  title="Remove"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
}

export default function ShoppingListTab() {
  const { selectedProducts } = useShoppingCart();

  if (selectedProducts.length === 0) {
    return <p className="text-gray-500">No products selected.</p>;
  }

  return (
    <>
      <p className="text-2xl font-bold">Shopping List Summary</p>
      <ShoppingList />
    </>
  );
}
