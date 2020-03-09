import { Response, Request, NextFunction } from "express";
import { UserUow } from "../db/user-uow";

const express = require("express");
const LoginRouter = express.Router();

LoginRouter.post("/", async (req: Request, res: Response) => {
	if (req.body["email"] && req.body["password"]) {
		if (await UserUow.Instance.isValidUser(req.body.email, req.body.password)) {
			res.status(200);
		} else {
			res.status(401);
		}
	} else {
		res.status(401);
	}

	res.send();
})

module.exports = LoginRouter;