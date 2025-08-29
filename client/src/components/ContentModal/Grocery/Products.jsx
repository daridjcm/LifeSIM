import { useMemo, useState } from 'react';
import CardList from '../../CardList.jsx';
import CustomButton from '../../CustomButton.jsx';

export default function ProductsTab({
  itemsToDisplay = [],
  selectedProducts = [],
  setSelectedProducts = () => {},
}) {
  // Estado: categoría activa
  const [activeCategory, setActiveCategory] = useState('All');

  // Sacar categorías únicas
  const categories = useMemo(() => {
    if (!Array.isArray(itemsToDisplay)) return [];
    return ['All', ...new Set(itemsToDisplay.map(item => item.category))];
  }, [itemsToDisplay]);

  // Filtrar productos según categoría
  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return itemsToDisplay;
    return itemsToDisplay.filter(item => item.category === activeCategory);
  }, [itemsToDisplay, activeCategory]);

  return (
    <div className="h-[calc(100vh-200px)] overflow-y-auto p-2">
      {/* Botones de categorías debajo del tab */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category, index) => (
          <CustomButton
            key={index}
            label={category}
            onPress={() => setActiveCategory(category)}
            variant={activeCategory === category ? 'solid' : 'bordered'}
            size="sm"
          />
        ))}
      </div>

      {/* Lista de productos filtrados */}
      <CardList
        statusCard="itemsGrocery"
        iconShow={false}
        itemsToDisplay={filteredItems}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
    </div>
  );
}
