import { Injectable } from '@angular/core';
import { Category } from 'src/app/entities/category.i';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

/**
 * this service manages everything about categories
 */
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

    constructor(private http: HttpClient) { }

    /**
     * fetches all categories
     */
    getCategories(): Promise<Category[]> {
        return new Promise<Category[]>(resolve => {
            this.http.get<Category[]>(environment.apiUrl + "categories")
                .subscribe({
                    next: data => resolve(data)
                });
        });
    }
}
