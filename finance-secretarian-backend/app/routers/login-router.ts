import { Response, Request } from "express";

const express = require("express");
const LoginRouter = express.Router();

LoginRouter.get("/", (req: Request, res: Response) => {
	console.log("got this get");
});

LoginRouter.post("/", (req: Request, res: Response) => {
	console.log(req.body);
	res.send(req.body);
})

module.exports = LoginRouter;