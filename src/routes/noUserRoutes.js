import { Router } from "express";
import { getProducts, getSearchedProducts } from "../controllers/productsControllers.js";

const noUserRouter = Router();

noUserRouter.get("/get-products", getProducts);

noUserRouter.get("/get-searched-products", getSearchedProducts);

export default noUserRouter