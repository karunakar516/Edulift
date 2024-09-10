import Users from "../models/userModel.js";
export const studentMiddleware = async (req, res, next) => {
  try {
    const user = await Users.findById(req.userId);
    if (user.accountType !== "student") {
      return res.status(401).json({ message: "only can be posted by student!" });
    } else next();
  } catch (err) {
    return res.status(500).json(err);
  }
};