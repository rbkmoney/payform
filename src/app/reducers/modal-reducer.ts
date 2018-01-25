import { cloneDeep } from 'lodash';
import { findNamed } from 'checkout/utils';
import {
    FormInfo,
    ModalForms,
    ModalInteraction,
    ModalName,
    ModalState,
    Named, PaymentMethodsFormInfo,
    PaymentStatus,
    SlideDirection
} from 'checkout/state';
import {
    TypeKeys,
    SetModalState,
    GoToFormInfo,
    SetViewInfoError,
    PrepareToPay,
    PrepareToRetry,
    SetModalInteractionPolling,
    Direction,
    SetViewInfoHeight,
    ForgetPaymentAttempt
} from 'checkout/actions';

type ModalReducerAction =
    SetModalState |
    SetViewInfoError |
    GoToFormInfo |
    PrepareToPay |
    PrepareToRetry |
    SetModalInteractionPolling |
    SetViewInfoHeight |
    ForgetPaymentAttempt;

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

const updateViewInfo = (s: ModalState[], field: string, value: any): ModalState[] => {
    const modal = findNamed(s, ModalName.modalForms) as ModalForms;
    return addOrUpdate(s, {
        ...modal,
        viewInfo: {
            ...modal.viewInfo,
            [field]: value
        }
    } as ModalForms);
};

const toSlideDirection = (direction: Direction): SlideDirection => {
    switch (direction) {
        case Direction.forward:
            return SlideDirection.right;
        case Direction.back:
            return SlideDirection.left;
    }
};

const updateFound = (s: ModalState[], found: ModalForms, formInfo: FormInfo, direction: Direction): ModalState[] => {
    return addOrUpdate(s, {
        ...found,
        active: true,
        viewInfo: {
            ...found.viewInfo,
            inProcess: false,
            slideDirection: toSlideDirection(direction)
        },
        formsInfo: addOrUpdate(found.formsInfo, {
            ...formInfo,
            active: true
        } as FormInfo)
    } as ModalForms);
};

const goToFormInfo = (s: ModalState[], formInfo: FormInfo, direction: Direction): ModalState[] => {
    const modalForms = findNamed(s, ModalName.modalForms) as ModalForms;
    const initial = [new ModalForms([formInfo], true)];
    return modalForms ? updateFound(s, modalForms, formInfo, direction) : initial;
};

const setActiveToPristine = (s: ModalState[]): ModalState[] => {
    const modal = findNamed(s, ModalName.modalForms) as ModalForms;
    const started = modal.formsInfo.find((item) => item.paymentStatus === PaymentStatus.started);
    return started ? addOrUpdate(s, {
        ...modal,
        formsInfo: addOrUpdate(modal.formsInfo, {
            ...started,
            paymentStatus: PaymentStatus.pristine
        } as FormInfo)
    } as ModalForms) : s;
};

const prepareToPay = (s: ModalState[]): ModalState[] => {
    const modal = findNamed(s, ModalName.modalForms) as ModalForms;
    const active = modal.formsInfo.find((item) => item.active);
    return addOrUpdate(setActiveToPristine(s), {
        ...modal,
        viewInfo: {
            ...modal.viewInfo,
            inProcess: true
        },
        formsInfo: addOrUpdate(modal.formsInfo, {
            ...active,
            paymentStatus: PaymentStatus.started
        } as FormInfo)
    } as ModalForms);
};

const findStarted = (info: FormInfo[]) => info.find((item) => item.paymentStatus === PaymentStatus.started);

const prepareToRetry = (s: ModalState[], toPristine: boolean): ModalState[] => {
    const modal = findNamed(s, ModalName.modalForms) as ModalForms;
    const started = findStarted(modal.formsInfo);
    return addOrUpdate(s, {
        ...modal,
        viewInfo: {
            ...modal.viewInfo,
            slideDirection: SlideDirection.left,
            inProcess: !toPristine
        },
        formsInfo: addOrUpdate(modal.formsInfo, {
            ...started,
            paymentStatus: toPristine ? PaymentStatus.pristine : PaymentStatus.needRetry,
            active: true
        } as FormInfo)
    } as ModalForms);
};

const forgetPaymentAttempt = (s: ModalState[]) => {
    const modal = findNamed(s, ModalName.modalForms) as ModalForms;
    const pristine = addOrUpdate(modal.formsInfo, {
        ...findStarted(modal.formsInfo),
        paymentStatus: PaymentStatus.pristine,
        active: false
    } as FormInfo);
    return addOrUpdate(s, {
        ...modal,
        viewInfo: {
            ...modal.viewInfo,
            slideDirection: SlideDirection.left,
            inProcess: false
        },
        formsInfo: addOrUpdate(pristine, new PaymentMethodsFormInfo())
    } as ModalForms);
};

const setPollingEvents = (s: ModalState[], status: boolean): ModalState[] => {
    const modal = findNamed(s, ModalName.modalInteraction) as ModalInteraction;
    return modal ? addOrUpdate(s, {
        ...modal,
        pollingEvents: status
    } as ModalInteraction) : s;
};

export function modalReducer(s: ModalState[] = null, action: ModalReducerAction): ModalState[] {
    switch (action.type) {
        case TypeKeys.SET_MODAL_STATE:
            return addOrUpdate(s, action.payload);
        case TypeKeys.SET_VIEW_INFO_ERROR:
            return updateViewInfo(s, 'error', action.payload);
        case TypeKeys.SET_VIEW_INFO_HEIGHT:
            return updateViewInfo(s, 'height', action.payload);
        case TypeKeys.GO_TO_FORM_INFO:
            const {formInfo, direction} = action.payload;
            return goToFormInfo(s, formInfo, direction);
        case TypeKeys.PREPARE_TO_PAY:
            return prepareToPay(s);
        case TypeKeys.PREPARE_TO_RETRY:
            return prepareToRetry(s, action.payload);
        case TypeKeys.FORGET_PAYMENT_ATTEMPT:
            return forgetPaymentAttempt(s);
        case TypeKeys.SET_MODAL_INTERACTION_POLLING:
            return setPollingEvents(s, action.payload);
    }
    return s;
}
