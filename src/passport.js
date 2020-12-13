import dotenv from "dotenv";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import KakaoStrategy from "passport-kakao";
import userModel from "./models/user";
import routes from "./routes";
import {
    googleLoginCallBack,
    kakaoLoginCallBack,
} from "./controllers/globalController";

dotenv.config();
passport.use(userModel.createStrategy());

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGlE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CILENT_PW,
            callbackURL: "http://52.78.80.31/auth/google/callback",
        },
        googleLoginCallBack,
    ),
);

passport.use(
    new KakaoStrategy(
        {
            clientID: process.env.KAKAO_CLIENT,
            callbackURL: "http://52.78.80.31/auth/kakao/callback",
        },
        kakaoLoginCallBack,
    ),
);

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());
