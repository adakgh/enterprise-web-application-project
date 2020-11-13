import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {InquiryService} from '../../services/inquiry.service';

@Component({
    selector: 'app-requestproduct',
    templateUrl: './requestproduct.component.html',
    styleUrls: ['./requestproduct.component.css']
})
export class RequestproductComponent implements OnInit {
    inquiry: any[] = [];

    constructor(private apiService: ApiService,
                private requestsService: InquiryService) {}

    ngOnInit(): void {
        this.requestsService.getAllInquries().subscribe(
            res => {
                this.inquiry = res;
            },
            err => {
                console.log(err);
            });
    }
}
