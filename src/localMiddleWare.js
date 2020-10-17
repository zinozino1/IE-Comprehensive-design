import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";
import aws from "aws-sdk";
import routes from "./routes";

dotenv.config();

export const localMiddleWare = (req, res, next) => {
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;

    next();
};

export const onlyPublic = (req, res, next) => {
    if (req.user) {
        res.redirect(routes.home);
    } else {
        next();
    }
};

export const onlyPrivate = (req, res, next) => {
    if (!req.user) {
        res.redirect(routes.main);
    } else {
        next();
    }
};
