import { BrowserRequest } from './browser-request';
import { FormField } from './form-field';

export class BrowserPostRequest extends BrowserRequest {
    form: FormField[];
}
