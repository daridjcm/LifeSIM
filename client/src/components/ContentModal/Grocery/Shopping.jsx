import { Checkbox, CheckboxGroup, cn, Image, Input, ScrollShadow, Select, SelectItem } from "@heroui/react";
import CustomButton from "../../CustomButton";
import { useState } from "react";

function ShoppingList({ selectedItems, setSelectedItems }) {
  const [sendObject, setSendObj] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(selectedItems[0]?.name || "");

  const handleQuantityChange = (quantity) => {
    const updatedItems = selectedItems.map((product) =>
      product.name === selectedProduct
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
      const res = await fetch("http://localhost:3000/api/grocery/", {
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
            orientation="vertical"
            color="primary"
            lineThrough
          >
          <ScrollShadow className="xl:h-[300px] lg:h-[200px]" hideScrollBar size={70}>
          <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-1 justify-start gap-3 m-3">
            {selectedItems.map((product) => (
              <Checkbox key={product.name} value={product.name}>
                  <Image
                    alt={product.name}
                    src={product.img}
                    width={52}
                    height={50}
                    shadow="sm"
                    radius="full"
                    className="object-cover"
                    />
                  <p className="ml-2">{product.name}</p>
                  <p className="ml-2 font-bold">${product.price}</p>
              </Checkbox>
            ))}
            </div>
          </ScrollShadow>
          </CheckboxGroup>
          <div className="flex items-start justify-around sm:flex-col lg:flex-row mb-3 mt-5">
            <label className="mr-2" htmlFor="productSelect">Select product</label>
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
                <SelectItem key={product.name} value={product.name}>
                  {product.name}
                </SelectItem>
              ))}
            </Select>
            <label className="mr-2 ml-3" htmlFor="quantityInput">Quantity</label>
            <Input 
              id="quantityInput"
              variant="bordered"
              type="number"
              value={selectedItems.find((product) => product.name === selectedProduct)?.quantity || 1}
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
