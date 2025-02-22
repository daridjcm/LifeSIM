import { Checkbox, CheckboxGroup, cn, Image, Input, Select, SelectItem } from "@heroui/react";
import CustomButton from "../../CustomButton";
import { useState } from "react";

function ShoppingList({ selectedItems, setSelectedItems }) {
  const [sendObject, setSendObj] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(selectedItems[0]?.title || "");

  const handleQuantityChange = (quantity) => {
    const updatedItems = selectedItems.map((product) =>
      product.title === selectedProduct
        ? { ...product, quantity, price: (product.basePrice * quantity).toFixed(2) }
        : product
    );
    setSelectedItems(updatedItems);
  };

  const handleProductChange = (title) => {
    setSelectedProduct(title);
  };

  const handleSend = async () => {
    console.log("Send to Back-End:", JSON.stringify({ selectedItems }));
    setSendObj(true);
    try {
      const res = await fetch("http://localhost:3000/grocery/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedItems }),
      });
      const data = await res.json();
      setTimeout(() => {
        console.log("Response of server:", data);
        setSendObj(false);
      }, 2000);
    } catch (error) {
      setSendObj(false);
      console.error("Error to send the datas:", error);
    }
  };

  return (
    <>
      <p>Products selected to buy.</p>
      {selectedItems.length > 0 ? (
        <>
          <CheckboxGroup
            classNames={{
              base: cn(
                "inline-flex w-full bg-slate-50 mt-4 mb-4",
                "hover:bg-slate-100 items-start justify-start",
                "cursor-pointer rounded-lg gap-2 p-4 border-transparent border-black"
              ),
            }}
          >
            {selectedItems.map((product) => (
              <Checkbox key={product.title} value={product.title} lineThrough={true}>
                <div className="flex flex-row gap-5 items-center">
                  <Image
                    alt={product.title}
                    src={product.img}
                    width={32}
                    height={32}
                    shadow="md"
                    radius="full"
                    className="object-cover"
                  />
                  <p>{product.title}</p>
                  <p className="m-2 font-bold">${product.price}</p>
                </div>
              </Checkbox>
            ))}
          </CheckboxGroup>
          <div className="flex items-start sm:flex-col lg:flex-row">
            <label className="mr-3" htmlFor="productSelect">Select product</label>
            <Select
              id="productSelect"
              value={selectedProduct}
              onChange={(e) =>
                handleProductChange(e.target.value)
              }
              className="border border-gray-300 rounded-md text-center"
              aria-label="Select product"
            >
              {selectedItems.map((product) => (
                <SelectItem key={product.title} value={product.title}>
                  {product.title}
                </SelectItem>
              ))}
            </Select>
            <label className="ml-3" htmlFor="quantityInput">Quantity</label>
            <Input 
              id="quantityInput"
              variant="bordered"
              type="number"
              value={selectedItems.find((product) => product.title === selectedProduct)?.quantity || 1}
              onChange={(e) =>
                handleQuantityChange(parseInt(e.target.value, 10))
              }
              className="border border-gray-300 rounded-md text-center"
              min={1}
              max={50}
            />
          </div>
            <CustomButton
              label={"Save changes"}
              onPress={handleSend}
              isLoading={sendObject}
              loadingText="Saving changes..."
              id="handleSend"
            />
        </>
      ) : (
        <p className="text-gray-500">Not have products selected.</p>
      )}
    </>
  );
}

export default function ShoppingListTab({ selectedProducts = [] }) {
  const [selectedItems, setSelectedItems] = useState(
    selectedProducts.map((product) => ({
      ...product,
      basePrice: product.price,
      quantity: 1,
    }))
  );

  return (
    <>
      <p className="text-2xl font-bold">Summary to Shopping List</p>
      <ShoppingList selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
    </>
  );
}
