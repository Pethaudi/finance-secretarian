import { Database } from "./database";
import { User } from "../entities/user.i";

export class UserUow {
	private static _instance: UserUow | null = null;

	static get Instance(): UserUow {
		return this._instance ?? (this._instance = new UserUow(Database.Instance));
	}

	private db: Database;
	private constructor(db: Database) {
		this.db = db;
	}

	async getUserId(email: string, password: string): Promise<number | null> {
		const result = await this.db.execute<number[]>("SELECT id FROM USERS WHERE email = ? AND password = ?", email, password);
		return result.length > 0 ? result[0] : null;
	}
}