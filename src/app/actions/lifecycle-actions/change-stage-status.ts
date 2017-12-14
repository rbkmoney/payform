import { AbstractAction, TypeKeys } from 'checkout/actions';
import { StageStatus } from 'checkout/lifecycle';

interface Meta {
    stageName: string;
}

export interface ChangeStageStatus extends AbstractAction<StageStatus, Meta> {
    type: TypeKeys.LIFECYCLE_CHANGE_STAGE_STATUS;
    payload: StageStatus;
    meta: Meta;
}

export const changeStageStatus = (stageName: string, value: StageStatus): ChangeStageStatus => ({
    type: TypeKeys.LIFECYCLE_CHANGE_STAGE_STATUS,
    payload: value,
    meta: {
        stageName
    }
});
