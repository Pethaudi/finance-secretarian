import express from "express";
import helmet from "helmet";
import compression from "compression";
import * as bodyParser from "body-parser";

import { UsersRouter } from "./app/routers/users-router";
import { SalesRouter } from "./app/routers/sales-router";
import { CategoriesRouter } from "./app/routers/categories-router";

const port = 5500; // custom port
const app = express();

app.use(compression()); // compressing the http 
app.use(helmet()); // basic-protection against common attacks
app.use(bodyParser.json()); // understanding json-data sent in the body

// registering router
app.use("/users", UsersRouter);
app.use("/sales", SalesRouter);
app.use("/categories", CategoriesRouter);

// starting the app
app.listen(port, () => console.log(`listening at port ${port}`));