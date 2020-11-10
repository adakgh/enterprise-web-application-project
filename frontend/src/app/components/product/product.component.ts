import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    jsonData: string[] = [];
    constructor(
        private router: Router,
        private apiService: ApiService
    ) {}

    ngOnInit(): void {
        this.apiService.get(this.router.url).subscribe(
            (res) => {
                // TODO: do something with this response!
                res.forEach(e => {
                    this.jsonData.push(JSON.stringify(e)); // save to array
                });
                console.log(res); // debug
            }
        );
    }
}
