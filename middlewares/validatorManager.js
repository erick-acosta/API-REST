import { validationResult, body } from "express-validator";

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const bodyRegisterValidator = 
[ 
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
    }

),
 validationResultExpress,
];

export const bodyLoginValidator = [ 
    body('email', "Email invalido")
    .trim()
    .isEmail()
    .normalizeEmail(), 
    
    body('password', "Minimo 6 caracteres")
    .trim()
    .isLength({min: 6}),
    validationResultExpress,
];