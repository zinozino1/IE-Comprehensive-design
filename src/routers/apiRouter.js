import express from "express";
import routes from "../routes";
import {
    searchUser,
    saveUser,
    scrapDocument,
} from "../controllers/apiController";

const apiRouter = express.Router();

apiRouter.post(routes.searchUser, searchUser);
apiRouter.post(routes.saveUser, saveUser);

apiRouter.post(routes.scrapDocument, scrapDocument);

export default apiRouter;
