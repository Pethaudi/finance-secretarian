import { Database } from "./database";
import { User } from "../entities/user.i";

/**
 * This unit of work manages everything about users
 */
export class UserUow {
	private static _instance: UserUow | null = null;

	static get Instance(): UserUow {
		return this._instance ?? (this._instance = new UserUow(Database.Instance));
	}

	private db: Database;
	private constructor(db: Database) {
		this.db = db;
	}

	/**
	 * returns the id(s) of the given user-data
	 * @param email email of the user
	 * @param password password of the user
	 */
	async getUserId(email: string, password: string): Promise<number | null> {
		const result = await this.db.fetch<User[]>("SELECT * FROM USERS WHERE email = ? AND password = ?", email, password);
		return result.length > 0 ? result[0].id : null;
	}
}