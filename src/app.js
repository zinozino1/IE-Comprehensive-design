import path from "path";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import mongoose from "mongoose";

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/static", express.static(path.join(__dirname, "static")));

app.get("/", function (req, res) {
    res.render("main"); // login data
});
app.get("/login", function (req, res) {
    res.render("login");
});
app.get("/join", function (req, res) {
    res.render("join");
});
app.get("/home", function (req, res) {
    res.render("home");
});
app.get("/mypage", function (req, res) {
    res.render("mypage");
});
app.get("/edit", function (req, res) {
    res.render("edit");
});
app.get("/search", function (req, res) {
    res.render("search");
});
app.get("/select", function (req, res) {
    res.render("select");
});
export default app;