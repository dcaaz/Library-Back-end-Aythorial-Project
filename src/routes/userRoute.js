import {Router} from "express";
import { postSignIn, postSignUp, deleteSignIn } from "../controllers/usersController.js";
import SignUpModelValidation from "../middlewares/signUpValidationMiddleware.js";

const router = Router()

router.post("/sign-up", SignUpModelValidation, postSignUp);

router.post("/sign-in", postSignIn);

router.delete("/logout/:token", deleteSignIn);

export default router;