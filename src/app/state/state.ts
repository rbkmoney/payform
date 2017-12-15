import { ResultState, ConfigState, ModelState, LifecycleState, ErrorState, FormsState } from '.';
import { FormFlowItem } from 'checkout/form-flow';

export type State = {
    readonly result: ResultState;
    readonly config: ConfigState;
    readonly model: ModelState;
    readonly lifecycle: LifecycleState;
    readonly formsFlow: FormFlowItem[];
    readonly error: ErrorState;
    readonly form: FormsState;
}
