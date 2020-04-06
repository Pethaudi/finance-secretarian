import express from "express";
import helmet from "helmet";
import compression from "compression";
import * as bodyParser from "body-parser";

import { UsersRouter } from "./app/routers/users-router";
import { SalesRouter } from "./app/routers/sales-router";
import { CategoriesRouter } from "./app/routers/categories-router";
import { StartUpUow } from "./app/uow/startup-uow";
import { PORT } from "./environment";

(async () => {
    await StartUpUow.Instance.initEnvironment(); // initializing the environment

    const app = express();
    app.use(compression()); // compressing the http 
    app.use(helmet()); // basic-protection against common attacks
    app.use(bodyParser.json()); // understanding json-data sent in the body
    
    // registering router
    app.use("/users", UsersRouter);
    app.use("/sales", SalesRouter);
    app.use("/categories", CategoriesRouter);
    
    // starting the app
    app.listen(PORT, () => console.log(`listening at port ${PORT}`));
})();