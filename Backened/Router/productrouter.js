const express = require('express');
const { postProduct, getProducts } = require('../Controller/Product');
const productrouter = express.Router();

productrouter.post("/add",postProduct);
productrouter.get("/get",getProducts);

module.exports = productrouter;