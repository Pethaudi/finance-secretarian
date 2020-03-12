import { Response, Request } from "express";
import * as express from "express";
import { SalesUow } from "./../db/sales-uow";
import cors from "cors";
import Authorization from '../middlewares/authorization-middleware';

const SalesRouter = express.Router();

SalesRouter.use(cors());
SalesRouter.use( Authorization);

/**
 * returns all sales of the user passed by the authenticator
 */
SalesRouter.get("/", async (req: Request, res: Response) => {
	res.setHeader("Content-Type", "application/json");
	res.status(200);
	res.send((await SalesUow.Instance.getSales(req.userId!!)));
});

export { SalesRouter };