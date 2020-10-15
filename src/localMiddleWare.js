import multer from "multer";
import routes from "./routes";
import multerS3 from "multer-s3";
import dotenv from "dotenv";
import aws from "aws-sdk";

dotenv.config();

export const localMiddleWare = (req, res, next) => {
    req.locals.routes = routes;
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
        res.redirect(routes.home);
    } else {
        next();
    }
};
