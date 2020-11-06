import express from "express";
import routes from "../routes";
import { getMypage } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.mypage(), getMypage);

export default userRouter;
