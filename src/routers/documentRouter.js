import express from "express";
import routes from "../routes";
import {
    getEdit,
    postEdit,
    getAdd,
    postAdd,
    getSearch,
    getSelect,
    postSelect,
    getAnalysis,
    postAnalysis,
    postTaskSearch,
    postQuestionSearch,
} from "../controllers/documentController";

const documentRouter = express.Router();

documentRouter.get(routes.edit, getEdit);
documentRouter.post(routes.edit, postEdit);

documentRouter.get(routes.add, getAdd);
documentRouter.post(routes.add, postAdd);

documentRouter.get(routes.search, getSearch);
documentRouter.post(routes.taskSearch, postTaskSearch);
documentRouter.post(routes.questionSearch, postQuestionSearch);

documentRouter.get(routes.select, getSelect);
documentRouter.post(routes.select, postSelect);

documentRouter.get(routes.analysis(), getAnalysis);
documentRouter.post(routes.analysis(), postAnalysis);

export default documentRouter;
