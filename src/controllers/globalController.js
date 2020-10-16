import passport from "passport";
import userModel from "../models/user";
import routes from "../routes";

export const getMain = (req, res) => {
    res.render("main");
};

export const getHome = (req, res) => {
    res.render("home");
};

export const getLogin = (req, res) => {
    res.render("login");
    console.log(req.user);
};
export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home,
    successFlash: "Welcome!",
    failureFlash: "Invalid username or password.",
});

export const getJoin = (req, res) => {
    res.render("join");
};
export const postJoin = async (req, res, next) => {
    const {
        body: { email, nickName, password, password2 },
    } = req;
    console.log(req.body);
    if (password !== password2) {
        res.status(400);
        res.render("join");
    }
    try {
        const newUser = await userModel({
            email,
            nickName,
        });
        await userModel.register(newUser, password);
        next();
    } catch (error) {
        console.log(error);
    }
};

export const getGooglelogin = (req, res) => {};
