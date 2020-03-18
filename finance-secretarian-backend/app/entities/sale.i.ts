export interface Sale {
    id: number;
    categoryId: number;
    userId: number;
    amountSold: number;
    revenue: number;
    saledate: string;
    note: string;
}