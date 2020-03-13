import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { SalesService } from 'src/app/services/sales-service/sales.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'finance-secretarian-frontend';

	constructor(private translate: TranslateService) {
		this.translate.use("en");
	}
}
