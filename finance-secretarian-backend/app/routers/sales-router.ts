import { Response, Request } from "express";
import * as express from "express";

const SalesRouter = express.Router();

import Authorization from '../middlewares/authorization-middleware';

SalesRouter.use( Authorization);

SalesRouter.get("/", (req: Request, res: Response) => {
	res.send("sales got it");
});

export { SalesRouter };