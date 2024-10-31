"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const productRouter = (0, express_1.Router)();
// In-memory Database
let products = [];
// Get all products
productRouter.get("/", (req, res) => {
    res.status(200).json(products);
});
// Add one product
productRouter.post("/", (req, res) => {
    const newProducts = {
        id: (0, uuid_1.v4)(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    };
    products = [...products, newProducts];
    res.status(201).send(`New product added successfully...`);
});
// Get product by id
productRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const foundProduct = products.find((product) => product.id === id);
    if (foundProduct) {
        res.status(200).json(foundProduct);
    }
    res.status(404).send(`Product not found.`);
});
// Edit product by id
productRouter.put("/:id", (req, res) => {
    var _a, _b, _c;
    const { id } = req.params;
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
        const updatedProduct = Object.assign(Object.assign({}, products[productIndex]), { name: (_a = req.body.name) !== null && _a !== void 0 ? _a : products[productIndex].name, description: (_b = req.body.description) !== null && _b !== void 0 ? _b : products[productIndex].description, price: (_c = req.body.price) !== null && _c !== void 0 ? _c : products[productIndex].price });
        products[productIndex] = updatedProduct;
        res.status(201).json(updatedProduct);
    }
    res.status(404).send(`Product not found.`);
});
// Delete product by id
productRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const foundProduct = products.find((product) => product.id === id);
    if (foundProduct) {
        products = products.filter((product) => product.id !== id);
        res.status(200).send(`Product was deleted successfully...!`);
    }
    res.status(404).send(`Product not found.`);
});
exports.default = productRouter;
