import { Injectable } from '@angular/core';
import { Sale } from 'src/app/entities/sale.i';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class SalesService {

	constructor(private http: HttpClient) { }

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
