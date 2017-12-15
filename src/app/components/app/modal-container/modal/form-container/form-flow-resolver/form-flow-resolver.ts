import { clone } from 'lodash';
import { FormContainerProps } from '../form-container-props';
import { CardFormFlowItem, FormFlowStatus } from 'checkout/form-flow/flow-item';
import { check, Type } from 'checkout/event-checker';
import { FormName, getActive, next, update } from 'checkout/form-flow';
import { pay } from './card-pay';
import { prepareInteractionFlow } from './prepare-interaction-flow';
import { prepareResultationFlow } from './prepare-resultation-flow';

export type Shortened = (stepName: string, action: () => any, doneCondition: boolean, startCondition?: boolean) => void;

const resolveCardForm = (p: FormContainerProps, i: CardFormFlowItem) => {
    const checkedEvent = check(p.model.invoiceEvents);
    const processed = clone(i);
    switch (checkedEvent.type) {
        case Type.unexplained:
            pay(p, i);
            break;
        case Type.interaction:
            processed.status = FormFlowStatus.processed;
            p.setFormFlow(next(prepareInteractionFlow(update(p.formsFlow, processed), p)));
            break;
        case Type.success:
        case Type.failed:
            processed.status = FormFlowStatus.processed;
            p.setFormFlow(next(prepareResultationFlow(update(p.formsFlow, processed), p)));
    }
};

export const resolveFormFlow = (p: FormContainerProps) => {
    const activeFlow = getActive(p.formsFlow);
    if (activeFlow.status === FormFlowStatus.inProcess) {
        switch (activeFlow.formName) {
            case FormName.cardForm:
                resolveCardForm(p, activeFlow as CardFormFlowItem);
                break;
            case FormName.resultForm:
                // TODO need to implement
                break;
        }
    }
};
