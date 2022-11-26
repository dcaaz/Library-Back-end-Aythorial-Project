import { Router } from "express";
import { getProducts, getSearchedProducts, getCategoryProducts } from "../controllers/productsControllers.js";

const noUserRouter = Router();

noUserRouter.get("/get-products/", getProducts);

noUserRouter.get("/get-products/:category", getCategoryProducts);

noUserRouter.get("/get-searched-products", getSearchedProducts);

export default noUserRouter