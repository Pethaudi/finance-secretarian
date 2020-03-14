import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './helpers-pipes/auth-interceptor/auth.interceptor';
import { ErrorInterceptor } from './helpers-pipes/error-interceptor/error.interceptor';
import { AuthGuard } from './helpers-pipes/auth-guard/auth.guard';
import { MainComponent } from './components/main/main.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		MainComponent
	],
	imports: [
        FormsModule, 
        BrowserModule,
		HttpClientModule,
        AppRoutingModule,
		TranslateModule.forRoot({
			defaultLanguage: "en",
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	providers: [
        AuthGuard,
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

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}