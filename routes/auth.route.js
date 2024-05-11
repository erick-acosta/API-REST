import express from "express";
import { infoUser, login, register, refreshToken, logout } from "../controllers/auth.controller.js";
import {body} from "express-validator";

import { requiereToken } from "../middlewares/requiereToken.js";
import { requiereRefreshToken } from "../middlewares/requiererefreshToken.js";
import { bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validatorManager.js";
const  router = express.Router();


router.post(
    "/register", bodyRegisterValidator, register );


router.post(
    "/login", bodyLoginValidator, login );


router.get("/protected", requiereToken, infoUser);
router.get("/refresh", requiereRefreshToken, requiereToken);
router.get("/logout", logout);

export default router;