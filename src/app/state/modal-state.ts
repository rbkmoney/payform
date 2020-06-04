import { Named } from './modal';

export enum ModalName {
    modalInteraction = 'modalInteraction',
    modalForms = 'modalForms',
    modalInfo = 'modalInfo'
}

export abstract class ModalState implements Named {
    name: ModalName | string;
    active: boolean;
}
