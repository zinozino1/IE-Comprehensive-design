import express from "express";
import routes from "../routes";
import {
    searchUser,
    saveUser,
    scrapDocument,
    saveMyDocument,
    searchSimillarDocument,
    analysisMyDocument,
    searchMyDocument,
    getSaveMyDocument,
} from "../controllers/apiController";

const apiRouter = express.Router();

apiRouter.post(routes.searchUser, searchUser);
apiRouter.post(routes.saveUser, saveUser);
apiRouter.post(routes.scrapDocument, scrapDocument);
apiRouter.post(routes.saveMyDocument, saveMyDocument);
apiRouter.get(routes.getSaveMyDocument, getSaveMyDocument);
apiRouter.post(routes.searchSimillarDocument, searchSimillarDocument);
apiRouter.post(routes.analysisMyDocument, analysisMyDocument);
apiRouter.post(routes.searchMyDocument, searchMyDocument);

export default apiRouter;
