import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from 'primeng/primeng';
import { NotificationsService } from './notificacao-mensagem';

@Component({
    selector: 'app-notifications',
    template: '<p-growl [value]="msgs" [sticky]="sticky" [life]="life"></p-growl>'
})
export class NotificationsComponent implements OnInit, OnDestroy {

    msgs: Message[] = [];
    sticky = false;
    life = 3000;
    subscription: Subscription;

    constructor(private notificationsService: NotificationsService) { }

    ngOnInit() {
        this.subscribeToNotifications();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private subscribeToNotifications() {
        this.subscription = this.notificationsService
            .notificationChange
            .subscribe(notification => {
                this.sticky = notification['sticky'];
                this.life = notification['life'];

                this.msgs = [];
                this.msgs.push(notification);
            });
    }
}