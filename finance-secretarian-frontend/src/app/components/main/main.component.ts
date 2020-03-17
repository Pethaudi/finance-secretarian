import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales-service/sales.service';
import { Sale } from 'src/app/entities/sale.i';
import { Category } from 'src/app/entities/category.i';
import { CategoriesService } from 'src/app/services/categories-service/categories.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    inputSale: Sale;
    categories: Category[]
    saveSuccessful: boolean;

    constructor(private salesService: SalesService, private categoriesService: CategoriesService) {}

    async ngOnInit(): Promise<void> {
        this.saveSuccessful = true;
        this.initInputSale();
        this.categories = await this.categoriesService.getCategories();
    }

    initInputSale() {
        this.inputSale = {
            id: null,
            categoryId: 1,
            userId: null,
            amountSold: 1,
            amountMoney: null,
            saledate: new Date(Date.now()),
            note: null
        };
    }

    async saveNewSale() {
        this.inputSale.categoryId = 1;
        this.saveSuccessful = await this.salesService.createSale(this.inputSale);
    }
}
