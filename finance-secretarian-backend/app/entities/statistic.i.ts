import { Sale } from "./sale.i";

export interface Statistic {
    year: number;
    month: number;
    papers: {
        counter: number;
        totalRevenue: number;
    };
    brochures: {
        counter: number;
        totalRevenue: number;
    };
    subscriptions: {
        counter: number;
        totalRevenue: number;
    };
    other: Sale[];
    total: number;
    retained: number;
}