import * as React from 'react';
import { connect } from 'react-redux';
import * as dateFns from 'date-fns';
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
import { List, ListItem } from '../../list';

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
        const amount = `${this.props.amount.value} ${this.props.amount.symbol}`;
        const {locale} = this.props;
        return (
            <div className={styles.container}>
                <Header title={this.props.locale['form.header.pay.euroset.label']}/>

                <Icon icon={IconType.eurosetLogo} className={formStyles.systemLogo}/>

                <p className={formStyles.text}>
                    {locale['form.pay.terminals.instruction.to.pay']} <span className={formStyles.hightlight}>{amount}</span>.
                    {locale['form.pay.terminals.instruction.dueDate']}
                    <span className={formStyles.hightlight}>{dateFns.format(this.props.receipt.dueDate, 'D.MM.YYYY HH:mm')}</span>.
                </p>

                <List>
                    <ListItem number={1}>
                        {locale['form.pay.terminals.step.one.text']} {locale['brand.euroset']}.
                    </ListItem>
                    <ListItem number={2}>
                        {locale['form.pay.terminals.step.two.text']}.
                    </ListItem>
                    <ListItem number={3}>
                        {locale['form.pay.terminals.step.three.text']}: <br/>
                        <span className={formStyles.hightlight}>
                                {this.formatPaymentId(this.props.receipt.shortPaymentID)}
                        </span>.
                    </ListItem>
                    <ListItem number={4}>
                        {locale['form.pay.terminals.step.four.text']}.
                    </ListItem>
                    <ListItem number={5}>
                        {locale['form.pay.terminals.step.five.text']}.
                    </ListItem>
                </List>
            </div>
        );
    }

    private formatPaymentId(id: string): string {
        return `${id.slice(0, 2)} ${id.slice(2, 5)} ${id.slice(5, 8)} ${id.slice(8, 10)}`;
    }
}

export const InteractionTerminalForm = connect(mapStateToProps, mapDispatchToProps)(InteractionTerminalFormDef);
