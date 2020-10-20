import { AutoSaveFormGroup } from './auto-save-form-group';
import * as moment from 'moment'

export class BaseCadastroComponent {
    public data: any;
    public isUpdate: boolean;
    public idForm: number;
    public submitted: boolean;
    public form: AutoSaveFormGroup;

    private aposRealizarConsulta(response: { data: any; count: number; }) {
        this.data = response.data;
    }

    formatDate(date: any): any {
        if (date) {
            let value = date.toString().split('/');
            return value[2] + '-' + value[1] + '-' + value[0];
        }

        return undefined;
    }

}

