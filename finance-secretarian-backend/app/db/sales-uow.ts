import { Database } from "./database";
import { Sale } from "../entities/sale.i";

export class SalesUow {

    private static _instance: SalesUow | null;
    static get Instance(): SalesUow {
        return this._instance ?? (this._instance = new SalesUow(Database.Instance));
    }

    private db: Database;
    private constructor(db: Database) {
        this.db = db;
    }

    /**
     * get all sales of the user from the database
     * @param userId userid
     */
    getSales(userId: number): Promise<Sale[] | null> {
        return new Promise<Sale[] | null>(async (resolve) => {
            resolve(await this.db.execute<Sale[]>("select * from sales where userId = ?", userId));
        });
    }
}