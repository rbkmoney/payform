import * as React from 'react';
import { connect } from 'react-redux';

import { AmountInfoState, ConfigState, State } from 'checkout/state';
import { IntegrationType } from 'checkout/config';
import { formatAmount } from 'checkout/utils';
import { Button } from 'checkout/components';
import { Locale } from 'checkout/locale';
import styled from 'checkout/styled-components';

const PayButtonWrapper = styled(Button)`
    margin-top: 20px;
`;

export interface PayButtonProps {
    label: string;
}

const PayButtonDef: React.FC<PayButtonProps> = (props) => (
    <PayButtonWrapper type="submit" color="primary" id="pay-btn">
        {props.label}
    </PayButtonWrapper>
);

const toInvoiceLabel = (locale: Locale, amountInfo: AmountInfoState): string => {
    const amount = formatAmount(amountInfo);
    const amountLabel = amount ? ` ${amount.value} ${amount.symbol}` : '';
    return `${locale['form.button.pay.label']}${amountLabel}`;
};

const toCustomerLabel = (locale: Locale): string => locale['form.button.bind.label'];

const toLabel = (config: ConfigState, amountInfo: AmountInfoState): string => {
    const { locale, initConfig } = config;
    switch (initConfig.integrationType) {
        case IntegrationType.invoice:
        case IntegrationType.invoiceTemplate:
            return toInvoiceLabel(locale, amountInfo);
        case IntegrationType.customer:
            return toCustomerLabel(locale);
    }
};

const mapStateToProps = (s: State) => ({
    label: toLabel(s.config, s.amountInfo)
});

export const PayButton = connect(mapStateToProps)(PayButtonDef);
