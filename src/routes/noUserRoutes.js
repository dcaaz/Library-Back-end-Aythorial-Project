import { Router } from "express";
import { getProducts, getProductById, getCategoryProducts } from "../controllers/productsControllers.js";

const noUserRouter = Router();

noUserRouter.get("/get-product-by-id/:bookId", getProductById);

noUserRouter.get("/get-products/", getProducts);

noUserRouter.get("/get-products/:category", getCategoryProducts);



export default noUserRouter