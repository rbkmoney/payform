import * as React from 'react';
import { connect } from 'react-redux';
import * as styles from './pay-button.scss';
import { ModelState, State } from 'checkout/state';
import { IntegrationType } from 'checkout/config';
import { getAmount } from '../../amount-resolver';
import { formatAmount } from 'checkout/utils';
import { Button } from 'checkout/components';
import { Locale } from 'src/locale/locale';

export interface PayButtonProps {
    locale: Locale;
    label: string;
}

const PayButtonDef: React.SFC<PayButtonProps> = (props) => (
    <Button
        className={styles.pay_button}
        type='submit'
        style='primary'
        id='pay-btn'>
        {props.locale['form.button.pay.label']} {props.label}
    </Button>
);

const toLabel = (integrationType: IntegrationType, model: ModelState): string => {
    const amount = formatAmount(getAmount(integrationType, model));
    return amount ? `${amount.value} ${amount.symbol}` : null;
};

const mapStateToProps = (state: State) => ({
    locale: state.config.locale,
    label: toLabel(state.config.initConfig.integrationType, state.model)
});

export const PayButton = connect(mapStateToProps)(PayButtonDef);
