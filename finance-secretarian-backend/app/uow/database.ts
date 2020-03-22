import * as sqlite3 from "sqlite3";

/**
 * this class manages the access to the database, because there is only one instance
 * possible, the possibility for inconsistent database-access should be really low
 * 
 * this class has 2 basic functions:
 *  * returning data with fetch
 *  * executing script with execute
 */
export class Database {

    private static _instance: Database | null = null;
    static get Instance(): Database {
        return this._instance ?? (this._instance = new Database());
    }

    private db: any; 
    private constructor() {
        this.db = new sqlite3.Database("/opt/finance_secretarian.db");
    }

    /**
     * executes a given query with the given params and returns all results
     */
    fetch<T>(query: string, ...params: any): Promise<T> {
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

    /**
     * executes a given query with the given params and returns the success
     */
    execute<T>(query: string, ...params: any): Promise<boolean> {
        return new Promise(
            resolve => {
                this.db.run(query, ...params, (err: any) => {
                    if (err) {
                        resolve(false);
                    }
                    resolve(true);
                })
            }
        )
    }
}