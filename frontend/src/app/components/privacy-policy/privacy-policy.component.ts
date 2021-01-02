import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-privacy-policy',
    templateUrl: './privacy-policy.component.html',
    styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
        // scroll to the top of page after fully loading
        window.scrollTo(0, 0);
    }

}
