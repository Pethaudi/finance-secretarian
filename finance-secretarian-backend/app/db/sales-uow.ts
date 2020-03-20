import { Database } from "./database";
import { Sale } from "../entities/sale.i";

/**
 * This unit of work manages everything about sales
 */
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
     * get all sales of a user from the database
     * @param userId userid
     */
    getSales(userId: number): Promise<Sale[] | null> {
        return new Promise<Sale[] | null>(async (resolve) => {
            resolve(await this.db.fetch<Sale[]>("select * from sales where userId = ?", userId));
        });
    }

    /**
     * saves a sale in the database
     * @param sale sale to save
     */
    createSale(sale: Sale): Promise<boolean> {
        return new Promise<boolean>(async (resolve) => {
            resolve(
                this.db.execute<boolean>(
                    "insert into sales(categoryId, userId, amountSold, revenue, saledate, note) values (?, ?, ?, ?, ?, ?)",
                    sale.categoryId, sale.userId, sale.amountSold, sale.revenue, sale.saledate, sale.note
                )
            )
        });
    }

    /**
     * fetches the latest n sales of a user from the database
     * @param n number of sales to return
     */
    getLatestNSales(n: number): Promise<Sale[]> {
        return new Promise<Sale[]>(async (resolve) => {
            resolve(
                await this.db.fetch<Sale[]>("select * from sales order by date(saledate) desc limit ?", n)
            );
        });
    }

    /**
     * fetches all sales of the given perioud of a user from the database
     * @param month month to fetch from
     * @param year year to fetch from
     */
    getSalesPerPeriod(month: number, year: number): Promise<Sale[]> {
        const monthStr = month > 9 ? month.toString() : "0" + month;
        return new Promise<Sale[]>(async resolve => {
            resolve(
                await this.db.fetch(
                    "select * from sales where strftime('%m', saledate) = ? AND strftime('%Y', saledate) = ?;",
                    monthStr, year.toString()
                )
            );
        });
    }

    /**
     * deletes a sale from the database
     * @param id id of the sale to delete
     */
    deleteSale(id: number): Promise<boolean> {
        return new Promise<boolean>(async resolve => {
            resolve(await this.db.execute("delete from sales where id = ?", id));
        })
    }
}