import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap, catchError, startWith } from 'rxjs/operators';
import { Product } from './models/product.interface';
import { ProductsService } from './products.service';
import {
    GetProducts, SetSelectedProductByValue, SetSelectedProductById,
    AddProductToCart, UpdateTotalPrice
} from './actions/product.action';
import { of } from 'rxjs';

export class ProductStateModel {
    products: Product[];
    selectedProduct: Product;
    productCart: Product[];
    totalPrice: number;
}

@State<ProductStateModel>({
    name: 'products',
    defaults: {
        products: [],
        selectedProduct: null,
        productCart: [],
        totalPrice: 0
    }
})
export class ProductState {
    constructor(private productsService: ProductsService) {

    }

    @Selector()
    static getProductsList(state: ProductStateModel) {
        return state.products;
    }

    @Selector()
    static getSelectedProduct(state: ProductStateModel) {
        return state.selectedProduct;
    }

    @Selector()
    static getProductCart(state: ProductStateModel) {
        return state.productCart;
    }

    @Selector()
    static getTotalPrice(state: ProductStateModel) {
        return state.totalPrice;
    }

    @Action(GetProducts)
    getProducts({ getState, setState }: StateContext<ProductStateModel>) {
        return this.productsService.getProducts().pipe(tap((result) => {
            const state = getState();
            const products = result;
            setState({
                ...state,
                products
            });
        }),
            catchError(error => {
                console.log('get products api error');
                return of(null);
            }));
    }

    @Action(SetSelectedProductByValue)
    setSelectedProductByValue(ctx: StateContext<ProductStateModel>, { product }: SetSelectedProductByValue) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            selectedProduct: product
        });
    }

    @Action(SetSelectedProductById)
    setSelectedProductById(ctx: StateContext<ProductStateModel>, { id }: SetSelectedProductById) {
        return this.productsService.getSingleProduct(id).pipe(tap((result) => {
            const state = ctx.getState();
            const selectedProduct = result;
            ctx.setState({
                ...state,
                selectedProduct
            });
        }),
            catchError(error => {
                console.log('get products api error');
                return of(null);
            }));
    }

    @Action(AddProductToCart)
    addProductToCart(ctx: StateContext<ProductStateModel>, { product }: AddProductToCart) {
        const state = ctx.getState();
        const productCart = [...state.productCart];
        if (!productCart.some(p => p.id === product.id)) {
            productCart.push(product);
        }

        ctx.setState({
            ...state,
            productCart
        });

        return ctx.dispatch(new UpdateTotalPrice(product));
    }

    @Action(UpdateTotalPrice)
    updateTotalPrice(ctx: StateContext<ProductStateModel>, { product }: UpdateTotalPrice) {
        const state = ctx.getState();
        const totalPrice = state.totalPrice + product.price;
        ctx.setState({
            ...state,
            totalPrice
        });
    }
}
