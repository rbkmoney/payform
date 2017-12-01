import { AbstractAction, TypeKeys } from '..';

export interface InitStageDoneAction extends AbstractAction<boolean> {
    type: TypeKeys.INIT_STAGE_DONE;
}

export function setInitStageDone(): InitStageDoneAction {
    return {
        type: TypeKeys.INIT_STAGE_DONE
    };
}
