import FinancialPost from "../models/financialPostModel.js";

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
    const posts = await FinancialPost.find();
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

