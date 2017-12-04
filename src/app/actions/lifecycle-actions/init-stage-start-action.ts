import { TypeKeys, AbstractAction } from '..';

export interface InitStageStartAction extends AbstractAction<boolean> {
    type: TypeKeys.INIT_STAGE_START;
}

export function setInitStageStart(): InitStageStartAction {
    return {
        type: TypeKeys.INIT_STAGE_START
    };
}
