import * as React from 'react';
import { InjectedFormProps } from 'redux-form';
import { connect } from 'react-redux';
import { FormName, ModalForms, ModalName, ModalState, State } from 'checkout/state';
import { InteractionType, PaymentTerminalReceipt } from 'checkout/backend';
import { findNamed } from 'checkout/utils';
import { InteractionTerminalForm } from './interaction-terminal-form';
import { InteractionFormInfo } from 'checkout/state/modal/form-info';

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
        const { interactionFormInfo: { terminalReceipt } } = this.props;
        return (
            <form>
                <div>
                    {terminalReceipt.interactionType === InteractionType.PaymentTerminalReceipt ? <InteractionTerminalForm receipt={terminalReceipt as PaymentTerminalReceipt} /> : null}
                </div>
            </form>
        );
    }
}

export const InteractionForm = connect(mapStateToProps)(InteractionFormDef as any);
