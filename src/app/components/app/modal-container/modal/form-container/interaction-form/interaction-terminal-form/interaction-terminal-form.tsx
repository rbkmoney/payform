import * as React from 'react';
import { connect } from 'react-redux';
import * as formStyles from '../../form-container.scss';
import * as styles from './interaction-terminal-form.scss';
import { State } from 'checkout/state';
import { Header } from '../../header';
import { getAmount } from '../../../amount-resolver';
import { formatAmount } from 'checkout/utils';
import { bindActionCreators, Dispatch } from 'redux';
import { setViewInfoHeight } from 'checkout/actions';
import { PaymentTerminalReceipt } from 'checkout/backend';
import { Locale } from 'checkout/locale';
import { FormattedAmount } from 'checkout/utils/amount-formatter';
import { Icon, IconType } from 'checkout/components';
import { ReceiptInfo } from './receipt-info';

const mapStateToProps = (state: State) => ({
    locale: state.config.locale,
    amount: formatAmount(getAmount(state.config.initConfig.integrationType, state.model))
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch)
});

export interface InteractionTerminalFormProps {
    receipt: PaymentTerminalReceipt;
    locale: Locale;
    amount: FormattedAmount;
    setViewInfoHeight: (height: number) => any;
}

class InteractionTerminalFormDef extends React.Component<InteractionTerminalFormProps> {
    componentDidMount() {
        this.props.setViewInfoHeight(405);
    }

    render() {
        const {locale, receipt, amount} = this.props;
        return (
            <div className={styles.container}>
                <Header title={this.props.locale['form.header.pay.euroset.label']}/>
                <Icon icon={IconType.eurosetLogo} className={formStyles.systemLogo}/>
                <ReceiptInfo amount={amount} receipt={receipt} locale={locale}/>
            </div>
        );
    }
}

export const InteractionTerminalForm = connect(mapStateToProps, mapDispatchToProps)(InteractionTerminalFormDef);
