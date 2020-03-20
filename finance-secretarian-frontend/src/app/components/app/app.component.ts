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
	title = 'finance-secretarian';

    /**
     * setting the default language
     * @param translate
     * @param userService
     */
	constructor(private translate: TranslateService, public userService: UserService) {
		this.translate.use("en");
    }
    
    logout() {
        this.userService.logout();
    }
}
