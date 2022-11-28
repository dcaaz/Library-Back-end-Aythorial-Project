import { Router } from "express";
import { postSale } from "../controllers/sellingControllers.js";
import { tokenValidation } from "../middlewares/tokenValidationMiddlewares.js";
import ProductModelValidation from "../middlewares/productModelValidationMiddleware.js";

const sellingRouter = Router();

sellingRouter.use(tokenValidation)
sellingRouter.post("/post-sale", postSale)

export default sellingRouter;