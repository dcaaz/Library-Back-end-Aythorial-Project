import { Router } from "express";
import {postProducts} from "../controllers/productsControllers.js";
import {tokenValidation} from "../middlewares/tokenValidationMiddlewares.js";
import ProductModelValidation from "../middlewares/productModelValidationMiddleware.js"
 
const productsRouter = Router();

productsRouter.use(tokenValidation);

productsRouter.post("/post-products", ProductModelValidation, postProducts);


export default productsRouter;