import { Request, Response, NextFunction } from "express";
import { UserUow } from "../uow/user-uow";

/**
 * own basic-auth implementation
 * authenticates the user, if not possible it aborts the request and sends 401
 * if successful it saves the userid in the req-object
 */
export default async (req: Request, res: Response, next: NextFunction) => {
    // is there even an authorization field in the header
    if (req.headers.authorization) {
        // decoding the base64 string
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
