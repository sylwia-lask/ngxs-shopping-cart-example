import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ProductState } from '../product.state';
import { Product } from '../models/product.interface';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SetSelectedProductById, AddProductToCart } from '../actions/product.action';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
    @Select(ProductState.getSelectedProduct) product$: Observable<Product>;

    constructor(private store: Store, private route: ActivatedRoute) { }

    ngOnInit() {
        const isProductSelected = this.store.snapshot().products.selectedProduct;
        if (!isProductSelected) {
            this.route.params.subscribe((params) => {
                this.store.dispatch(new SetSelectedProductById(Number(params.id)));
            });
        }
    }

    addProductToCart(product) {
        this.store.dispatch(new AddProductToCart(product));
    }
}
