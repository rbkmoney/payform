import { ResultState, ConfigState, ModelState, LifecycleState, ErrorState, FormsState, FormFlowItem } from '.';

export type State = {
    readonly result: ResultState;
    readonly config: ConfigState;
    readonly model: ModelState;
    readonly lifecycle: LifecycleState;
    readonly formsFlow: FormFlowItem[];
    readonly error: ErrorState;
    readonly forms: FormsState;
}
