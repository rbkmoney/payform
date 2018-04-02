import * as React from 'react';
import { connect } from 'react-redux';
import { ModelState, State } from 'checkout/state';
import { InitConfig, IntegrationType } from 'checkout/config';
import { formatAmount, resolveAmount } from 'checkout/utils';
import { Button } from 'checkout/components';
import { Locale } from 'checkout/locale';

export interface PayButtonProps {
    label: string;
}

const PayButtonDef: React.SFC<PayButtonProps> = (props) => (
    <Button
        type='submit'
        style='primary'
        id='pay-btn'>
        {props.label}
    </Button>
);

const toInvoiceLabel = (locale: Locale, initConfig: InitConfig, model: ModelState): string => {
    const amount = formatAmount(resolveAmount(model, initConfig.amount));
    const amountLabel = amount ? ` ${amount.value} ${amount.symbol}` : '';
    return `${locale['form.button.pay.label']}${amountLabel}`;
};

const toCustomerLabel = (locale: Locale): string => locale['form.button.bind.label'];

const toLabel = (locale: Locale, initConfig: InitConfig, model: ModelState): string => {
    switch (initConfig.integrationType) {
        case IntegrationType.invoice:
        case IntegrationType.invoiceTemplate:
            return toInvoiceLabel(locale, initConfig, model);
        case IntegrationType.customer:
            return toCustomerLabel(locale);
    }
};

const mapStateToProps = (state: State) => ({
    label: toLabel(state.config.locale, state.config.initConfig, state.model)
});

export const PayButton = connect(mapStateToProps)(PayButtonDef);
