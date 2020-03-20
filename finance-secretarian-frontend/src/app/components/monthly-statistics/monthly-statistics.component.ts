import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales-service/sales.service';
import { Sale } from 'src/app/entities/sale.i';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories-service/categories.service';
import { Category } from 'src/app/entities/category.i';

@Component({
  selector: 'app-monthly-statistics',
  templateUrl: './monthly-statistics.component.html',
  styleUrls: ['./monthly-statistics.component.css']
})
export class MonthlyStatisticsComponent implements OnInit {

    month: number;
    year: number;
    sales: Sale[];
    totalRevenue: number;
    subscriptions: Sale[];
    donations: Sale[];
    others: Sale[];
    papers: Sale[];
    brochures: Sale[];
    categories: Category[];
    
    /**
     * initializing variables
     * @param saleService
     * @param route
     * @param categoryService
     * @param router
     */
    constructor(private saleService: SalesService, private route: ActivatedRoute,
        private categoryService: CategoriesService, private router: Router) {
        this.sales = new Array<Sale>();
        this.subscriptions = new Array<Sale>();
        this.donations = new Array<Sale>();
        this.others = new Array<Sale>();
        this.brochures = new Array<Sale>();
        this.brochures.push({
            id: null,
            amountSold: 0,
            revenue: 0,
            saledate: null,
            categoryId: null,
            userId: null,
            note: null
        });

        this.papers = new Array<Sale>();
        this.papers.push({
            id: null,
            amountSold: 0,
            revenue: 0,
            saledate: null,
            categoryId: null,
            userId: null,
            note: null
        });
    }

    /**
     * fetching the parameters from the route and the server
     * filtering and preparing data for displaying
     */
    async ngOnInit() {
        await this.getParams();
        this.sales = await this.saleService.getSalesPerPeriod(this.month, this.year);
        this.categories = await this.categoryService.getCategories();
        this.subscriptions = this.sales.filter(sale => sale.categoryId === this.categories.find(category => category.category === "subscription").id);
        this.donations = this.sales.filter(sale => sale.categoryId === this.categories.find(category => category.category === "donation").id);
        this.papers = this.sales.filter(sale => sale.categoryId === this.categories.find(category => category.category === "paper").id)
            .sort((a: Sale, b: Sale) => b.revenue - a.revenue);
        this.brochures = this.sales.filter(sale => sale.categoryId === this.categories.find(category => category.category === "brochure").id)
            .sort((a: Sale, b: Sale) => b.revenue - a.revenue);
        this.others = this.sales.filter(sale => sale.categoryId === this.categories.find(category => category.category === "other").id);

        if (this.papers.length === 0) {
            this.papers.push({
                id: null,
                amountSold: 0,
                revenue: 0,
                saledate: null,
                categoryId: null,
                userId: null,
                note: null
            });
        }

        if (this.brochures.length === 0) {
            this.brochures.push({
                id: null,
                amountSold: 0,
                revenue: 0,
                saledate: null,
                categoryId: null,
                userId: null,
                note: null
            });
        }
    }

    /**
     * saves the params of the url in the local variables month & year
     */
    getParams(): Promise<void> {
        return new Promise<void>(async resolve => {
            this.route.paramMap.subscribe(
                params => {
                    this.month = +params.get("month");
                    this.year = +params.get("year");
                    resolve();
                }
            );
        })
    }

    /**
     * computes the amount of sales
     * @param sales sales to get the amount
     */
    getAmount(sales: Sale[]): number {
        if (sales.length === 0) {
            return 0;
        }
        return sales.map(sale => sale.amountSold).reduce((prev, cur) => cur + prev);
    }

    /**
     * computes the revenue of sales
     * @param sales sales to get the revenue
     */
    getTotalRevenue(sales: Sale[]): number {
        if (sales.length === 0) {
            return 0;
        }
        return sales.map(sale => sale.revenue).reduce((prev, cur) => prev + cur);
    }

    /**
     * generates the link for the next/previous month
     * @param next link for the next month (if false it generates the link for the previous month)
     */
    generateLink(next: boolean) {
        let link = "/monthly-statistics/";

        if (next) {
            if (this.month + 1 === 13) {
                this.year++;
                this.month = 1;
            } else {
                this.month++;
            }
        } else {
            if (this.month - 1 === 0) {
                this.year--;
                this.month = 12;
            } else {
                this.month--;
            }
        }
        link += this.month + "/" + this.year;

        this.router.navigateByUrl(link);
        this.ngOnInit();
    }
}
