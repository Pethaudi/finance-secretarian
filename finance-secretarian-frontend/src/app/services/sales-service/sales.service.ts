import { Injectable } from '@angular/core';
import { Sale } from 'src/app/entities/sale.i';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

/**
 * this service handles everything about sales
 */
@Injectable({
	providedIn: 'root'
})
export class SalesService {

	constructor(private http: HttpClient) { }

    /**
     * fetches the wanted number of sales
     * @param number number of sales to fetch
     */
	getSales(number?: number): Promise<Sale[]> {
		return new Promise<Sale[]>(resolve => {
            this.http.get<Sale[]>(environment.apiUrl + "sales/" + (number ?? ""))
				.subscribe({
					next: data => {
						resolve(data);
					}
				});
		});
    }
    
    /**
     * creates the sale and returns if it was a successs
     * @param sale sale to create
     */
    createSale(sale: Sale): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            this.http.post(environment.apiUrl + "sales", sale)
                .subscribe({
                    next: () => {
                        resolve(true);
                    },
                    error: () => {
                        resolve(false);
                    }
                })
        })
    }

    /**
     * deletes a sale and returns if it was a success
     * @param sale sale to delete
     */
    deleteSale(sale: Sale): Promise<boolean> {
        return new Promise(resolve => {
            this.http.delete(environment.apiUrl + "sales/" + sale.id)
                .subscribe({
                    next: () => {
                        resolve(true);
                    },
                    error: () => {
                        resolve(false);
                    }
                });
        });
    }

    /**
     * returns all sales for the given month and year
     * @param month
     * @param year
     */
    getSalesPerPeriod(month: number, year: number): Promise<Sale[]> {
        return new Promise(resolve => {
            this.http.get<Sale[]>(environment.apiUrl + `sales/${month}/${year}`)
                .subscribe({
                    next: data => {
                        resolve(data);
                    }
                });
        });
    }
}
