import * as React from 'react';
import { connect } from 'react-redux';

import * as formStyles from '../../form-container.scss';
import { State } from 'checkout/state';
import { Header } from '../../header';
import { formatInvoiceAmount, FormattedAmount } from 'checkout/utils';
import { PaymentTerminalReceipt } from 'checkout/backend';
import { Locale } from 'checkout/locale';
import { ReceiptInfo } from './receipt-info';
import { EurosetLogo } from 'checkout/components';
import styled from 'checkout/styled-components';

const Container = styled.div`
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-content: center;
    width: 100%;
`;

const mapStateToProps = (s: State) => ({
    locale: s.config.locale,
    amount: formatInvoiceAmount(s.model.invoice)
});

export interface InteractionTerminalFormProps {
    receipt: PaymentTerminalReceipt;
    locale: Locale;
    amount: FormattedAmount;
}

class InteractionTerminalFormDef extends React.Component<InteractionTerminalFormProps> {
    render() {
        const { locale, receipt, amount } = this.props;
        return (
            <Container id="terminal-interaction">
                <Header title={this.props.locale['form.header.pay.euroset.label']} />
                <EurosetLogo className={formStyles.systemLogo} />
                <ReceiptInfo amount={amount} receipt={receipt} locale={locale} />
            </Container>
        );
    }
}

export const InteractionTerminalForm = connect(mapStateToProps)(InteractionTerminalFormDef);
