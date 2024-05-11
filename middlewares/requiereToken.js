import jwt from 'jsonwebtoken'

export const requiereToken = (req, res, next) => {
    try {

        let token = req.headers?.authorization;
        if (!token) 
            throw new Error ('No existe el Token en el Header bearer');

        token = token.split(" ")[1];
        const {uid} =  jwt.verify(token, process.env.JWT_SECRET);


        req.uid = uid;


        next();
        
    } catch (error) {
        console.log(error.message);
        
        const TokenVerificationErrors = {
            ["invalid signature"]: "La firma del token es inválida",
            [" jwt expired"]: "El token ha expirado",
            ["invalid token"]: "El token es inválido",
            ["No Bearer"]: "Utiliza el formato token Bearer",
            ["jwt malformed"]: "El token es inválido"
        };


        return res 
        .status(401)
        .send({ error: TokenVerificationErrors[error.message]});

    };

}