import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
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
import { WalletForm } from './wallet-form';
import { TerminalForm } from './terminal-form';
import { InteractionForm } from './interaction-form';
import { TokenProviderForm } from './token-provider-form';
import { findNamed } from 'checkout/utils';
import { Help } from './help';
import { setViewInfoHeight } from 'checkout/actions';

const mapStateToProps = (state: State) => {
    const modalForms = findNamed(state.modals, ModalName.modalForms) as ModalForms;
    return {
        activeFormInfo: modalForms.formsInfo.find((item) => item.active),
        viewInfo: modalForms.viewInfo
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch)
});

class FormContainerDef extends React.Component<FormContainerProps> {
    private contentElement: HTMLDivElement;

    componentDidMount() {
        this.setHeight();
    }

    componentDidUpdate(prevProps: FormContainerProps) {
        if (prevProps.activeFormInfo.name !== this.props.activeFormInfo.name) {
            this.setHeight();
        }
    }

    render() {
        const {
            activeFormInfo: { name },
            viewInfo
        } = this.props;
        return (
            <div className={styles.container}>
                <div
                    className={cx(styles.form, { [styles._error]: viewInfo.error })}
                    style={{ height: viewInfo.height || 'auto' }}>
                    <CSSTransitionGroup
                        component="div"
                        className={styles.animationFormContainer}
                        transitionName={viewInfo.slideDirection}
                        transitionEnterTimeout={550}
                        transitionLeaveTimeout={550}>
                        <div ref={this.setContentElement} key={name}>
                            {name === FormName.paymentMethods ? <PaymentMethods /> : null}
                            {name === FormName.cardForm ? <CardForm /> : null}
                            {name === FormName.walletForm ? <WalletForm /> : null}
                            {name === FormName.terminalForm ? <TerminalForm /> : null}
                            {name === FormName.resultForm ? <ResultForm /> : null}
                            {name === FormName.helpForm ? <Help /> : null}
                            {name === FormName.interactionForm ? <InteractionForm /> : null}
                            {name === FormName.tokenProviderForm ? <TokenProviderForm /> : null}
                        </div>
                    </CSSTransitionGroup>
                    {viewInfo.inProcess ? <FormLoader /> : null}
                </div>
            </div>
        );
    }

    private setContentElement = (element: HTMLDivElement) => {
        this.contentElement = element;
    };

    private setHeight = () => {
        this.props.setViewInfoHeight(this.contentElement ? this.contentElement.clientHeight : 0);
    };
}

export const FormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FormContainerDef);
