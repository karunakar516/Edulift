import Users from "../models/userModel.js";
import { generateToken } from "../middlewares/authMiddleware.js";
export const register = async (req ,res) =>{
    try{
        const newUser = await Users.create(req.body)
        const token = generateToken({userId : newUser._id});
        return res.status(201).json({'userData':newUser, 'token' : token});
    }
    catch(err){
        res.status(500).json(err)
    }
}
export const login = async (req , res) => {
    try {
        const userData = req.body;
        const userName = userData.userName;
        const password = userData.password;
        const user = await Users.findOne({userName:userName})
        if(!user) {
            return res.status(404).json({"message":"User Not Found!"})
        }
        if(!user.checkPassword(password)) {
            return res.status(401).json({"message":"wrong Password!"})
        }
        const payLoad = {
            userId:user._id,
        }
        const token = generateToken(payLoad);
        res.status(201).json({"message" : "Logged In!","token" : token});
    }
    catch(err){
        res.json(err.json);
    }
}

export const getUserById = async (req,res) =>{
    try{
        const id = req.params.id;
        const user = await Users.findById(id);
        res.status(201).json(user);
    }
    catch(err){
        res.json(err);
    }
}
export const getCurrentUser = async (req,res) =>{
    try{
        const userId = req.userId;
        const user = await Users.findById(userId);
        res.status(201).json(user);
    }
    catch(err){
        res.status(400).json(err);
    }
}