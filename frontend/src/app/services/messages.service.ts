import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Message } from '../models/message.model';
import { ApiService } from './api.service';
import { formatDate } from '@angular/common';
import { CurrentUserService } from './current-user.service';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {

    private inbox: Message[];
    private messages: Message[];

    // -----------------------------------------------------------------------------
    // [INIT]
    // -----------------------------------------------------------------------------

    constructor(
        private apiService: ApiService,
        private currentUserService: CurrentUserService
    ) {
        this.inbox = [];
    }

    // -----------------------------------------------------------------------------
    // [REST]
    // -----------------------------------------------------------------------------

    public getInboxList(): Observable<Message[]> {
        return this.apiService.get('/chat/user/last')
            .pipe(map(
                res => {
                    // clear inbox if page is revisited
                    this.inbox = [];

                    res.forEach((e: Message) => {
                        const row = e[0];
                        row.createdDate = formatDate(row.createdDate, 'dd-MM-yyyy', 'en-UK');
                        this.inbox.push(row);
                    });

                    // sort inbox on name
                    const isCustomer = this.currentUserService.isCustomer();
                    this.inbox.sort((a,b) => {
                        return isCustomer 
                            ? a.supplier.name.localeCompare(b.supplier.name) 
                            : a.customer.name.localeCompare(b.customer.name) 
                    })
                    return this.inbox;
                }
            ));
    }

    public getChatMessages(chattingToId: number): Observable<Message[]> {
        return this.apiService.get('/chat/conversation/' + chattingToId)
            .pipe(map(
                res => {
                    // clear messages if different user selected
                    this.messages = [];

                    res.forEach((e: Message[]) => {
                    
                        // iterate chat messages
                        e.forEach(msg => {
                            msg.direction = this.resolveMessageDirection(msg);
                            msg.createdDate = this.constructMessageDateTime(new Date(msg.createdDate));
                            this.messages.push(msg);
                        })
                    });
                    return this.messages;
                }
            ));
    }

    public sendChatMessage(message: string, toUserId: number, isCustomer: boolean): Observable<any> {
        const body = {isCustomer: isCustomer, message: message}
        return this.apiService.post('/chat/conversation/' + toUserId, body, null);
    } 

    // -----------------------------------------------------------------------------
    // [OTHER]
    // -----------------------------------------------------------------------------

    private resolveMessageDirection(message: Message): string {
        if (message.receiver.id === this.currentUserService.getUserId()) {
            return "RIGHT";
        }
        return "LEFT";
    }

    private constructMessageDateTime(date: Date): string {
        // construct date
        var shortDate = '';
        var today = new Date();
        today.setHours(0, 0, 0, 0);

        if (date >= today) {
            const month = date.toLocaleString('default', { month: 'long' }) // name of month
            const day = date.getUTCDate(); // number of day
            shortDate = month + " " + day;
        } else {
            shortDate = "Today"
        }
        

        // construct time
        var options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        const time = date.toLocaleString('en-UK', options)

        // return constructed chat dateTime        
        return time + " | " + shortDate;

    }
}
