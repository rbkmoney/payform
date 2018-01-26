import * as React from 'react';
import { connect } from 'react-redux';
import { State } from 'checkout/state';
import { Header } from 'checkout/components/app/modal-container/modal/form-container/header';
import { getAmount } from 'checkout/components/app/modal-container/modal/amount-resolver';
import { formatAmount } from 'checkout/utils';

const mapStateToProps = (state: State) => ({
    locale: state.config.locale,
    amount: getAmount(state.config.initConfig.integrationType, state.model)
});

export const InteractionTerminalFormDef: React.SFC<any> = (props) => (
    <div>
        <Header title={props.locale['form.header.pay.euroset.label']} />

        Комиссия 3%. К оплате {formatAmount(props.amount)}. Оплата будет произведена в течение 3 дней.
    </div>
);

export const InteractionTerminalForm = connect(mapStateToProps)(InteractionTerminalFormDef as any);
