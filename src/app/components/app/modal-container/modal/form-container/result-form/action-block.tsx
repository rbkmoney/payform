import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as styles from './result-form.scss';
import * as formStyles from '../form-container.scss';
import { Button } from 'checkout/components';
import { Locale } from 'checkout/locale';
import { forgetPaymentAttempt, goToFormInfo, prepareToRetry } from 'checkout/actions';
import { FormInfo, FormName, ModalForms, ModalName, ModelState, PaymentStatus, State, HelpFormInfo } from 'checkout/state';
import { findNamed } from 'checkout/utils';
import { isHelpAvailable } from './is-help-available';
import { getErrorFromEvents } from '../get-error-from-changes';
import { IntegrationType } from 'checkout/config';

const toReenterButtonText = (startedInfo: FormInfo, locale: Locale): string => {
    switch (startedInfo.name) {
        case FormName.cardForm:
            return locale['form.button.use.other.card.label'];
        case FormName.walletForm:
            return locale['form.button.use.other.wallet.label'];
        case FormName.terminalForm:
            return locale['form.button.use.other.terminal.label'];
    }
    throw new Error('Unsupported form type');
};

const payOtherCapability = (startedInfo: FormInfo): boolean => startedInfo &&
    startedInfo.name !== FormName.terminalForm &&
    startedInfo.name !== FormName.tokenProviderForm &&
    startedInfo.name !== FormName.paymentMethods;

const retryCapability = (startedInfo: FormInfo): boolean => startedInfo &&
    startedInfo.name !== FormName.paymentMethods;

export interface ActionBlockProps {
    locale: Locale;
    startedInfo: FormInfo;
    hasMultiMethods: boolean;
    model: ModelState;
    integrationType: IntegrationType;
    prepareToRetry: (resetFormData: boolean) => any;
    forgetPaymentAttempt: () => any;
    goToFormInfo: (formInfo: FormInfo) => any;
}

class ActionBlockDef extends React.Component<ActionBlockProps> {

    retry(e: any, resetFormData: boolean = false) {
        e.preventDefault();
        this.props.prepareToRetry(resetFormData);
    }

    goToPaymentMethods() {
        this.props.forgetPaymentAttempt();
    }

    goToHelp() {
        this.props.goToFormInfo(new HelpFormInfo(FormName.resultForm));
    }

    render() {
        const { locale, startedInfo, hasMultiMethods } = this.props;
        return (
            <div className={styles.errorBlock}>
                {retryCapability(startedInfo) ? <Button
                    style='primary'
                    onClick={(e) => this.retry(e)}
                    id='retry-btn'>
                    {locale['form.button.pay.again.label']}
                </Button> : null}
                {payOtherCapability(startedInfo) ? <Button
                    style='default'
                    className={styles.pay_with_other}
                    onClick={(e) => this.retry(e, true)}
                    id='reenter-btn'>
                    {toReenterButtonText(startedInfo, locale)}
                </Button> : null}
                <div className={formStyles.links}>
                    {hasMultiMethods ? <div className={formStyles.link_container}>
                        <a className={formStyles.link} onClick={() => this.goToPaymentMethods()}>
                            {locale['form.payment.method.name.others.label']}
                        </a>
                        <hr/>
                    </div> : false}
                    {this.makeHelpBlock()}
                </div>
            </div>
        );
    }

    private makeHelpBlock(): JSX.Element | boolean {
        const { model, locale } = this.props;
        const errorCode = model.customerEvents ? getErrorFromEvents(model.customerEvents) : getErrorFromEvents(model.invoiceEvents);
        if (errorCode && isHelpAvailable(errorCode)) {
            return (
                <div className={formStyles.link_container}>
                    <p className={styles.or_paragraph}>
                        или
                    </p>
                    <a className={formStyles.link} onClick={() => this.goToHelp()}>
                        {locale['form.final.need.help']}
                    </a>
                    <hr/>
                </div>
            );
        }
        return false;
    }
}

const mapStateToProps = (state: State) => {
    const info = (findNamed(state.modals, ModalName.modalForms) as ModalForms).formsInfo;
    return {
        locale: state.config.locale,
        startedInfo: info.find((item) => item.paymentStatus === PaymentStatus.started),
        hasMultiMethods: !!findNamed(info, FormName.paymentMethods),
        model: state.model,
        integrationType: state.config.initConfig.integrationType
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    prepareToRetry: bindActionCreators(prepareToRetry, dispatch),
    forgetPaymentAttempt: bindActionCreators(forgetPaymentAttempt, dispatch),
    goToFormInfo: bindActionCreators(goToFormInfo, dispatch)
});

export const ActionBlock = connect(mapStateToProps, mapDispatchToProps)(ActionBlockDef);
