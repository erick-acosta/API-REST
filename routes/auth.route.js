import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import {body} from "express-validator";
import {validationResultexpress} from "../middlewares/validationResult.js";
const  router = express.Router();


router.post("/register", [
    body('email', "Email invalido")
    .trim()
    .isEmail()
    .normalizeEmail(), 

body('password', "Minimo 6 caracteres")
    .trim()
    .isLength({min: 6}),

    body('password', "Contraseña invalida")
    .trim()
    .isLength({min: 6})
    .custom((value, {req}) => {
    if(value !== req.body.repassword){  
        throw new Error("Las contraseñas no coinciden");
    }
    return value;
})], 
validationResultexpress, register );
router.post("/login",
 [   body('email', "Email invalido")
.trim()
.isEmail()
.normalizeEmail(), 

body('password', "Minimo 6 caracteres")
.trim()
.isLength({min: 6}),],
validationResultexpress , login );



export default router;