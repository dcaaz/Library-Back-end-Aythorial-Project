import { Router } from "express";
import { getProducts, getProductById, getCategoryProducts } from "../controllers/productsControllers.js";

const noUserRouter = Router();

noUserRouter.get("/get-products/", getProducts);

noUserRouter.get("/get-products/:category", getCategoryProducts);

noUserRouter.get("/get-product-by-id", getProductById);

export default noUserRouter