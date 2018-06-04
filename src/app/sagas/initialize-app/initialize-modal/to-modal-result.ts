import { toInitialModal } from './to-initial-modal';
import { ModalState, ResultFormInfo, ResultType } from 'checkout/state';

export const toModalResult = (): ModalState => toInitialModal([new ResultFormInfo(ResultType.processed)]);
