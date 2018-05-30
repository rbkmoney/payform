import * as React from 'react';
import { connect } from 'react-redux';
import * as formStyles from '../../form-container.scss';
import * as styles from './interaction-terminal-form.scss';
import { State } from 'checkout/state';
import { Header } from '../../header';
import { formatAmount, FormattedAmount } from 'checkout/utils';
import { bindActionCreators, Dispatch } from 'redux';
import { setViewInfoHeight } from 'checkout/actions';
import { PaymentTerminalReceipt } from 'checkout/backend';
import { Locale } from 'checkout/locale';
import { Icon, IconType } from 'checkout/components';
import { ReceiptInfo } from './receipt-info';

const mapStateToProps = (s: State) => ({
    locale: s.config.locale,
    amount: formatAmount(s.amountInfo)
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
        this.props.setViewInfoHeight(445);
    }

    render() {
        const {locale, receipt, amount} = this.props;
        return (
            <div className={styles.container} id='terminal-interaction'>
                <Header title={this.props.locale['form.header.pay.euroset.label']}/>
                <Icon icon={IconType.eurosetLogo} className={formStyles.systemLogo}/>
                <ReceiptInfo amount={amount} receipt={receipt} locale={locale}/>
            </div>
        );
    }
}

export const InteractionTerminalForm = connect(mapStateToProps, mapDispatchToProps)(InteractionTerminalFormDef);
