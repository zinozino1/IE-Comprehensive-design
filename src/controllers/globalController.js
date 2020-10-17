import passport from "passport";
import userModel from "../models/user";
import routes from "../routes";

export const getMain = (req, res) => {
    res.render("main");
};

export const getHome = (req, res) => {
    res.render("home");
    console.log(req.user);
};

export const getLogin = (req, res) => {
    res.render("login");
};

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
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

export const getGooglelogin = passport.authenticate("google", {
    scope: ["profile", "email"],
});

export const postGoogleLogin = (req, res) => {
    res.redirect(routes.home);
};

export const googleLoginCallBack = async function (
    accessToken,
    refreshToken,
    profile,
    cb,
) {
    const {
        id,
        _json: { name, email },
    } = profile;

    try {
        const user = await userModel.findOne({ email });
        if (user) {
            user.googleId = id;
            user.save();
            return cb(null, user);
        } else {
            const newUser = await userModel.create({
                email,
                nickName: name,
                googleId: id,
            });
            return cb(null, newUser);
        }
    } catch (error) {
        return cb(error);
    }
};

export const getKakaoLogin = passport.authenticate("kakao");

export const postKakaoLogin = (req, res) => {
    res.redirect(routes.home);
};

export const kakaoLoginCallBack = async function (
    accessToken,
    refreshToken,
    profile,
    cb,
) {
    const {
        username,
        _json: {
            id,
            kakao_account: { email },
        },
    } = profile;

    try {
        const user = await userModel.findOne({ email });
        if (user) {
            user.kakaoId = id;
            user.save();
            return cb(null, user);
        } else {
            const newUser = await userModel.create({
                email,
                nickName: username,
                kakaoId: id,
            });
            return cb(null, newUser);
        }
    } catch (error) {
        return cb(error);
    }
};
