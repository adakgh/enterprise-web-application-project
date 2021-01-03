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

    jsonSupplierData;       // All the products of the supplier
    deleteProductId;        // The id of the product to delete

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

    /** Initialize the products list and check wheter the logged in user is the supplier */
    ngOnInit(): void {

        // Get the supplierid of the queryParams
        this.activatedRoute.queryParams.subscribe(
            res => {
                // If there is no query given return user to homepage
                if (res.id <= 0 || res.id == null) {
                    this.router.navigate(['/']);
                    return;
                }
                // console.log(this.currentUserService.getUserId());
                // console.log(this.currentUserService.getSupplierId());
                // console.log(res.id);
                if (this.currentUserService.getUserId() == res.id) {
                    this.isTheSupplier = true;
                }
                this.loadSupplierData(res.id);
            },
            err => {
                console.log('Can not find endPoint' + err);
            });
    }

    /** Query all products and supplierinfo of the supplier provided in the queryParams */
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

    /** Delete the product by ID  */
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

    /** Export products to excell */
    downloadSupplierProducts(): void {
        const id = this.activatedRoute.snapshot.queryParams.id;
        this.supplierInfoService.getSupplier(id).subscribe(
            res => {
                const data: any[] = Array.of(res);
                const newArray: any[] = [];

                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < data.length; i++) {
                    // tslint:disable-next-line:prefer-for-of
                    for (let j = 0; j < data[i].products.length; j++) {
                        newArray.push({
                            // Bedrijfsnaam: data[i].companyName,
                            // Contactpersoon: data[i].contactPerson,
                            // 'Contact Email': data[i].contactEmail,
                            // Telefoonnummer: data[i].phoneNumber,
                            // Website: data[i].website,
                            // 'Korte omschrijving': data[i].shortDescription,
                            // Omschrijving: data[i].description,
                            'NR.': j + 1,
                            PRODUCT: data[i].products[j].name,
                            CATEGORIE: data[i].products[j].productCategory.name,
                            OMSCHRIJVING: data[i].products[j].description,
                            PRIJS: data[i].products[j].price,
                            VOORRAAD: data[i].products[j].quantity,
                            'DATUM TOEGEVOEGD': data[i].products[j].addedDate.substring(0, 10)
                        });
                    }
                }

                const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(newArray);

                // columns width
                const wscols = [
                    {wch: 5},
                    {wch: 25},
                    {wch: 20},
                    {wch: 70},
                    {wch: 17},
                    {wch: 20},
                    {wch: 20},
                ];
                workSheet['!cols'] = wscols;

                const workBook: XLSX.WorkBook = XLSX.utils.book_new();

                XLSX.utils.book_append_sheet(workBook, workSheet, 'producten_export');
                XLSX.writeFile(workBook, 'producten_export.xlsx');
            }, err => {
                console.log(err);
            });
    }

    /** Store the id of the product to delete  */
    storeDeleteProductId(productId): any {
        this.deleteProductId = productId;
    }
}
