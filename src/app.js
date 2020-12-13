import dotenv from "dotenv";
import path from "path";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import flash from "express-flash";
import globalRouter from "./routers/globalRouter";
import documentRouter from "./routers/documentRouter";
import "./passport";
import { localMiddleWare } from "./localMiddleWare";
import userRouter from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";

dotenv.config();
const app = express();
const CookieStore = MongoStore(session);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
        store: new CookieStore({ mongooseConnection: mongoose.connection }),
    }),
);

app.use(passport.initialize());
app.use(flash());
app.use(passport.session());
app.use(localMiddleWare);
app.use("/", globalRouter);
app.use("/document", documentRouter);
app.use("/user", userRouter);
app.use("/api", apiRouter);

app.use("/testPost", (req, res) => {
    console.log(req.body);
    res.end();
});

app.use((req, res, next) => {
    res.render("404");
});
export default app;
