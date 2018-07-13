import { FormInfo, FormName } from '../form-info';

export class HelpFormInfo extends FormInfo {
    constructor(previous?: FormName) {
        super(previous);
        this.name = FormName.helpForm;
        this.active = true;
    }
}
