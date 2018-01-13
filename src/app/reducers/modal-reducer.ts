import { ModalForms, ModalState } from 'checkout/state';
import { TypeKeys, SetModalState } from 'checkout/actions';
import { SetViewInfoError, SetViewInfoInProcess } from 'checkout/actions/modal-actions/view-info-actions';

type ModalReducerAction = SetModalState | SetViewInfoError | SetViewInfoInProcess;

export function modalReducer(s: ModalState = null, action: ModalReducerAction): ModalState {
    const mf = s as ModalForms;
    switch (action.type) {
        case TypeKeys.SET_MODAL_STATE:
            return action.payload;
        case TypeKeys.SET_VIEW_INFO_ERROR:
            return ({
                ...mf,
                formInfo: {
                    ...mf.formInfo,
                    viewInfo: {
                        ...mf.formInfo.viewInfo,
                        error: action.payload
                    }

                }
            } as ModalForms);
        case TypeKeys.SET_VIEW_INFO_IN_PROCESS:
            return ({
                ...mf,
                formInfo: {
                    ...mf.formInfo,
                    viewInfo: {
                        ...mf.formInfo.viewInfo,
                        inProcess: action.payload
                    }

                }
            } as ModalForms);
    }
    return s;
}
