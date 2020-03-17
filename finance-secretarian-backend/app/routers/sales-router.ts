import { Response, Request } from "express";
import * as express from "express";
import { SalesUow } from "./../db/sales-uow";
import cors from "cors";
import Authorization from '../middlewares/authorization-middleware';
import { Sale } from "../entities/sale.i";

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

SalesRouter.get("/:number", async (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(await SalesUow.Instance.getLatestNSales(Number.parseInt(req.params.number)));
})

SalesRouter.get("/per-month/:month", async (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(await SalesUow.Instance.getSalesPerMonth(Number.parseInt(req.params.month)));
})

/**
 * creates a new sale
 */
SalesRouter.post("/", async (req: Request, res: Response) => {
    const sale: Sale = req.body;
    sale.userId = req.userId!!;

    if (!sale.amountSold) {
        sale.amountSold = 1;
    }

    if (await SalesUow.Instance.createSale(sale)) {
        res.status(201);
    } else {
        res.status(500);
    }

    res.send();
})

export { SalesRouter };