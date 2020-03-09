const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const basicAuth = require("express-basic-auth"):

const LoginRouter = require("./app/routers/login-router");
const Authorizer = require("./app/middlewares/authorization"):

const port = 5500;
const app = express();

app.use(helmet())
app.use(bodyParser.json());
app.use(
    basicAuth(
        {
            authorizer: Authorizer,
            authorizeAsync: true
        }
    )
)
app.use("/login", LoginRouter);

app.listen(port, () => console.log(`listening at port ${port}`));