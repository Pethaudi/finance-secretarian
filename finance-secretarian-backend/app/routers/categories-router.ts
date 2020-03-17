import { Response, Request } from "express";
import { UserUow } from "../db/user-uow";
import * as express from "express";
import cors from "cors";
import { CategoriesUow } from "../db/categories-uow";

const CategoriesRouter = express.Router();

CategoriesRouter.use(cors());

CategoriesRouter.get("/", async (req: Request, res: Response) => {
	res.setHeader("Content-Type", "application/json");
	res.status(200);
    res.send(await CategoriesUow.Instance.getCategories());
});

export { CategoriesRouter };