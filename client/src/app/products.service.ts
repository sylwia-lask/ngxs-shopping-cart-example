import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './models/product.interface';
import { Observable } from 'rxjs';

const API_ADDRESS = 'http://localhost:3000';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${API_ADDRESS}/products`);
    }

    getSingleProduct(id: number): Observable<Product> {
        return this.http.get<Product>(`${API_ADDRESS}/products/${id}`);
    }
}
