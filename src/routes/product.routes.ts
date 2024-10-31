import { Router, Request, Response } from "express";
import { Product, ProductRequestBody } from "../types/product";
import { v4 as uuidV4 } from "uuid";

const productRouter = Router();

// In-memory Database
let products: Product[] = [];

// Get all products
productRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json(products);
});

// Add one product
productRouter.post(
  "/",
  (req: Request<{}, {}, ProductRequestBody>, res: Response) => {
    const newProducts: Product = {
      id: uuidV4(),
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    };
    products = [...products, newProducts];
    res.status(201).send(`New product added successfully...`);
  }
);

// Get product by id
productRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const foundProduct = products.find((product) => product.id === id);
  if (foundProduct) {
    res.status(200).json(foundProduct);
  }
  res.status(404).send(`Product not found.`);
});

// Edit product by id
productRouter.put(
  "/:id",
  (req: Request<{ id: string }, {}, ProductRequestBody>, res: Response) => {
    const { id } = req.params;
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      const updatedProduct = {
        ...products[productIndex],
        name: req.body.name ?? products[productIndex].name,
        description: req.body.description ?? products[productIndex].description,
        price: req.body.price ?? products[productIndex].price,
      };
      products[productIndex] = updatedProduct;
      res.status(201).json(updatedProduct);
    }
    res.status(404).send(`Product not found.`);
  }
);

// Delete product by id
productRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const foundProduct = products.find((product) => product.id === id);
  if (foundProduct) {
    products = products.filter((product) => product.id !== id);
    res.status(200).send(`Product was deleted successfully...!`);
  }
  res.status(404).send(`Product not found.`);
});

export default productRouter;
