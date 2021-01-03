import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable, interval} from 'rxjs';
import {Message} from 'src/app/models/message.model';
import {CurrentUserService} from 'src/app/services/current-user.service';
import {MessagesService} from 'src/app/services/messages.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

    @ViewChild('scrollWrapper') private scrollWrapper: ElementRef;

    inbox: Message[];
    messages: Message[];
    messagesLoaded = false;
    newMessage: string = null;

    selectedRow: Message = null;
    isCustomer: boolean;

    // -----------------------------------------------------------------------------
    // [INIT]
    // -----------------------------------------------------------------------------

    constructor(
        private messagesService: MessagesService,
        private currentUserService: CurrentUserService
    ) {
        this.inbox = [];
        this.messages = [];
    }

    ngOnInit(): void {
        this.updateInbox();
        this.isCustomer = this.currentUserService.isCustomer();

        interval(1000).subscribe(x => { // milliseconds
            if (this.inboxRowSelected) {
                this.updateInbox();
                this.updateChatMessages(this.selectedRow);
            }
        });
    }

    ngAfterViewChecked(): any {
        this.scrollToBottom();
    }

    // -----------------------------------------------------------------------------
    // [CHAT]
    // -----------------------------------------------------------------------------

    public inboxRowSelected(): boolean {
        return this.selectedRow != null;
    }

    public selectInboxRow(row: Message): void {
        this.selectedRow = row;
        this.updateChatMessages(row);

        // reset
        this.messages = [];
        this.messagesLoaded = false;
    }

    public chatMessagesLoaded(): boolean {
        return this.selectedRow != null && this.messagesLoaded;
    }

    public updateInbox(): void {
        this.messagesService.getInboxList().subscribe(inbox => this.inbox = inbox);
    }

    public updateChatMessages(row: Message): void {
        const chattingToId = this.isCustomer ? row.supplier.id : row.customer.id;
        this.messagesService.getChatMessages(chattingToId).subscribe(
            messages => {
                this.messages = messages;
                this.messagesLoaded = true;
                this.scrollToBottom();
            });
    }

    public sendMessage(): void {
        const toUserId = this.isCustomer ? this.selectedRow.supplier.id : this.selectedRow.customer.id
        this.messagesService.sendChatMessage(this.newMessage, toUserId, this.isCustomer).subscribe(
            status => {
                console.log('message successfully added!');
            }
        );
    }

    // -----------------------------------------------------------------------------
    // [OTHER]
    // -----------------------------------------------------------------------------

    public scrollToBottom(): void {
        try {
            this.scrollWrapper.nativeElement.scrollTop = this.scrollWrapper.nativeElement.scrollHeight;
        } catch (err) {
        }
    }

    public isInvalidMessage(): boolean {
        return this.newMessage == null || this.newMessage.length <= 1;
    }
}
