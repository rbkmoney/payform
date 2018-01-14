import { cloneDeep } from 'lodash';
import {
    FormInfo,
    FormName,
    ModalForms,
    ModalName,
    ModalState,
    Named,
    PaymentStatus,
    SlideDirection
} from 'checkout/state';
import { findNamed } from 'checkout/utils';
import {
    TypeKeys,
    SetModalState,
    SetFormInfo,
    SetViewInfoError,
    SetViewInfoInProcess,
    SetActiveFormInfo,
    SetActiveModal,
    PrepareToPay,
    PrepareToRetry
} from 'checkout/actions';

type ModalReducerAction =
    SetModalState |
    SetViewInfoError |
    SetViewInfoInProcess |
    SetFormInfo |
    SetActiveModal |
    SetActiveFormInfo |
    PrepareToPay |
    PrepareToRetry;

const deactivate = (items: Named[]): Named[] => items.map((item) => {
    item.active = false;
    return item;
});

const add = (items: Named[], item: Named): Named[] => {
    let result = items ? cloneDeep(items) : [];
    result = (result.length > 0 && item.active) ? deactivate(result) : result;
    result.push(item);
    return result;
};

const update = (items: Named[], item: Named, position: number): Named[] => {
    let result = cloneDeep(items);
    result = item.active ? deactivate(result) : result;
    result[position] = item;
    return result;
};

const addOrUpdate = (items: Named[], item: Named): Named[] => {
    const index = items ? items.findIndex((current) => current.name === item.name) : -1;
    return index === -1 ? add(items, item) : update(items, item, index);
};

const updateViewInfo = (s: ModalState[], viewInfoField: string, action: ModalReducerAction) => {
    const modal = findNamed(s, ModalName.modalForms) as ModalForms;
    const info = findNamed(modal.formsInfo, action.meta.formName) as FormInfo;
    return addOrUpdate(s, {
        ...modal,
        formsInfo: addOrUpdate(modal.formsInfo, {
            ...info,
            viewInfo: {
                ...info.viewInfo,
                [viewInfoField]: action.payload
            }
        } as FormInfo)
    } as ModalForms);
};

const updateFormInfo = (s: ModalState[], formInfo: FormInfo) => {
    const modal = findNamed(s, ModalName.modalForms) as ModalForms;
    return addOrUpdate(s, {
        ...modal,
        active: true,
        formsInfo: addOrUpdate(modal.formsInfo, formInfo)
    } as ModalForms);
};

const setActiveModal = (s: ModalState[], name: ModalName) => {
    const deactivatedModal = s.find((item) => item.active);
    const deactivatedState = addOrUpdate(s, {
        ...deactivatedModal,
        active: false
    } as ModalState);
    const activatedModal = findNamed(s, name);
    return addOrUpdate(deactivatedState, {
        ...activatedModal,
        active: true
    } as ModalState);
};

const setActiveFormInfo = (s: ModalState[], name: FormName) => {
    const modal = findNamed(s, ModalName.modalForms) as ModalForms;
    const deactivatedInfo = modal.formsInfo.find((item) => item.active);
    const deactivatedState = addOrUpdate(s, {
        ...modal,
        formsInfo: addOrUpdate(modal.formsInfo, {
            ...deactivatedInfo,
            active: false
        } as FormInfo)
    } as ModalForms);
    const activatedInfo = findNamed(modal.formsInfo, name);
    return addOrUpdate(deactivatedState, {
        ...modal,
        formsInfo: addOrUpdate(modal.formsInfo, {
            ...activatedInfo,
            active: true
        } as FormInfo)
    } as ModalForms);
};

const prepareToPay = (s: ModalState[]) => {
    const modal = findNamed(s, ModalName.modalForms) as ModalForms;
    const active = modal.formsInfo.find((item) => item.active);
    return addOrUpdate(s, {
        ...modal,
        formsInfo: addOrUpdate(modal.formsInfo, {
            ...active,
            paymentStatus: PaymentStatus.started,
            viewInfo: {
                ...active.viewInfo,
                inProcess: true
            }
        } as FormInfo)
    } as ModalForms);
};

const prepareToRetry = (s: ModalState[], toPristine: boolean) => {
    const modal = findNamed(s, ModalName.modalForms) as ModalForms;
    const started = modal.formsInfo.find((item) => item.paymentStatus === PaymentStatus.started);
    return addOrUpdate(s, {
        ...modal,
        formsInfo: addOrUpdate(modal.formsInfo, {
            ...started,
            paymentStatus: toPristine ? PaymentStatus.pristine : PaymentStatus.needRetry,
            viewInfo: {
                ...started.viewInfo,
                slideDirection: SlideDirection.left,
                inProcess: !toPristine
            },
            active: true
        } as FormInfo)
    } as ModalForms);
};

export function modalReducer(s: ModalState[] = null, action: ModalReducerAction): ModalState[] {
    switch (action.type) {
        case TypeKeys.SET_MODAL_STATE:
            return addOrUpdate(s, action.payload);
        case TypeKeys.SET_VIEW_INFO_ERROR:
            return updateViewInfo(s, 'error', action);
        case TypeKeys.SET_VIEW_INFO_IN_PROCESS:
            return updateViewInfo(s, 'inProcess', action);
        case TypeKeys.SET_FORM_INFO:
            return updateFormInfo(s, action.payload);
        case TypeKeys.SET_ACTIVE_MODAL:
            return setActiveModal(s, action.payload);
        case TypeKeys.SET_ACTIVE_FORM_INFO:
            return setActiveFormInfo(s, action.payload);
        case TypeKeys.PREPARE_TO_PAY:
            return prepareToPay(s);
        case TypeKeys.PREPARE_TO_RETRY:
            return prepareToRetry(s, action.payload);
    }
    return s;
}
