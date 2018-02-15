import { ResultState, ConfigState, ModelState, ErrorState, FormsState, ModalState } from '.';

export interface State {
    readonly result: ResultState;
    readonly config: ConfigState;
    readonly model: ModelState;
    readonly error: ErrorState;
    readonly form: FormsState;
    readonly modals: ModalState[];
}
