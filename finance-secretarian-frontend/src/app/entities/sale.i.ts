export interface Sale {
    id: number;
    categoryId: number;
    userId: number;
    amountSold: number;
    revenue: number;
    saledate: string | Date;
    note: string;
}
