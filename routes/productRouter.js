const productController = require('../controllers/productController.js')

const router = require('express').Router();

router.post('/addProduct', productController.addProduct);

module.exports = router;