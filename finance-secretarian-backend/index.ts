const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");

import Database from "./app/db/database";
import { UserUow } from "./app/db/user-uow";
const LoginRouter = require("./app/routers/login-router");

const port = 5500;
const app = express();

app.use(bodyParser.json());
app.use("/login", LoginRouter);

app.listen(port, () => console.log(`listening at port ${port}`));