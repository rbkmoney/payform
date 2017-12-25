export enum DirectionTransition {
    right = 'slideRightAnimation',
    left = 'slideLeftAnimation'
}

export enum FormSizeClass {
    cardForm = '_cardForm',
    cardFormWithAmount = '_cardFormWithAmount',
    resultForm = '_resultForm',
    paymentMethods = '_paymentMethods'
}

export class FlowViewInfo {
    slideDirection: DirectionTransition;
    formSizeClass: FormSizeClass;
}
