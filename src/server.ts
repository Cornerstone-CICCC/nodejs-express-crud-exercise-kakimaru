import express from "express";
import productRouter from "./routes/product.routes";
import pageRouter from "./routes/page.routes";

const app = express();
app.use(express.json())


// Routes
app.use('/', pageRouter)
app.use('/products', productRouter)

const PORT: number = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})