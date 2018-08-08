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
                    <div ref={this.setContentElement}>
                        <CSSTransitionGroup
                            component="div"
                            className={styles.animationFormContainer}
                            transitionName={viewInfo.slideDirection}
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}
                            onTransitionEnd={this.setHeight}>
                            <div key={name}>{this.renderForm(name)}</div>
                        </CSSTransitionGroup>
                        {!!viewInfo.inProcess && <FormLoader />}
                    </div>
                </div>
            </div>
        );
    }

    private renderForm = (name: FormName): React.ReactNode => {
        switch (name) {
            case FormName.paymentMethods:
                return <PaymentMethods />;
            case FormName.cardForm:
                return <CardForm />;
            case FormName.walletForm:
                return <WalletForm />;
            case FormName.terminalForm:
                return <TerminalForm />;
            case FormName.resultForm:
                return <ResultForm />;
            case FormName.helpForm:
                return <Help />;
            case FormName.interactionForm:
                return <InteractionForm />;
            case FormName.tokenProviderForm:
                return <TokenProviderForm />;
            default:
                return null;
        }
    };

    private setContentElement = (element: HTMLDivElement) => {
        this.contentElement = element;
    };

    private setHeight = () => {
        const height = this.contentElement ? this.contentElement.clientHeight : 0;
        if (height !== this.props.viewInfo.height) {
            this.props.setViewInfoHeight(height);
        }
    };
}

export const FormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FormContainerDef);
