import { ProductsService } from './products.service';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

const API_ADDRESS = 'http://localhost:3000';

describe('CoursesService', () => {
    let httpTestingController: HttpTestingController;
    let service: ProductsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ProductsService],
            imports: [HttpClientTestingModule]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(ProductsService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getAllProductsRequest', () => {
        it('returned Observable should match the right data', () => {
            const mockApiResponse = [
                {
                    id: 9,
                    name: 'Klocki lego',
                    desc: 'Spróbuj w nie nie wdepnąć!',
                    img: 'https://picsum.photos/id/9/1200/400',
                    imgThumbnail: 'https://picsum.photos/id/9/200/200',
                    price: 29
                },
                {
                    id: 10,
                    name: 'Bluza',
                    desc: 'Dobra na wietrzne dni',
                    img: 'https://picsum.photos/id/10/1200/400',
                    imgThumbnail: 'https://picsum.photos/id/10/200/200',
                    price: 29
                }
            ];


            service.getProducts()
                .subscribe(response => {
                    expect(response[0].id).toEqual(9);
                    expect(response[0].name).toEqual('Klocki lego');
                    expect(response[0].price).toEqual(29);
                });

            const req = httpTestingController.expectOne(
                `${API_ADDRESS}/products`
            );

            req.flush(mockApiResponse);
        });
    });

    describe('getProductRequest', () => {
        it('returned Observable should match the right data', () => {
            const mockApiResponse = {
                id: 10,
                name: 'Bluza',
                desc: 'Dobra na wietrzne dni',
                img: 'https://picsum.photos/id/10/1200/400',
                imgThumbnail: 'https://picsum.photos/id/10/200/200',
                price: 29
            };

            service.getSingleProduct(10)
                .subscribe(response => {
                    expect(response.id).toEqual(10);
                    expect(response.name).toEqual('Bluza');
                    expect(response.price).toEqual(29);
                });

            const req = httpTestingController.expectOne(
                `${API_ADDRESS}/products/10`
            );

            req.flush(mockApiResponse);
        });
    });
});
