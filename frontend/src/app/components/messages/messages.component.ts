import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ActivatedRoute } from '@angular/router';
import { faThumbsUp, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FaConfig } from '@fortawesome/angular-fontawesome';

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
    numUserMessages: number = 0;

    selectedRow: Message = null;
    newRow: Message;
    requestedParams: any;

    isCustomer: boolean;
    showLoadingButton = false;
    scrollDown = false;

    messageIcon = faThumbsUp;
    loadingIcon = faSpinner;

    // -----------------------------------------------------------------------------
    // [INIT]
    // -----------------------------------------------------------------------------

    constructor(
        private messagesService: MessagesService,
        private currentUserService: CurrentUserService,
        private activatedRoute: ActivatedRoute,
        private faConfig: FaConfig
    ) {
        this.inbox = [];
        this.messages = [];
        this.newRow = new Message();
        this.faConfig.fixedWidth = true;
    }

    ngOnInit(): void {
        this.updateInbox();
        this.isCustomer = this.currentUserService.isCustomer();
        this.pollChatMessages();

        this.activatedRoute.queryParams.subscribe(qp => {
            if (this.isRequestedChat(qp)) { this.requestedParams = qp; }
        });
    }

    // // tslint:disable-next-line:use-lifecycle-interface
    // ngAfterViewChecked(): any {
    //     //this.scrollToBottom();
    // }

    // -----------------------------------------------------------------------------
    // [INBOX]
    // -----------------------------------------------------------------------------

    public isRowSelected(row: Message): boolean {            
        return this.selectedRow ? this.selectedRow.id === row.id : false;
    }

    public inboxRowSelected(): boolean {
        return this.selectedRow != null;
    }

    public selectInboxRow(row: Message): void {        
        this.selectedRow = row;
        this.updateChatMessages(row);
        this.scrollDown = true;
        this.showLoadingButton = false;

        // reset
        this.messages = [];
        this.messagesLoaded = false;;
    }

    public updateInbox(): void {
        this.messagesService.getInboxList().subscribe((inbox: Message[]) => {
            if (inbox.length > 0) {
                // remove duplicate row
                const duplicateRow = this.requestedParams != undefined ? inbox.filter(
                    (row: Message) => row.supplier.id == this.requestedParams.id)[0] : undefined;

                // update relevant rows
                if (duplicateRow != undefined) {                                      
                    inbox.splice(inbox.indexOf(duplicateRow), 1);            
                    this.newRow = duplicateRow; // duplicate found
                } else {
                    this.createDummyChat(); // inbox contains chats, but no duplicate
                }
                this.inbox = inbox;     
            } else {
                this.createDummyChat(); // no chat history
            }
        });
    }

    // -----------------------------------------------------------------------------
    // [MESSAGES]
    // -----------------------------------------------------------------------------

    public chatMessagesLoaded(): boolean {
        return (this.selectedRow != null && this.messagesLoaded);
    }

    public updateChatMessages(row: Message): void {
        const toUserId = this.isCustomer ? row.supplier.id : row.customer.id;
        this.messagesService.getChatMessages(toUserId).subscribe(
            messages => {
                this.messages = messages;
                this.messagesLoaded = true;
                
                if (this.numUserMessages >= this.countUserMessages(this.messages)) {
                    this.showLoadingButton = false;
                }
                
                // if (this.scrollDown === true) { // TODO: doesnt work!
                //     this.scrollDown = false;
                //     this.scrollToBottom();
                // }
            });
    }

    public sendMessage(): void {
        this.showLoadingButton = true;
        this.numUserMessages = this.countUserMessages(this.messages) + 1;
        const toUserId = this.isCustomer ? this.selectedRow.supplier.id : this.selectedRow.customer.id;

        this.messagesService.sendChatMessage(this.newMessage, toUserId).subscribe(
            () => {
                this.showLoadingButton = false;
            }, err => {
                console.log('The message could not be send:' + err);
            }
        );
        this.newMessage = null;
    }

    public sendMessageWithEnter(event: any): void {
        if (event.keyCode === 13 && !this.isInvalidMessage()) { this.sendMessage(); }
    }

    private countUserMessages(messages: Message[]): number {
        let count = 0;
        messages.forEach(e => {
            if (e.sender.id === this.currentUserService.getUserId()) { count += 1; } 
        });
        return count;
    }

    public pollChatMessages(): void {
        const pollTime = 1000; // milliseconds

        interval(pollTime).subscribe(() => {
            if (this.inboxRowSelected()) {
                this.updateInbox();
                this.updateChatMessages(this.selectedRow);
            }
        });
    }

    // -----------------------------------------------------------------------------
    // [REQUESTED CHAT]
    // -----------------------------------------------------------------------------

    private isRequestedChat(queryParams: any): boolean {
        return queryParams.id != undefined && queryParams.name != undefined
    }

    public isRequestRowAvailable(): boolean {
        return this.newRow.supplier != undefined
    }

    private createDummyChat(): void {
        const qp = this.requestedParams;
        if (qp === undefined) return;

        // dummy row
        this.newRow.id = 1;
        this.newRow.message = 'Schrijf een bericht om een gesprek te beginnen ;)';
        this.newRow.createdDate = this.messagesService.constructInboxDateTime(new Date());
        this.newRow.supplier = { id: qp.id, name: qp.name };
        this.newRow.customer = { id: this.currentUserService.getUserId, name: "TODO" };
        this.newRow.sender = { id: this.currentUserService.getUserId, name: "TODO" };
        this.newRow.receiver = { id: qp.id, name: qp.name };
    }

    public requestedChatHasNoHistory(): boolean {
        return this.selectedRow === this.newRow && this.messages.length == 0;
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

    public constructNameId(name: string): string {
        const words = name.split(' ');
        if (words.length > 1) {
            const id = words[0].charAt(0) + words[1].charAt(0);
            return id.toUpperCase();
        }
        return words[0].substr(0, 2).toUpperCase();
    }
}
