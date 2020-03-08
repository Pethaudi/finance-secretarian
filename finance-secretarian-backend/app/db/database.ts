const sqlite3 = require("sqlite3");

export default class Database {

    private static _instance: Database | null = null;
    static get Instance(): Database {
        return this._instance ?? (this._instance = new Database());
    }

    private db: any; 
    private constructor() {
        this.db = new sqlite3.Database("/opt/finance_secretarian.db");
    }

    execute<T>(query: string, ...params: any): Promise<T> {
        return new Promise(
            resolve => {
                this.db.all(query, ...params, (err: any, result: T) => {
                    if (err) {
                        throw err;
                    }
                    resolve(result);
                })
            }
        )
    }
}