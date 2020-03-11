import { Response, Request } from "express";
import { UserUow } from "../db/user-uow";
import * as express from "express";

const LoginRouter = express.Router();

/**
 * used for a first validation of the user
 * passing email and password in the body
 */
LoginRouter.post("/", async (req: Request, res: Response) => {
	if (req.body["email"] && req.body["password"]) {
		if (await UserUow.Instance.getUserId(req.body.email, req.body.password)) {
			res.status(200);
		} else {
			res.status(401);
		}
	} else {
		res.status(401);
	}

	res.send();
})

export { LoginRouter };