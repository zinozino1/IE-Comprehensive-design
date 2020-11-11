import express from "express";
import routes from "../routes";
import { getMypage } from "../controllers/userController";
import { onlyPrivate } from "../localMiddleWare";

const userRouter = express.Router();

userRouter.get(routes.mypage(), onlyPrivate, getMypage);

export default userRouter;
