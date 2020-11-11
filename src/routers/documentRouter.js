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
    postKeywordSearch,
} from "../controllers/documentController";
import { onlyPrivate } from "../localMiddleWare";

const documentRouter = express.Router();

documentRouter.get(routes.edit, onlyPrivate, getEdit);
documentRouter.post(routes.edit, postEdit);

documentRouter.get(routes.add, onlyPrivate, getAdd);
documentRouter.post(routes.add, postAdd);

documentRouter.get(routes.search, onlyPrivate, getSearch);
documentRouter.post(routes.taskSearch, postTaskSearch);
documentRouter.post(routes.questionSearch, postQuestionSearch);
documentRouter.post(routes.keywordSearch, postKeywordSearch);

documentRouter.get(routes.select, onlyPrivate, getSelect);
documentRouter.post(routes.select, postSelect);

documentRouter.get(routes.analysis(), onlyPrivate, getAnalysis);
documentRouter.post(routes.analysis(), postAnalysis);

export default documentRouter;
