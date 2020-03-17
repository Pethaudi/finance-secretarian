import express from "express";
import helmet from "helmet";
import * as bodyParser from "body-parser";

import { LoginRouter } from "./app/routers/login-router";
import { SalesRouter } from "./app/routers/sales-router";
import { CategoriesRouter } from "./app/routers/categories-router";

const port = 5500;
const app = express();

app.use(helmet())
app.use(bodyParser.json());

app.use("/login", LoginRouter);
app.use("/sales", SalesRouter);
app.use("/categories", CategoriesRouter);

app.listen(port, () => console.log(`listening at port ${port}`));