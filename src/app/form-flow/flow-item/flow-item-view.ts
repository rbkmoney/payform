export enum DirectionTransition {
    right = 'slideRightAnimation',
    left = 'slideLeftAnimation'
}

export enum FormSizeClass {
    _cardForm = '_cardForm',
    _cardFormWithAmount = '_cardFormWithAmount',
    _resultForm = '_resultForm',
    _paymentMethods = '_paymentMethods'
}

export class FlowViewInfo {
    slideDirection: DirectionTransition;
    formSizeClass: FormSizeClass;
}
