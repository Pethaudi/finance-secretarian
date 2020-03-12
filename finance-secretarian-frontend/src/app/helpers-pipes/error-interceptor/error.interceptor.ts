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

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

	constructor(private userService: UserService) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request)
			.pipe(
				catchError(err => {
					if (err.status === 401) {
						this.userService.isLoggedIn = false;
						location.reload();
					}

					const error = err.error.message || err.statusText;
					return throwError(error);
				})
			);
	}
}
