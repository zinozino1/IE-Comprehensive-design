import express from "express";
import routes from "../routes";
import {
    getMain,
    getHome,
    getLogin,
    getJoin,
    postLogin,
    postJoin,
} from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get(routes.main, getMain);

globalRouter.get(routes.home, getHome);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);

export default globalRouter;
