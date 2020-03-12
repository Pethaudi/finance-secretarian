import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	isLoggedIn: boolean;

	private parsedAuthData: string;
	get authData(): string {
		return this.parsedAuthData;
	}

	constructor(private http: HttpClient) {
		this.isLoggedIn = false;
		this.parsedAuthData = "";
	}

	login(email: string, password: string): Promise<void> {
		return new Promise<void>(resolve => {
			this.http.post(environment.apiUrl + "login", {email, password}, {
				headers: {
					"Content-Type": "application/json"
				}
			}).subscribe({
				next: () => {
					this.isLoggedIn = true;
					this.parsedAuthData = window.btoa(email + ":" + password);
					resolve();
				},
				error: () => {
					this.isLoggedIn = false;
					this.parsedAuthData = "";
					resolve();
				}
			});
		});
	}
}
