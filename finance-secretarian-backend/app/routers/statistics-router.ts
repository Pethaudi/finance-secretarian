import { Response, Request } from "express";
import * as express from "express";
import { SalesUow } from "./../db/sales-uow";
import cors from "cors";
import Authorization from '../middlewares/authorization-middleware';
import { Sale } from "../entities/sale.i";

const StatisticsRouter = express.Router();

StatisticsRouter.use(cors());
StatisticsRouter.use( Authorization);

StatisticsRouter.get("/:year/:month", async (req: Request, res: Response) => {

});

export { StatisticsRouter };