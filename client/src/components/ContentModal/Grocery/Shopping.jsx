import { Checkbox, CheckboxGroup, cn, Image } from "@heroui/react";
import CustomButton from "../../CustomButton";
import { useState } from "react";

function ShoppingList({ selectedItems }) {
  const [sendObject, setSendObj] = useState(false);

  const handleSend = async () => {
    console.log("Send to Back-End:", JSON.stringify({ selectedItems }));
    setSendObj(true)
    try {
      const res = await fetch("http://localhost:3000/grocery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({selectedItems}),
      });
      const data = await res.json();
      setTimeout(() => {
        console.log("Response of server:", data);
        setSendObj(false)
      }, 2000)
    }
    catch (error) {
      setSendObj(false)
      console.error("Error to send the datas:", error)
    }
  }

  return (
    <>
      <p>Products selected to buy.</p>
      {selectedItems.length > 0 ? (
        <CheckboxGroup
          classNames={{
            base: cn(
              "inline-flex w-full bg-slate-50 mt-4",
              "hover:bg-slate-100 items-start justify-start",
              "cursor-pointer rounded-lg gap-2 p-4 border-transparent border-black",
            )
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
                </div>
                  <p className="m-2 font-bold">${product.price}</p>
              </Checkbox>
          ))}
          <CustomButton 
            label={"Save changes"}
            onPress={handleSend}
            isLoading={sendObject}
            loadingText="Saving changes..."
            id="handleSend"	
          />
        </CheckboxGroup>
      ) : (
        <p className="text-gray-500">Not have products selected.</p>
      )}
    </>

  );
}

export default function ShoppingListTab({ selectedProducts = [] }) {
  return (
    <>
      <p className="text-2xl font-bold">Summary to Shopping List</p>
      <ShoppingList selectedItems={selectedProducts || []} />
    </>
  );
}
