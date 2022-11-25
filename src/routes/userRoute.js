import {Router} from "express";
import { postSignIn, postSignUp, deleteSignIn } from "../controllers/usersController.js";

const router = Router()

router.post("/sign-up", postSignUp);

router.post("/sign-in", postSignIn);

router.delete("/logout/:token", deleteSignIn);

export default router;