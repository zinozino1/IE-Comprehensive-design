import passport from "passport";
import userModel from "./models/user";
// import GithubStrategy from "passport-github";
// import { githubLoginCallback } from "./controllers/userController";
import routes from "./routes";

passport.use(userModel.createStrategy());

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());
