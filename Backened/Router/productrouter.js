const express = require('express');
const productrouter = express.Router();
const { postProduct, getProducts, productid } = require('../Controller/Product');
const  protect  = require('../middlewear/usermiddle');


productrouter.post("/add",postProduct);
productrouter.get("/get",protect,getProducts);
productrouter.get("/:id",protect,productid);

module.exports = productrouter;