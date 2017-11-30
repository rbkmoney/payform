import { ResultState, ConfigState, ModelState, LifecycleState } from '.';

export type State = {
    readonly result: ResultState;
    readonly config: ConfigState;
    readonly model: ModelState;
    readonly lifecycle: LifecycleState;
}
