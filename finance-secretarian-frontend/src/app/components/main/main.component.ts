import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales-service/sales.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    constructor(private salesService: SalesService) { }

    ngOnInit(): void {
        this.test()
    }

    async test() {
        console.log(await this.salesService.getSales());
    }

}
