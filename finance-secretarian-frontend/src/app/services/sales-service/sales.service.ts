import { Injectable } from '@angular/core';
import { Sale } from 'src/app/entities/sale.i';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class SalesService {

	constructor(private http: HttpClient) { }

	getSales(): Promise<Sale[]> {
		return new Promise<Sale[]>(resolve => {
			this.http.get<Sale[]>(environment.apiUrl + "sales")
				.subscribe({
					next: data => {
						resolve(data);
					}
				});
		});
	}
}
