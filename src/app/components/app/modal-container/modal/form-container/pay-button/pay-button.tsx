import * as React from 'react';
import { connect } from 'react-redux';
import { ModelState, State } from 'checkout/state';
import { IntegrationType } from 'checkout/config';
import { getAmount } from '../../amount-resolver';
import { formatAmount } from 'checkout/utils';
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

const toInvoiceLabel = (locale: Locale, model: ModelState): string => {
    const amount = formatAmount(getAmount(model));
    const amountLabel = amount ? ` ${amount.value} ${amount.symbol}` : '';
    return `${locale['form.button.pay.label']}${amountLabel}`;
};

const toCustomerLabel = (locale: Locale): string => locale['form.button.bind.label'];

const toLabel = (locale: Locale, integrationType: IntegrationType, model: ModelState): string => {
    switch (integrationType) {
        case IntegrationType.invoice:
        case IntegrationType.invoiceTemplate:
            return toInvoiceLabel(locale, model);
        case IntegrationType.customer:
            return toCustomerLabel(locale);
    }
};

const mapStateToProps = (state: State) => ({
    label: toLabel(state.config.locale, state.config.initConfig.integrationType, state.model)
});

export const PayButton = connect(mapStateToProps)(PayButtonDef);
