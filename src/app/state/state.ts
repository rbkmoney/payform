import { ResultState, ConfigState, ModelState, LifecycleState, ErrorState } from '.';

export type State = {
    readonly result: ResultState;
    readonly config: ConfigState;
    readonly model: ModelState;
    readonly lifecycle: LifecycleState;
    readonly error: ErrorState;
}
