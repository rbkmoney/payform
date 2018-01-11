import { FormInfo, SlideDirection } from '../form-info';

export enum ResultType {
    error = 'error',
    processed = 'processed',
    indefinite = 'indefinite'
}

export class ResultFormInfo extends FormInfo {

    resultType: ResultType;

    constructor(resultType: ResultType) {
        super({
            slideDirection: SlideDirection.right,
            height: 392
        });
        this.resultType = resultType;
    }
}
