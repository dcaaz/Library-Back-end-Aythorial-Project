import { Router } from "express";
import {
  postSignIn,
  postSignUp,
  deleteSignIn,
  changeUserData,
} from "../controllers/usersController.js";
import SignUpModelValidation from "../middlewares/signUpValidationMiddleware.js";
import { tokenValidation } from "../middlewares/tokenValidationMiddlewares.js";
import { SignInModelValidation } from "../middlewares/signInModelValidationMiddleware.js";

const userRouter = Router();

userRouter.post("/sign-up", SignUpModelValidation, postSignUp);

userRouter.post("/sign-in", SignInModelValidation, postSignIn);

userRouter.delete("/logout", tokenValidation, deleteSignIn);

userRouter.put("/change-data", tokenValidation, changeUserData);

export default userRouter;
