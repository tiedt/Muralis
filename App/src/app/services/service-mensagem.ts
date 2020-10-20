import { Injectable } from '@angular/core';
import { NotificationsService } from './notificacao-mensagem';
import { Subject } from 'rxjs';
import { Confirmation, ConfirmationService } from 'primeng/primeng';
import { LoadingService } from './loading-service';

/**
 * Esta classe tem o objetivo de centralizar todos os services que são utilizados em toda a aplicação.
 */
@Injectable()
export class ServicesMessages {

    constructor(
        public notification: NotificationsService,
        public loading: LoadingService,
        public confirmation: ConfirmationService
    ) { }


    handleError(error: any, msg?: string, sticky: boolean = false) {

        this.notification.exibirMensagemDeErro(error.error.error.message.replace(/(\n)+/g, '<br />'), sticky);
    }
}

