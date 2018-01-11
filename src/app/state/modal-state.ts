export enum ModalName {
    modalInteraction = 'modalInteraction',
    modalForms = 'modalForms'
}

export abstract class ModalState {
    name: ModalName;
}
