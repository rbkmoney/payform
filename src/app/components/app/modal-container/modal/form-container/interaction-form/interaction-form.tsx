import * as React from 'react';
import { InjectedFormProps } from 'redux-form';
import { connect } from 'react-redux';
import { FormName, ModalForms, ModalName, ModalState, State } from 'checkout/state';
import { bindActionCreators, Dispatch } from 'redux';
import { setViewInfoHeight } from 'checkout/actions';
import { findNamed } from 'checkout/utils';
import { InteractionType } from 'checkout/backend/model/event/user-interaction/interation-type';
import { InteractionTerminalForm } from './interaction-terminal-form';

const toInteractionFormInfo = (modals: ModalState[]) => {
    const info = (findNamed(modals, ModalName.modalForms) as ModalForms).formsInfo;
    return findNamed(info, FormName.interactionForm);
};

const mapStateToProps = (state: State) => ({
    interactionFormInfo: toInteractionFormInfo(state.modals)
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch)
});

type Props = any & InjectedFormProps;

export class InteractionFormDef extends React.Component<Props> {

    componentDidMount() {
        this.props.setViewInfoHeight(288);
    }

    render() {
        console.log(this.props.interactionFormInfo);
        const { interactionFormInfo: { interaction } } = this.props;
        return (
            <form>
                <div>
                    {interaction.interactionType === InteractionType.PaymentTerminalReceipt ? <InteractionTerminalForm /> : null}
                </div>
            </form>
        );
    }
}

export const InteractionForm = connect(mapStateToProps, mapDispatchToProps)(InteractionFormDef as any);
