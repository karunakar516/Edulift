import Users from "../models/userModel.js"
import Content from "../models/contentModel.js";
import redisClient from "../config/redisconfig.js";

export const addContent = async (req,res) =>{
    try{
        const content = new Content(req.body);
        content.author = req.userId;
        await content.save();
        res.status(201).json({"message":"content posted successfully"});
    }
    catch(err){
        res.status(502).json(err);
    }
}

export const showAllContent = async (req,res) => {
    try{
        const cachedContent = await redisClient.get("showAllContent");
        if(cachedContent){
            return res.status(200).json(JSON.parse(cachedContent));
        }
        const content = await Content.aggregate([
            {
                $project: {
                    title: 1,
                    author: 1,
                    price: 1,
                    aboutContent: 1
                }
            }
        ]);
        await redisClient.set("showAllContent",JSON.stringify(content),{EX:60});
        res.status(200).json(content);
    }
    catch(err){
        res.status(500).json(err);
    }
}
export const showSubscribedContent = async (req,res) => {
    try{
        const user = await Users.findById(req.userId).populate('subscribedContent');
        res.status(200).json(user.subscribedContent);
    }   
    catch(err){
        res.status(500).json(err);
    }
}

export const subscribeContent = async (req,res) => {
    try{
        const user = await Users.findById(req.userId);
        const content = await Content.findById(req.body.contentId);
        user.subscribedContent.push(content);
        await user.save();
        res.status(200).json({"message":"subscribed successfully"});
    }
    catch(err){
        res.status(500).json(err);
    }
}