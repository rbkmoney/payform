import { AbstractAction, TypeKeys } from 'checkout/actions';
import { StageStatus } from 'checkout/state';

export interface ChangeStageStatus extends AbstractAction<StageStatus> {
    type: TypeKeys.LIFECYCLE_CHANGE_STAGE_STATUS;
    payload: StageStatus;
}

export const changeStageStatus = (value: StageStatus) => ({
    type: TypeKeys.LIFECYCLE_CHANGE_STAGE_STATUS,
    payload: value
});
