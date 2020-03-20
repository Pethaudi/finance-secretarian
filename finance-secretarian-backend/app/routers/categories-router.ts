import { Response, Request } from "express";
import * as express from "express";
import cors from "cors";
import { CategoriesUow } from "../db/categories-uow";
import authorizationMiddleware from "../middlewares/authorization-middleware";

const CategoriesRouter = express.Router();

CategoriesRouter.use(cors());
CategoriesRouter.use(authorizationMiddleware)

/**
 * returns all fetched categories
 */
CategoriesRouter.get("/", async (req: Request, res: Response) => {
	res.setHeader("Content-Type", "application/json");
	res.status(200);
    res.send(await CategoriesUow.Instance.getCategories());
});

export { CategoriesRouter };