import { register, login, getUserById, getCurrentUser } from "../controllers/authController.js";
import { jwtAuthMiddleware } from "../middlewares/authMiddleware.js";
import app from "express";
const authRouter = app.Router();

authRouter.get('/getUser',jwtAuthMiddleware,getCurrentUser);
authRouter.post('/login',login);
authRouter.post('/register',register);

export default authRouter