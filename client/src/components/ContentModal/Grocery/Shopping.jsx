import { Checkbox, CheckboxGroup, cn, Avatar } from "@heroui/react";

function ShoppingList({ selectedItems = [] }) {
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
          defaultValue={selectedItems}
          lineThrough
        >
          {selectedItems.map((title) => (
              <Checkbox key={title} value={title}>
                <div className="flex flex-row gap-5 items-center">
                <Avatar src={title.img} />
                  <p>{title}</p>
                </div>
              </Checkbox>
          ))}
        </CheckboxGroup>
      ) : (
        <p className="text-gray-500">Not have products selected.</p>
      )}
    </>
  );
}

export default function ShoppingListTab({ selectedProducts }) {
  return (
    <>
      <p className="text-2xl font-bold">Summary to Shopping List</p>
      <ShoppingList selectedItems={selectedProducts} />
    </>
  );
}
