import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotificationsService {
    notificationChange: Subject<Object> = new Subject<Object>();

    exibirMensagemDeSucesso(msg: string, sticky: boolean = false, life: number = 3000) {
        this.notificationChange.next({ severity: 'success', summary: 'Sucesso', detail: msg, sticky: sticky, life: life });
    }

    exibirMensagemDeAlerta(msg: string, sticky: boolean = false, life: number = 3000) {
        this.notificationChange.next({ severity: 'warn', summary: 'Atenção', detail: msg, sticky: sticky, life: life });
    }

    exibirMensagemDeInformacao(msg: string, sticky: boolean = false, life: number = 3000) {
        this.notificationChange.next({ severity: 'info', summary: 'Informação', detail: msg, sticky: sticky, life: life });
    }
    exibirMensagemDeErro(msg: string, sticky: boolean = false, life: number = 3000) {
        this.notificationChange.next({ severity: 'error', summary: 'Erro', detail: msg, sticky: sticky, life: life });
    }
}
