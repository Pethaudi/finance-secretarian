import { Request, Response, NextFunction } from "express";
import { UserUow } from "../db/user-uow";

/**
 * own basic-auth implementation
 * saves the userId in the req-object
 */
export default async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        const encoded = req.headers.authorization.split(" ");
        const credentials = Buffer.from(encoded[1], 'base64').toString().split(":");
        req.userId = await UserUow.Instance.getUserId(credentials[0], credentials[1]);
        if (req.userId) {
            next();
        } else {
            res.set('WWW-Authenticate', 'Basic realm="401"')
            res.status(401);
            res.send("Authorization required");
        }
    } else {
        res.set('WWW-Authenticate', 'Basic realm="401"')
        res.status(401);
        res.send("Authorization required");
    }
}
