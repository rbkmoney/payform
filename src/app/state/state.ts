import { ResultState, ConfigState } from '.';

export type State = {
    readonly result: ResultState;
    readonly config: ConfigState;
}
