export interface Sale {
    id: number;
    categoryId: number;
    userId: number;
    amountSold: number;
    amountMoney: number;
    saledate: string | Date;
    note: string;
}
