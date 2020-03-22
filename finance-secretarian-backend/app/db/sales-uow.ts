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
    async getSales(userId: number): Promise<Sale[] | null> {
        return await this.db.fetch<Sale[]>("select * from sales where userId = ?", userId);
    }

    /**
     * saves a sale in the database
     * @param sale sale to save
     */
    async createSale(sale: Sale): Promise<boolean> {
        return await this.db.execute<boolean>(
            "insert into sales(categoryId, userId, amountSold, revenue, saledate, note) values (?, ?, ?, ?, ?, ?)",
            sale.categoryId, sale.userId, sale.amountSold, sale.revenue, sale.saledate, sale.note
        );
    }

    /**
     * fetches the latest n sales of a user from the database
     * @param n number of sales to return
     */
    async getLatestNSales(n: number, userid: number): Promise<Sale[]> {
        return await this.db.fetch<Sale[]>("select * from sales where userid = ? order by date(saledate) desc limit ?", userid, n);
    }

    /**
     * fetches all sales of the given perioud of a user from the database
     * @param month month to fetch from
     * @param year year to fetch from
     */
    async getSalesPerPeriod(month: number, year: number, userid: number): Promise<Sale[]> {
        const monthStr = month > 9 ? month.toString() : "0" + month;
        return await this.db.fetch(
            "select * from sales where strftime('%m', saledate) = ? AND strftime('%Y', saledate) = ? AND userid = ?;",
            monthStr, year.toString(), userid
        );
    }

    /**
     * deletes a sale from the database
     * @param id id of the sale to delete
     */
    async deleteSale(id: number, userid: number): Promise<boolean> {
        return await this.db.execute("delete from sales where id = ? AND userid = ?", id, userid);
    }
}