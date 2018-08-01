import { FormInfo } from 'checkout/state';
import { AbstractAction, TypeKeys } from 'checkout/actions';

export enum Direction {
    back = 'back',
    forward = 'forward'
}

export interface GoToPayload {
    formInfo: FormInfo;
    direction: Direction;
}

export interface GoToFormInfo extends AbstractAction<GoToPayload> {
    type: TypeKeys.GO_TO_FORM_INFO;
    payload: GoToPayload;
}

export const goToFormInfo = (formInfo: FormInfo, direction: Direction = Direction.forward): GoToFormInfo => ({
    type: TypeKeys.GO_TO_FORM_INFO,
    payload: { formInfo, direction }
});
