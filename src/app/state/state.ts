import { ResultState, ConfigState, ModelState, LifecycleState, ErrorState, FormsState } from '.';

export type State = {
    readonly result: ResultState;
    readonly config: ConfigState;
    readonly model: ModelState;
    readonly lifecycle: LifecycleState;
    readonly error: ErrorState;
    readonly forms: FormsState;
}
