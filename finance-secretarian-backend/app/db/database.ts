class Database {

    private static _instance: Database | null = null;
    static async Instance(): Promise<Database> {
        if (this._instance) {
            return new Promise(resolve => {
                resolve(this._instance!!);
            })
        }
        return async () => {
            this._instance = await mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "Kurkisnov1!#",
                database: "finance_secretarian"
            });
        }
    }

    private constructor() {}
}