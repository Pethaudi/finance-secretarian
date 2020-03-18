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
            resolve(await this.db.fetch<Sale[]>("select * from sales where userId = ?", userId));
        });
    }

    createSale(sale: Sale): Promise<boolean> {
        return new Promise<boolean>(async (resolve) => {
            resolve(
                this.db.execute<boolean>(
                    "insert into sales(categoryId, userId, amountSold, amountMoney, saledate, note) values (?, ?, ?, ?, ?, ?)",
                    sale.categoryId, sale.userId, sale.amountSold, sale.amountMoney, sale.saledate, sale.note
                )
            )
        });
    }

    getLatestNSales(n: number): Promise<Sale[]> {
        return new Promise<Sale[]>(async (resolve) => {
            resolve(
                await this.db.fetch<Sale[]>("select * from sales order by date(saledate) desc limit ?", n)
            );
        });
    }

    getSalesPerMonth(month: number): Promise<Sale[]> {
        const monthNr = month > 12 ? month % 12 === 0 ? 12 : month % 12 : month;
        const monthStr = monthNr > 9 ? monthNr.toString() : "0" + monthNr;
        return new Promise<Sale[]>(async (resolve) => {
            resolve(
                await this.db.fetch<Sale[]>(
                    "select * from sales where strftime('%m', saledate) = ? order by date(saledate) desc",
                    monthStr
                )
            );
        });
    }

    deleteSale(id: number): Promise<boolean> {
        return new Promise<boolean>(async resolve => {
            resolve(await this.db.execute("delete from sales where id = ?", id));
        })
    }
}