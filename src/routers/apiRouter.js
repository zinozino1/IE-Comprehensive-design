import express from "express";
import routes from "../routes";
import { searchUser, saveUser } from "../controllers/apiController";

const apiRouter = express.Router();

apiRouter.post(routes.searchUser, searchUser);
apiRouter.post(routes.saveUser, saveUser);

export default apiRouter;
