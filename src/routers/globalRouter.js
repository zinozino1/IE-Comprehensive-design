import express from "express";
import passport from "passport";
import routes from "../routes";
import {
    getMain,
    getHome,
    getLogin,
    getJoin,
    postLogin,
    postJoin,
    getGooglelogin,
    postGoogleLogin,
    getKakaoLogin,
    postKakaoLogin,
} from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get(routes.main, getMain);

globalRouter.get(routes.home, getHome);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.google, getGooglelogin);
globalRouter.get(
    routes.googleCallback,
    passport.authenticate("google", {
        failureRedirect: routes.login,
    }),
    postGoogleLogin,
);

globalRouter.get(routes.kakao, getKakaoLogin);
globalRouter.get(
    routes.kakaoCallback,
    passport.authenticate("kakao", {
        failureRedirect: routes.login,
    }),
    postKakaoLogin,
);

export default globalRouter;
