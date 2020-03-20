import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from '../cookie-service/cookie.service';
import { Router } from '@angular/router';

/**
 * this service handles everything about the user
 */
@Injectable({
	providedIn: 'root'
})
export class UserService {

    /**
     * indicates if a user is logged in
     */
    isLoggedIn: boolean;
    
    /**
     * not saving the password and email directly, saving the authentication-string
     */
    private parsedAuthData: string;
    /**
     * returns the auth-string
     */
	get authData(): string {
        return this.parsedAuthData;
    }

    /**
     * checks if a cookie is and if logs in the user
     * @param http
     * @param cookieService
     * @param router
     */
	constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
		this.isLoggedIn = false;
        this.parsedAuthData = "";
        if (this.cookieService.isCookieSet()) {
            this.parsedAuthData = this.cookieService.getCookie();
            this.isLoggedIn = true;
        }
	}

    /**
     * tries to log the user in with the given credentials
     * @param email
     * @param password
     */
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
    
    /**
     * logsout the user, deletes the cookies and navigates to the login-page
     */
    logout() {
        this.isLoggedIn = false;
        this.parsedAuthData = "";
        this.cookieService.deleteCookie();
        this.router.navigate(["login"])
    }
}
