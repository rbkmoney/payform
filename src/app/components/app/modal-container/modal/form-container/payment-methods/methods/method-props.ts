import { Locale } from 'checkout/locale';
import { FormInfo } from 'checkout/state';

export interface MethodProps {
    locale: Locale;
    setFormInfo: (formInfo: FormInfo) => any;
}
