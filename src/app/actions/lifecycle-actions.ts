import { TypeKeys } from './type-keys';
import { AbstractAction } from './abstract-action';

export interface InitStageDoneAction extends AbstractAction<boolean> {
    type: TypeKeys.INIT_STAGE_DONE;
}

export function setInitStageDone(): InitStageDoneAction {
    return {
        type: TypeKeys.INIT_STAGE_DONE
    };
}
