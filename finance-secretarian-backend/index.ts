const express = require("express");
const helmet = require("helmet");

import Database from "./app/db/database";
import { UserUow } from "./app/db/user-uow";
const LoginRouter = require("./app/routers/login-router");

const app = express();
// const router = express.router();

/*const userUow = UserUow.Instance;
(async () => console.log(await userUow.isValidUser("pethaudi@yahoo.de", "test")))();*/

app.use("/login",LoginRouter);

app.listen(3000);