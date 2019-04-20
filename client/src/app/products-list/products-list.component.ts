import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ProductState } from '../product.state';
import { Product } from '../models/product.interface';
import { Observable, Subscription } from 'rxjs';
import { GetProducts, SetSelectedProductByValue } from '../actions/product.action';
import { Router } from '@angular/router';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
    loading = true;
    @Select(ProductState.getProductsList) products$: Observable<Product[]>;

    private subscription: Subscription;

    constructor(private store: Store, private router: Router) { }

    ngOnInit() {
        this.subscription = this.store.dispatch(new GetProducts()).subscribe(() => {
            this.loading = false;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    chooseProduct(product: Product) {
        this.store.dispatch(new SetSelectedProductByValue(product));
    }
}
