import * as React from 'react';
import { connect } from 'react-redux';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import * as cx from 'classnames';
import * as styles from './form-container.scss';
import { CardForm } from './card-form';
import { FormName, ModalForms, ModalName, State } from 'checkout/state';
import { PaymentMethods } from './payment-methods';
import { FormContainerProps } from './form-container-props';
import { FormLoader } from './form-loader';
import { ResultForm } from './result-form';
import { findNamed } from 'checkout/utils';
import { WalletForm } from './wallet-form';

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
                    <CSSTransitionGroup
                        component='div'
                        className={styles.formAnimationContainer}
                        transitionName={viewInfo.slideDirection}
                        transitionEnterTimeout={550}
                        transitionLeaveTimeout={550}>
                        {name === FormName.paymentMethods ? <PaymentMethods/> : null}
                        {name === FormName.cardForm ? <CardForm/> : null}
                        {name === FormName.walletForm ? <WalletForm/> : null}
                        {name === FormName.resultForm ? <ResultForm/> : null}
                    </CSSTransitionGroup>
                    <CSSTransitionGroup
                        component='div'
                        transitionName={{
                            appear: styles.appearLoader,
                            enter: styles.enterLoader,
                            leave: styles.leaveLoader
                        }}
                        transitionLeaveTimeout={200}
                        transitionEnterTimeout={450}
                        transitionAppearTimeout={450}
                        transitionAppear={true}
                        transitionEnter={true}
                        transitionLeave={true}>
                        {viewInfo.inProcess ? <FormLoader/> : null}
                    </CSSTransitionGroup>
                </div>
            </div>
        );
    }
}

export const FormContainer = connect(mapStateToProps)(FormContainerDef);
