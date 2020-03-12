import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { SalesService } from 'src/app/services/sales-service/sales.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'finance-secretarian-frontend';

	constructor(private userSerive: UserService, private salesService: SalesService) {
		this.test();
	}

	async test() {
		await this.userSerive.login("pethaudi@yahoo.de", "test");
		await this.userSerive.login("pethaudi@yahoo.de", "test");
		console.log(await this.salesService.getSales());
	}
}
