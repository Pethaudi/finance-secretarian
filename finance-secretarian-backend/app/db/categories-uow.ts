import { Database } from "./database";
import { Category } from "../entities/category.i";

export class CategoriesUow {
    private static _instance: CategoriesUow | null;
    static get Instance(): CategoriesUow {
        return this._instance ?? (this._instance = new CategoriesUow());
    }

    private db: Database;
    private constructor() {
        this.db = Database.Instance;
    }

    getCategories(): Promise<Category[]> {
        return new Promise<Category[]>(
            async resolve => {
                resolve(await this.db.execute<Category[]>("select * from categories"));
            }
        )
    }
}
