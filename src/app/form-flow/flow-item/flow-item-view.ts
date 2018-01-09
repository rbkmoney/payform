export enum DirectionTransition {
    right = 'slideRightAnimation',
    left = 'slideLeftAnimation'
}

export enum FormHeight {
    cardForm = '288px',
    cardFormWithAdditonalField = '340px',
    cardFormWithTwoAdditonalField = '392px',
    resultForm = '392px',
    paymentMethods = '100px'
}

export class FlowViewInfo {
    slideDirection: DirectionTransition;
    height: FormHeight;
}
