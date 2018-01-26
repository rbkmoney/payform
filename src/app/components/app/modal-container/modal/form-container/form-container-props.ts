import { FormInfo } from 'checkout/state/modal/form-info';
import { FormViewInfo } from 'checkout/state';

export interface FormContainerProps {
    activeFormInfo: FormInfo;
    viewInfo: FormViewInfo;
}
