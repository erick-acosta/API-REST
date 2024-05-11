import jwt from "jsonwebtoken"

export const generateToken = (uid) => {

    const expiresIn = 60 * 15;

    try{
        const token = jwt.sign({uid}, process.env.JWT_SECRET, {expiresIn})
        return {token, expiresIn}

    }catch(error){
        console.log(error)
    }    
};

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30;
    try{            
        const refreshToken = jwt.sign({uid}, process.env.JWT_REFRESH, {expiresIn})
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === "development"),
            expires: new Date(date.now() + expiresIn * 1000),
        });


    } catch(error){
        console.log(error)
    }
    };
     export const tokenVerificationErrors = {
        ["invalid signature"]: "La firma del token es inválida",
        [" jwt expired"]: "El token ha expirado",
        ["invalid token"]: "El token es inválido",
        ["No Bearer"]: "Utiliza el formato token Bearer",
        ["jwt malformed"]: "El token es inválido"
    };