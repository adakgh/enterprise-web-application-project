import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

    allMessages = [1, 2];   // TEMP array with the messages
    selectedMessage;                    // Selected Message on the leftPanel

    constructor() {
    }

    ngOnInit(): void {
    }

    onClick(message) {
        this.selectedMessage = message;
        console.log("LOLLLLL");
    }
}
