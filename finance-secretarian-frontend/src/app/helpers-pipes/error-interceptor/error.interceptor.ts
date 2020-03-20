import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';

/**
 * this interceptor redirects the user to the login page if a http-request returns 401
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

	constructor(private userService: UserService, private router: Router) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request)
			.pipe(
				catchError(err => {
					if (err.status === 401) {
                        this.userService.isLoggedIn = false;
                        if (this.router.url !== "/login") {
                            location.reload();
                        }
					}

					const error = err.error.message || err.statusText;
					return throwError(error);
				})
			);
	}
}
