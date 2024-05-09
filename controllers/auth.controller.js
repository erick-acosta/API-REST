 import { User } from "../models/user.js"; 
 import jwt from "jsonwebtoken";


 export const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if(user) throw {code: 11000};


//jwt token

       user = new User({ email, password });
        await user.save();

        return res.json({ok: true});
    } catch(error) {
        console.log(error.code);

// alternativa de mongoose

        if(error.code === 11000){
            return res.status(400).json({error:"ya existe este usuario"});
        }
        return res.status(500).json({ error: "Error del servidor" });

    }
};

export const login = async(req, res) => {  
    try {
    const {email, password} = req.body;

    let user = await User.findOne({ email });
    if (!user)
         return res.status(403).json({ error: 'No existe el usuario registrado'});

    const repuestaPassword = await user.comparePassword(password); 
    if(!repuestaPassword) 
        return res.status(403).json({ error: 'Contraseña incorrecta'});


// generacion del token JWT

 const token = jwt.sign({uid: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});


    return res.json({ token });

    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: "Error del servidor" });
    }
};
