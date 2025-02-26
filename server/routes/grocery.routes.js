const express = require('express');
const { saveGrocery, getGroceries } = require('../controllers/grocery.controller');
const router = express.Router();

// Save grocery items
router.post('/grocery', saveGrocery);

// Get all groceries
router.get('/grocery', getGroceries);

module.exports = router;
