import express from "express";
import routes from "../routes";
import {
    getEdit,
    postEdit,
    getAdd,
    postAdd,
    getSearch,
    postSearch,
    getSelect,
    postSelect,
    getAnalysis,
    postAnalysis,
} from "../controllers/documentController";

const documentRouter = express.Router();

documentRouter.get(routes.edit, getEdit);
documentRouter.post(routes.edit, postEdit);

documentRouter.get(routes.add, getAdd);
documentRouter.post(routes.add, postAdd);

documentRouter.get(routes.search, getSearch);
documentRouter.post(routes.search, postSearch);

documentRouter.get(routes.select, getSelect);
documentRouter.post(routes.select, postSelect);

documentRouter.get(routes.analysis(), getAnalysis);
documentRouter.post(routes.analysis(), postAnalysis);

export default documentRouter;
