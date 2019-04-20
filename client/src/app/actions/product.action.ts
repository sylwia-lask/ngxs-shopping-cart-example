import { Product } from '../models/product.interface';

export class GetProducts {
    static readonly type = '[Product] Get';
}

export class SetSelectedProductById {
    static readonly type = '[Product API] Set';

    constructor(public id: number) {
    }
}

export class SetSelectedProductByValue {
    static readonly type = '[Product Page] Set';

    constructor(public product: Product) {
    }
}

export class AddProductToCart {
    static readonly type = '[Product] Add';

    constructor(public product: Product) {

    }
}

export class UpdateTotalPrice {
    static readonly type = '[Product] TotalPrice';

    constructor(public product: Product) {

    }
}
