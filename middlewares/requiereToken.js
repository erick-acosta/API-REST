import jwt from 'jsonwebtoken'
import { tokenVerificationErrors } from '../utils/tokenManager.js';

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
        
        return res 
        .status(401)
        .send({ error: tokenVerificationErrors[error.message]});

    };

}