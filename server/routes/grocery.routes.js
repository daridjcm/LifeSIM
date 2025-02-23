const express = require('express');
const router = express.Router();
const groceryController = require('../controllers/grocery.controller');

router.get('/grocery', groceryController.getGroceries);
router.post('/grocery', groceryController.addGrocery);

module.exports = router;
