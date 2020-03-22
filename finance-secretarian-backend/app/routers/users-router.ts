import { Response, Request } from "express";
import { UserUow } from "../uow/user-uow";
import * as express from "express";
import cors from "cors";
import { User } from "../entities/user.i";

const UsersRouter = express.Router();

UsersRouter.use(cors());

/**
 * used for a first validation of the user
 * passing email and password in the body
 */
UsersRouter.post("/", async (req: Request, res: Response) => {
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
});

UsersRouter.post("/register", async (req: Request, res: Response) => {
    if (req.body["email"] && req.body["password"]) {
        const newUser: User = {
            id: null,
            email: req.body["email"],
            password: req.body["password"],
            branch: req.body["branch"] ?? ""
        };
        if (await UserUow.Instance.createUser(newUser)) {
            res.status(201);
        } else {
            res.status(409)
        }
    } else {
        res.status(400)
    }

    res.send();
})

export { UsersRouter };