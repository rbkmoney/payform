import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Button } from 'checkout/components';
import { Locale } from 'checkout/locale';
import { forgetPaymentAttempt, prepareToRetry } from 'checkout/actions';
import { FormInfo, FormName, ModalForms, ModalName, PaymentStatus, State } from 'checkout/state';
import { findNamed } from 'checkout/utils';
import { isHelpAvailable } from './is-help-available';
import { getErrorCodeFromEvents } from '../get-error-code-from-changes';
import { Link } from 'checkout/components/ui/link';
import styled from 'checkout/styled-components';

const OthersButton = styled(Link)`
    padding-top: 12px;
`;

const ErrorBlock = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;

    & > * {
        margin-top: 10px;

        &:first-child {
            margin-top: 0;
        }
    }
`;

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

const payOtherCapability = (startedInfo: FormInfo): boolean =>
    startedInfo &&
    startedInfo.name !== FormName.terminalForm &&
    startedInfo.name !== FormName.tokenProviderForm &&
    startedInfo.name !== FormName.paymentMethods;

const retryCapability = (startedInfo: FormInfo): boolean => startedInfo && startedInfo.name !== FormName.paymentMethods;

export interface ActionBlockProps {
    locale: Locale;
    startedInfo: FormInfo;
    hasMultiMethods: boolean;
    hasErrorDescription: boolean;
    prepareToRetry: (resetFormData: boolean) => any;
    forgetPaymentAttempt: () => any;
}

class ActionBlockDef extends React.Component<ActionBlockProps> {
    retry(e: any, resetFormData: boolean = false) {
        e.preventDefault();
        this.props.prepareToRetry(resetFormData);
    }

    goToPaymentMethods = (e: any) => {
        e.preventDefault();
        this.props.forgetPaymentAttempt();
    };

    render() {
        const { locale, startedInfo, hasMultiMethods } = this.props;
        return (
            <ErrorBlock>
                {retryCapability(startedInfo) && (
                    <Button color="primary" onClick={(e) => this.retry(e)} id="retry-btn">
                        {locale['form.button.pay.again.label']}
                    </Button>
                )}
                {payOtherCapability(startedInfo) && (
                    <Button onClick={(e) => this.retry(e, true)} id="reenter-btn">
                        {toReenterButtonText(startedInfo, locale)}
                    </Button>
                )}
                {hasMultiMethods && (
                    <OthersButton onClick={this.goToPaymentMethods}>
                        {locale['form.payment.method.name.others.label']}
                    </OthersButton>
                )}
            </ErrorBlock>
        );
    }
}

const mapStateToProps = (s: State) => {
    const info = (findNamed(s.modals, ModalName.modalForms) as ModalForms).formsInfo;
    return {
        locale: s.config.locale,
        startedInfo: info.find((item) => item.paymentStatus === PaymentStatus.started),
        hasMultiMethods: !!findNamed(info, FormName.paymentMethods),
        hasErrorDescription: isHelpAvailable(
            getErrorCodeFromEvents(s.events.events, s.config.initConfig.integrationType)
        )
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    prepareToRetry: bindActionCreators(prepareToRetry, dispatch),
    forgetPaymentAttempt: bindActionCreators(forgetPaymentAttempt, dispatch)
});

export const ActionBlock = connect(mapStateToProps, mapDispatchToProps)(ActionBlockDef);
