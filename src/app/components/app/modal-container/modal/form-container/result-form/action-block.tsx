import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as styles from './result-form.scss';
import { Button } from 'checkout/components';
import { Locale } from 'checkout/locale';
import {
    prepareToRetry,
    forgetPaymentAttempt
} from 'checkout/actions';
import {
    FormInfo,
    FormName,
    ModalForms,
    ModalName,
    PaymentStatus,
    State
} from 'checkout/state';
import { findNamed } from 'checkout/utils';

const toReenterButtonText = (startedInfo: FormInfo, locale: Locale) => {
    switch (startedInfo.name) {
        case FormName.cardForm:
            return locale['form.button.pay.other.card.label'];
        case FormName.walletForm:
            return locale['form.button.pay.other.wallet.label'];
    }
    throw new Error('Unsupported form type');
};

export interface ActionBlockProps {
    locale: Locale;
    startedInfo: FormInfo;
    hasMultiMethods: boolean;
    prepareToRetry: (resetFormData: boolean) => any;
    forgetPaymentAttempt: () => any;
}

class ActionBlockDef extends React.Component<ActionBlockProps> {

    retry(e: any, resetFormData: boolean = false) {
        e.preventDefault();
        this.props.prepareToRetry(resetFormData);
    }

    goToPaymentMethods() {
        this.props.forgetPaymentAttempt();
    }

    render() {
        const {locale, startedInfo, hasMultiMethods} = this.props;
        return (
            <div className={styles.errorBlock}>
                {startedInfo ? <Button
                    style='primary'
                    onClick={(e) => this.retry(e)}
                    id='retry-btn'>
                    {locale['form.button.pay.again.label']}
                </Button> : null}
                {startedInfo ? <Button
                    style='default'
                    className={styles.pay_with_other}
                    onClick={(e) => this.retry(e, true)}
                    id='reenter-btn'>
                    {toReenterButtonText(startedInfo, locale)}
                </Button> : null}
                {hasMultiMethods ? <div className={styles.link_container}>
                    <a className={styles.link} onClick={() => this.goToPaymentMethods()}>
                        {locale['form.payment.method.name.others.label']}
                    </a>
                    <hr/>
                </div> : false}
            </div>
        );
    }
}

const mapStateToProps = (state: State) => {
    const info = (findNamed(state.modals, ModalName.modalForms) as ModalForms).formsInfo;
    return {
        locale: state.config.locale,
        startedInfo: info.find((item) => item.paymentStatus === PaymentStatus.started),
        hasMultiMethods: !!findNamed(info, FormName.paymentMethods)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    prepareToRetry: bindActionCreators(prepareToRetry, dispatch),
    forgetPaymentAttempt: bindActionCreators(forgetPaymentAttempt, dispatch)
});

export const ActionBlock = connect(mapStateToProps, mapDispatchToProps)(ActionBlockDef);
