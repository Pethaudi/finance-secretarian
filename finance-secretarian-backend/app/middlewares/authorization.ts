import { UserUow } from "../db/user-uow"

module.exports = async (username: string, password: string, cb: any) => {
    cb(null, await UserUow.Instance.isValidUser(username, password));
}