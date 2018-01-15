import { ResultState, ConfigState, ModelState, LifecycleState, ErrorState, FormsState, ModalState } from '.';

export type State = {
    readonly result: ResultState;
    readonly config: ConfigState;
    readonly model: ModelState;
    readonly lifecycle: LifecycleState;
    readonly error: ErrorState;
    readonly form: FormsState;
    readonly modals: ModalState[];
}
