export enum DirectionTransition {
    right = 'slideRightAnimation',
    left = 'slideLeftAnimation'
}

export enum FormSizeClass {
    cardForm = '_cardForm',
    cardFormWithAdditonalField = '_cardFormWithAdditonalField',
    cardFormWithTwoAdditonalField = '__cardFormWithTwoAdditonalField',
    resultForm = '_resultForm',
    paymentMethods = '_paymentMethods'
}

export class FlowViewInfo {
    slideDirection: DirectionTransition;
    formSizeClass: FormSizeClass;
}
