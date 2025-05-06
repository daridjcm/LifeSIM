import { Pagination } from '@heroui/react';
import CardList from '../../CardList.jsx';

// Render pagination component and list of products
export default function ProductsTab({
  itemsToDisplay = [],
  page = 1,
  total = 1,
  onChange = () => {},
  selectedProducts = [],
  setSelectedProducts = () => {},
}) {
  return (
    <>
      <CardList
        statusCard="itemsGrocery"
        iconShow={false}
        itemsToDisplay={itemsToDisplay}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />

      <Pagination
        showControls
        page={page}
        total={total}
        size="lg"
        onChange={onChange}
        siblings={1}
        boundaries={1}
        className="flex justify-center"
        showShadow
        radius="full"
      />
    </>
  );
}
