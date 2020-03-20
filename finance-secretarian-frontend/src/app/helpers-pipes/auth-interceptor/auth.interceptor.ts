import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user-service/user.service';

/**
 * this interceptor adds the credentials to every http-request
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private userService: UserService) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (this.userService.isLoggedIn) {
			request = request.clone({
				setHeaders: {
					Authorization: `Basic ${this.userService.authData}`
				}
			});
		}
		return next.handle(request);
	}
}
