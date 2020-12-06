import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MyProductsService} from '../../services/my-products.service';
import {RouteUtil} from '../../utils/route.util';
import {ProductService} from '../../services/product.service';
import {SupplierInfoService} from '../../services/supplier-info.service';
import {log} from 'util';
import {DemoImage} from '../supplier-info/supplier-info-edit/default-image';
import {CurrentUserService} from '../../services/current-user.service';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-myproducts',
    templateUrl: './myproducts.component.html',
    styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit {

    jsonData: any[] = [];
    jsonSupplierData;

    isTheSupplier = false;  // Boolean to check if you have rights for editing

    constructor(
        private router: Router,
        private apiService: ApiService,
        private routeUtil: RouteUtil,
        private productService: ProductService,
        private myProductsService: MyProductsService,
        private supplierInfoService: SupplierInfoService,
        private activatedRoute: ActivatedRoute,
        public demoImage: DemoImage,
        private currentUserService: CurrentUserService
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
                console.log(this.currentUserService.getUserId());
                console.log(this.currentUserService.getSupplierId());
                console.log(res.id);
                if (this.currentUserService.getUserId() == res.id) {
                    this.isTheSupplier = true;
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
                this.reloadProductPage();
            },
            error => {
                console.log(error);
            }
        );
    }

    reloadProductPage(): void {
        // Reload the page when send button is pressed
        window.location.reload();
    }

    downloadSupplierProducts(): void {
        const id = this.activatedRoute.snapshot.queryParams.id;
        this.supplierInfoService.getSupplier(id).subscribe(
            res => {
                const data: any[] = Array.of(res);
                const newArray: any[] = [];

                const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(newArray);

                const workBook: XLSX.WorkBook = XLSX.utils.book_new();

                XLSX.utils.book_append_sheet(workBook, workSheet, 'producten_export');
                XLSX.writeFile(workBook, 'producten_export.xlsx');
            }, err => {
                console.log(err);
            });
    }

}
