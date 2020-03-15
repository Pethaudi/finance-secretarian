import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from '../cookie-service/cookie.service';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class UserService {

    isLoggedIn: boolean;
    
    private parsedAuthData: string;
	get authData(): string {
        return this.parsedAuthData;
    }

	constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
		this.isLoggedIn = false;
        this.parsedAuthData = "";
        if (this.cookieService.isCookieSet()) {
            this.parsedAuthData = this.cookieService.getCookie();
            this.isLoggedIn = true;
        }
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
                    this.cookieService.setCookie(this.authData);
					resolve();
				},
				error: () => {
					this.isLoggedIn = false;
                    this.parsedAuthData = "";
                    this.cookieService.deleteCookie();
					resolve();
				}
			});
		});
    }
    
    logout() {
        this.isLoggedIn = false;
        this.parsedAuthData = "";
        this.cookieService.deleteCookie();
        this.router.navigate(["login"])
    }
}
