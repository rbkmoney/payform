import * as React from 'react';
import { InjectedFormProps } from 'redux-form';
import { connect } from 'react-redux';

import { FormName, ModalForms, ModalName, ModalState, State } from 'checkout/state';
import { InteractionType, PaymentTerminalReceipt, UserInteraction, QrCodeDisplayRequest } from 'checkout/backend';
import { findNamed } from 'checkout/utils';
import { InteractionTerminalForm } from './interaction-terminal-form';
import { InteractionFormInfo } from 'checkout/state/modal/form-info';
import { QPSInteractionForm } from '../qps-forms';

const toInteractionFormReceipt = (modals: ModalState[]): UserInteraction => {
    const info = (findNamed(modals, ModalName.modalForms) as ModalForms).formsInfo;
    return (findNamed(info, FormName.interactionForm) as InteractionFormInfo).interaction;
};

const mapStateToProps = (state: State): Partial<InteractionFormProps> => ({
    interaction: toInteractionFormReceipt(state.modals)
});

interface InteractionFormProps {
    interaction: UserInteraction;
}

type Props = InteractionFormProps & InjectedFormProps;

function isInteraction<T extends UserInteraction>(
    interaction: UserInteraction,
    type: InteractionType
): interaction is T {
    return interaction.interactionType === InteractionType[type];
}

export class InteractionFormDef extends React.Component<Props> {
    render() {
        const { interaction } = this.props;
        return (
            <form>
                <div>
                    {isInteraction<PaymentTerminalReceipt>(interaction, InteractionType.PaymentTerminalReceipt) && (
                        <InteractionTerminalForm receipt={interaction} />
                    )}
                    {isInteraction<QrCodeDisplayRequest>(interaction, InteractionType.QrCodeDisplayRequest) && (
                        <QPSInteractionForm interaction={interaction} />
                    )}
                </div>
            </form>
        );
    }
}

export const InteractionForm = connect(mapStateToProps)(InteractionFormDef as any);
