import { FormInfo, FormName } from '../form-info';

export enum ResultType {
    error = 'error',
    processed = 'processed'
}

export class ResultFormInfo extends FormInfo {
    resultType: ResultType;

    constructor(resultType: ResultType) {
        super();
        this.name = FormName.resultForm;
        this.resultType = resultType;
        this.active = true;
    }
}
