import * as React from 'react';
import { InjectedFormProps } from 'redux-form';
import { connect } from 'react-redux';
import { FormName, ModalForms, ModalName, ModalState, State } from 'checkout/state';
import { findNamed } from 'checkout/utils';
import { InteractionType } from 'checkout/backend/model/event/user-interaction/interation-type';
import { InteractionTerminalForm } from './interaction-terminal-form';
import { InteractionFormInfo } from 'checkout/state/modal/form-info/interaction-form-info';
import { PaymentTerminalReceipt } from 'checkout/backend';

const toInteractionFormInfo = (modals: ModalState[]) => {
    const info = (findNamed(modals, ModalName.modalForms) as ModalForms).formsInfo;
    return findNamed(info, FormName.interactionForm);
};

const mapStateToProps = (state: State) => ({
    interactionFormInfo: toInteractionFormInfo(state.modals)
});

interface InteractionFormProps {
    interactionFormInfo: InteractionFormInfo;
}

type Props = InteractionFormProps & InjectedFormProps;

export class InteractionFormDef extends React.Component<Props> {

    render() {
        const { interactionFormInfo: { interaction } } = this.props;
        return (
            <form>
                <div>
                    {interaction.interactionType === InteractionType.PaymentTerminalReceipt ? <InteractionTerminalForm receipt={interaction as PaymentTerminalReceipt} /> : null}
                </div>
            </form>
        );
    }
}

export const InteractionForm = connect(mapStateToProps)(InteractionFormDef as any);
