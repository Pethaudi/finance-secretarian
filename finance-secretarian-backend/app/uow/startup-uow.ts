import { Database } from "./database";
import { DB_PATH } from "./../../environment";
import * as fs from "fs";

export class StartUpUow {

    private static _instance: StartUpUow;
    static get Instance(): StartUpUow {
        return this._instance ?? (this._instance = new StartUpUow());
    }

    private db: Database | null;
    /**
     * configurations of the tables
     */
    private tablestrings: any = {
        categories: {
            table: `
                CREATE TABLE CATEGORIES (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    category VARCHAR(100) NOT NULL UNIQUE
                );`,
            inserts: [
                "INSERT INTO CATEGORIES (category) VALUES ('paper');",
                "INSERT INTO CATEGORIES (category) VALUES ('subscription');",
                "INSERT INTO CATEGORIES (category) VALUES ('brochure');",
                "INSERT INTO CATEGORIES (category) VALUES ('donation')",
                "INSERT INTO CATEGORIES (category) VALUES ('other');"
            ]
        },
        users: {
            table: `
                CREATE TABLE USERS (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    branch VARCHAR(255)
                );`,
            inserts: [
                "INSERT INTO USERS (email, password, branch) VALUES ('admin', 'admin', '');"
            ]
        },
        sales: {
            table: `
                CREATE TABLE SALES (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    categoryId INTEGER NOT NULL,
                    userId INTEGER NOT NULL,
                    amountSold INTEGER NOT NULL,
                    revenue FLOAT NOT NULL,
                    saledate DATE NOT NULL,
                    note VARCHAR(255),
                    FOREIGN KEY (categoryId) REFERENCES CATEGORIES(id),
                    FOREIGN KEY (userId) REFERENCES USERS(id)
                );`,
            inserts: [
                "INSERT INTO SALES (categoryId, userId, amountSold, revenue, saledate, note) VALUES (1, 1, 3, 5.4, '2020-03-05', 'this is a note');"
            ]
        }
    }
    private constructor() {
        this.db = null;
    }

    /**
     * checks if all files exists and initializes the environment for the app
     */
    async initEnvironment() {
        // check if the db-file exists
        if (!fs.existsSync(DB_PATH)) {
            fs.createWriteStream(DB_PATH).close();
        }
        this.db = Database.Instance;

        // fetching currently existing tables
        const currentTables = await this.db.fetch<Array<any>>("SELECT name FROM sqlite_master WHERE type='table'");

        Object.keys(this.tablestrings).forEach(async table => {
            // check if all tables exist, if not create and fill them with dummy data
            if (!currentTables.find(curTable => curTable.name.toLowerCase() === table)) {
                await this.db?.execute(this.tablestrings[table].table);
                this.tablestrings[table].inserts.forEach(async (insert: string) => {
                    await this.db?.execute(insert)
                });
            }
        })
    }
}