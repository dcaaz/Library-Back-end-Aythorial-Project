import {Router} from "express";

import { postSignIn, postSignUp } from "../controllers/usersController.js";

const router = Router()

router.post("/sign-up", postSignUp);

router.post("/sign-in", postSignIn);

export default router;