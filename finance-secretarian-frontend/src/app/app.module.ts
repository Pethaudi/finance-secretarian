import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { OtherComponent } from './components/other/other.component';
import { AuthInterceptor } from './helpers-pipes/auth-interceptor/auth.interceptor';
import { ErrorInterceptor } from './helpers-pipes/error-interceptor/error.interceptor';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		OtherComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		}, {
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
