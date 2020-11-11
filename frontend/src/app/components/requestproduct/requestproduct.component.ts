import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {RouteUtil} from '../../utils/route.util';
import {InquiryService} from '../../services/inquiry.service';

@Component({
    selector: 'app-requestproduct',
    templateUrl: './requestproduct.component.html',
    styleUrls: ['./requestproduct.component.css']
})
export class RequestproductComponent implements OnInit {
    inquiry: any[] = [];
    message: string;
    category: string;

    constructor(private apiService: ApiService,
                private routeUtil: RouteUtil,
                private requestsService: InquiryService
    ) {}

    ngOnInit(): void {
        this.requestsService.getAllInquries().subscribe(
            res => {
                console.log(res);
                this.inquiry = res;

                for (let i = 0; i < this.inquiry.length; i++) {
                    this.message = JSON.parse(JSON.stringify(res[i].message));
                    this.category = JSON.parse(JSON.stringify(res[i].inquiryCategory.name));
                }
            },
            err => {
                console.log(err);
            });
    }
}
