import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MyProductsService} from '../../services/my-products.service';
import {RouteUtil} from '../../utils/route.util';
import {ProductService} from '../../services/product.service';
import {SupplierInfoService} from '../../services/supplier-info.service';
import {log} from 'util';

@Component({
    selector: 'app-myproducts',
    templateUrl: './myproducts.component.html',
    styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit {

    jsonData: any[] = [];
    jsonSupplierData;

    constructor(
        private router: Router,
        private apiService: ApiService,
        private routeUtil: RouteUtil,
        private productService: ProductService,
        private myProductsService: MyProductsService,
        private supplierInfoService: SupplierInfoService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(
            res => {
                // If there is no query given return user to homepage
                if (res.id <= 0 || res.id == null) {
                    this.router.navigate(['/']);
                    return;
                }
                this.loadSupplierData(res.id);
            },
            err => {
                console.log('Can not find endPoint' + err);
            });
    }

    loadSupplierData(id: number): void {
        this.supplierInfoService.getSupplier(id).subscribe(
            res => {
                this.jsonSupplierData = res;
            },
            err => {
                console.log(err);
            }
        );
    }

    delete(productId: string): void {
        const idNumber: number = +productId;
        console.log(idNumber);
        this.productService.deleteProduct(idNumber).subscribe(
            resp => {
                console.log('verwijderd');
            },
            error => {
                console.log(error);
            }
        );
    }

}
