import { FormInfo, SlideDirection, FormName } from '../form-info';

export enum ResultType {
    error = 'error',
    processed = 'processed',
    indefinite = 'indefinite'
}

export class ResultFormInfo extends FormInfo {

    resultType: ResultType;

    constructor(resultType: ResultType, active: boolean) {
        super({
            slideDirection: SlideDirection.right,
            height: 392
        });
        this.name = FormName.resultForm;
        this.resultType = resultType;
        this.active = active;
    }
}
