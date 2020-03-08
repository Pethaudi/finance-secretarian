import Database from "./database";
import User from "../entities/user.i";

export class UserUow {
	private static _instance: UserUow | null = null;

	static get Instance(): UserUow {
		return this._instance ?? (this._instance = new UserUow());
	}

	private db: Database;
	private constructor() {
		this.db = Database.Instance;
	}

	async isValidUser(username: string, password: string): Promise<boolean> {
		return (await this.db.execute<User[]>("SELECT id FROM USERS WHERE email = ? AND password = ?", username, password)).length === 1;
	}
}