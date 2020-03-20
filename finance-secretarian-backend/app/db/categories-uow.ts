import { Database } from "./database";
import { Category } from "../entities/category.i";

/**
 * This unit of work manages everything about categories
 */
export class CategoriesUow {
    private static _instance: CategoriesUow | null;
    static get Instance(): CategoriesUow {
        return this._instance ?? (this._instance = new CategoriesUow());
    }

    private db: Database;
    private constructor() {
        this.db = Database.Instance;
    }

    /**
     * fetches all categories from the database
     */
    getCategories(): Promise<Category[]> {
        return new Promise<Category[]>(
            async resolve => {
                resolve(await this.db.fetch<Category[]>("select * from categories"));
            }
        )
    }
}
