import { AbstractAction, TypeKeys } from 'checkout/actions';

interface Meta {
    stageName: string;
}

export interface ResetStage extends AbstractAction<null, Meta> {
    type: TypeKeys.LIFECYCLE_RESET_STAGE;
    meta: Meta;
}

export const resetStage = (stageName: string): ResetStage => ({
    type: TypeKeys.LIFECYCLE_RESET_STAGE,
    meta: {
        stageName
    }
});
