import { Router } from "express";
import { postCart, getCart, deleteItemsCart } from "../controllers/sellingControllers.js";
import { tokenValidation } from "../middlewares/tokenValidationMiddlewares.js";
import ProductModelValidation from "../middlewares/productModelValidationMiddleware.js";

const sellingRouter = Router();

sellingRouter.use(tokenValidation);

sellingRouter.post("/post-cart", ProductModelValidation, postCart);

sellingRouter.get("/get-cart", getCart);

sellingRouter.delete("/deleteCartItem/:itemId", deleteItemsCart);

export default sellingRouter;