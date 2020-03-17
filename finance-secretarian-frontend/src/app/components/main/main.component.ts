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
    latestSales: Sale[];

    constructor(private salesService: SalesService, private categoriesService: CategoriesService) {}

    async ngOnInit(): Promise<void> {
        this.saveSuccessful = true;
        this.initInputSale();
        this.categories = new Array<Category>();
        this.latestSales = new Array<Sale>();
        this.categories = await this.categoriesService.getCategories();
        console.log("categories before getting paper id", this.categories)
        this.inputSale.categoryId = this.categories.find(category => category.category === "paper").id;
        this.latestSales = await this.salesService.getSales(10);
    }

    initInputSale() {
        this.inputSale = {
            id: null,
            categoryId: 1,
            userId: null,
            amountSold: null,
            amountMoney: null,
            saledate: new Date(Date.now()),
            note: null
        };
    }

    async saveNewSale() {
        if (!this.inputSale.amountSold) {
            this.inputSale.amountSold = 1;
        }

        this.saveSuccessful = await this.salesService.createSale(this.inputSale);
        if (this.saveSuccessful) {
            this.initInputSale();
            this.latestSales = await this.salesService.getSales(10);
        }
    }

    getCategory(id: number): string {
        return this.categories.find(category => category.id === id).category;
    }
}
