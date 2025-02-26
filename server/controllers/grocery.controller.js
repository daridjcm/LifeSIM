let groceryItems = [];

export const saveGrocery = async (req, res) => {
  try {
    const { selectedItems } = req.body;
    
    if (!Array.isArray(selectedItems)) {
      return res.status(400).json({ error: 'selectedItems must be an array' });
    }

    // Clear existing items and save new ones in memory
    groceryItems = selectedItems.map(item => ({
      name: item.name,
      category: item.category,
      price: parseFloat(item.price),
      basePrice: parseFloat(item.basePrice),
      quantity: parseInt(item.quantity),
      img: item.img
    }));

    res.status(201).json({ 
      message: 'Groceries saved successfully', 
      groceries: groceryItems 
    });
  } catch (error) {
    console.error('Error saving groceries:', error);
    res.status(500).json({ 
      error: 'Error saving groceries', 
      details: error.message 
    });
  }
};

export const getGroceries = async (req, res) => {
  try {
    res.status(200).json({ groceries: groceryItems });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error fetching groceries', 
      details: error.message 
    });
  }
};