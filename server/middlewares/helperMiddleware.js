import Users from "../models/userModel.js"
export const helperMiddleware =  async (req,res,next) => {
    try{
        const user=await Users.findById(req.userId);
        if (user.accountType !== 'helper'){
            return res.status(401).json({"message":"only can be uploaded by tutor"})
        }
        else next();
    }
    catch(err){
        return res.status(500).json(err);
    }
};