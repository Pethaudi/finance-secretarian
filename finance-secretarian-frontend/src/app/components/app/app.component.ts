import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'finance-secretarian-frontend';

	ngOnInit() {
		this.test();
	}

	async test() {
		const resp = await fetch("http://localhost:5500/login", {
			method: "POST",
			body: JSON.stringify({ email: "pethaudi@yahoo.de", password: "test" }),
			headers: {
				"Content-Type": "application/json"
			}
		});
		console.log(resp.status);
	}
}
