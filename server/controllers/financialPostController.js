import FinancialPost from "../models/financialPostModel.js";
import redisClient from "../config/redisconfig.js";
export const createFinancialPost = async (req, res) => {
  try {
    const post = await FinancialPost.create(req.body);
    res.status(201).json({ post });
  } catch (err) {
    res.status(500).json(err);
  }
}   
export const getFinancialPosts = async (req, res) => {
  try {
    const cachedPosts = await redisClient.get("getFinancialPosts");
    if (cachedPosts) {
      return res.status(200).json(JSON.parse(cachedPosts));
    }
    const posts = await FinancialPost.find();
    await redisClient.set("getFinancialPosts", JSON.stringify(posts), { EX: 60 });
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json(err);
  }
}
export const getFinancialPost = async (req, res) => {
  try {
    const post = await FinancialPost.findById(req.params.id);
    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json(err);
  }
}

