import { Request, Response, NextFunction } from "express";
import { UserUow } from "../db/user-uow";

export default async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        const encoded = req.headers.authorization.split(' ');   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part
        const credentials = Buffer.from(encoded[1], 'base64').toString().split(":");
        req.userId = await UserUow.Instance.getUserId(credentials[0], credentials[1]);
        if (req.userId) {
            next();
        }
    }
    res.status(401);
    res.send();
}
