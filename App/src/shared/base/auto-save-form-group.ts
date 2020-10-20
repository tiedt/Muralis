import { FormGroup, AbstractControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';

export class AutoSaveFormGroup extends FormGroup {

    public hasChanges = false;

    private originalValue: any;

    constructor(
        controls: {
            [key: string]: AbstractControl;
        },
        validator?: ValidatorFn,
        asyncValidator?: AsyncValidatorFn
    ) {
        super(controls, validator, asyncValidator);
        this.detectValueChanges();
    }

    private detectValueChanges() {
        this.valueChanges.subscribe(changedValue => {
            if (this.pristine) {
                this.originalValue = JSON.stringify(this.value);
            } else {
                // tslint:disable-next-line:variable-name
                const current_value = JSON.stringify(this.value);
                this.hasChanges = (this.originalValue !== current_value);
            }
        });
    }

}
