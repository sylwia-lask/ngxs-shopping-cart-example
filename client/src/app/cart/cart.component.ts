import { Component } from '@angular/core';
import { faAddressBook, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Select, Store } from '@ngxs/store';
import { ProductState } from '../product.state';
import { Observable } from 'rxjs';
import { Product } from '../models/product.interface';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent {
    faAddressBook = faAddressBook;
    faShoppingCart = faShoppingCart;
    @Select(ProductState.getProductCart) productCart$: Observable<Product[]>;
    @Select(ProductState.getTotalPrice) totalPrice$: Observable<number>;

    constructor(private store: Store) { }

}
