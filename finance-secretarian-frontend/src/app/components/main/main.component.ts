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
    isTooltipVisible: boolean;
    saleToDelete: Sale | null;

    constructor(private salesService: SalesService, private categoriesService: CategoriesService) {}

    /**
     * initalizing all values and fetching the needed values from the server
     */
    async ngOnInit(): Promise<void> {
        this.saveSuccessful = true;
        this.isTooltipVisible = false;
        this.saleToDelete = null;
        this.initInputSale();
        this.categories = new Array<Category>();
        this.latestSales = new Array<Sale>();
        this.categories = await this.categoriesService.getCategories();
        this.inputSale.categoryId = this.categories.find(category => category.category === "paper").id;
        this.latestSales = await this.salesService.getSales(100);
    }

    /**
     * initializing the inputSale
     */
    initInputSale() {
        this.inputSale = {
            id: null,
            categoryId: 1,
            userId: null,
            amountSold: null,
            revenue: null,
            saledate: new Date(Date.now()),
            note: null
        };
    }

    /**
     * trying to save the new sale. If successful it resets the inputsale
     */
    async saveNewSale() {
        if (!this.inputSale.amountSold) {
            this.inputSale.amountSold = 1;
        }

        this.saveSuccessful = await this.salesService.createSale(this.inputSale);
        if (this.saveSuccessful) {
            this.initInputSale();
            this.latestSales = await this.salesService.getSales(100);
        }
    }

    /**
     * returns the name of the category
     * @param id id of the category
     */
    getCategory(id: number): string {
        return this.categories.find(category => category.id === id).category;
    }

    /**
     * tries to delete a sale
     */
    async deleteSale() {
        if (await this.salesService.deleteSale(this.saleToDelete)) {
            this.latestSales = this.latestSales.filter(elem => elem.id !== this.saleToDelete.id);
        } else {
            console.log("error");
        }
        this.toggleTooltip(null);
    }

    /**
     * toggles the tooltip for confirming a deletion
     * @param sale sale to possible delete, which gets saved in a local variable
     */
    toggleTooltip(sale: Sale | null) {
        this.isTooltipVisible = !this.isTooltipVisible;
        this.saleToDelete = sale;
    }
}
