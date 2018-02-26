import * as React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import * as cx from 'classnames';
import * as styles from './form-container.scss';
import { CardForm } from './card-form';
import { FormName, ModalForms, ModalName, State } from 'checkout/state';
import { PaymentMethods } from './payment-methods';
import { FormContainerProps } from './form-container-props';
import { FormLoader } from './form-loader';
import { ResultForm } from './result-form';
import { WalletForm } from './wallet-form';
import { TerminalForm } from './terminal-form';
import { InteractionForm } from './interaction-form';
import { findNamed } from 'checkout/utils';

const mapStateToProps = (state: State) => {
    const modalForms = (findNamed(state.modals, ModalName.modalForms) as ModalForms);
    return {
        activeFormInfo: modalForms.formsInfo.find((item) => item.active),
        viewInfo: modalForms.viewInfo
    };
};

class FormContainerDef extends React.Component<FormContainerProps> {

    render() {
        const {activeFormInfo: {name}, viewInfo} = this.props;
        return (
            <div className={styles.container}>
                <div
                    className={cx(styles.form, {[styles._error]: viewInfo.error})}
                    style={{height: viewInfo.height}}>
                    <CSSTransition
                        component='div'
                        className={styles.animationFormContainer}
                        classNames={viewInfo.slideDirection}
                        timeout={{enter: 550, exit: 550}}>
                        {name === FormName.paymentMethods ? <PaymentMethods/> : null}
                        {name === FormName.cardForm ? <CardForm/> : null}
                        {name === FormName.walletForm ? <WalletForm/> : null}
                        {name === FormName.terminalForm ? <TerminalForm/> : null}
                        {name === FormName.resultForm ? <ResultForm/> : null}
                        {name === FormName.interactionForm ? <InteractionForm/> : null}
                    </CSSTransition>
                    {viewInfo.inProcess ? <FormLoader/> : null}
                </div>
            </div>
        );
    }
}

export const FormContainer = connect(mapStateToProps)(FormContainerDef);
