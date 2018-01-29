import * as React from 'react';
import * as styles from '../../form-container.scss';
import { connect } from 'react-redux';
import { State } from 'checkout/state';
import { Header } from 'checkout/components/app/modal-container/modal/form-container/header';
import { getAmount } from 'checkout/components/app/modal-container/modal/amount-resolver';
import { formatAmount } from 'checkout/utils';
import { bindActionCreators, Dispatch } from 'redux';
import { setViewInfoHeight } from 'checkout/actions';
import { PaymentTerminalReceipt } from 'checkout/backend';
import { Locale } from 'checkout/locale';
import { FormattedAmount } from 'checkout/utils/amount-formatter';
import * as dateFns from 'date-fns';
import { Icon, IconType } from 'checkout/components';

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
        this.props.setViewInfoHeight(454);
    }

    formatPaymentId(id: string): string {
        return `${id.slice(0, 2)} ${id.slice(2, 5)} ${id.slice(5, 8)} ${id.slice(8, 10)}`;
    }

    render() {
        const amount = `${this.props.amount.value} ${this.props.amount.symbol}`;
        const locale = this.props.locale;
        return (
            <div>
                <Header title={this.props.locale['form.header.pay.euroset.label']}/>

                <Icon icon={IconType.eurosetLogo} className={styles.systemLogo}/>

                <p className={styles.text}>
                    {locale['form.pay.terminals.instruction.to.pay']} <span className={styles.hightlight}>{amount}</span>.
                    {locale['form.pay.terminals.instruction.dueDate']}
                    <span className={styles.hightlight}>{dateFns.format(this.props.receipt.dueDate, 'D.MM.YYYY HH:mm')}</span>.
                </p>

                <ul className={styles.list}>
                    <li className={styles.list_item}>
                        <div className={styles.list_item_number}>
                            1
                        </div>
                        <div className={styles.list_item_text}>
                            {locale['form.pay.terminals.step.one.text']} {locale['brand.euroset']}.
                        </div>
                    </li>
                    <li className={styles.list_item}>
                        <div className={styles.list_item_number}>
                            2
                        </div>
                        <div className={styles.list_item_text}>
                            {locale['form.pay.terminals.step.two.text']}.
                        </div>
                    </li>
                    <li className={styles.list_item}>
                        <div className={styles.list_item_number}>
                            3
                        </div>
                        <div className={styles.list_item_text}>
                            {locale['form.pay.terminals.step.three.text']}: <br />
                            <span className={styles.hightlight}>{this.formatPaymentId(this.props.receipt.shortPaymentID)}</span>.
                        </div>
                    </li>
                    <li className={styles.list_item}>
                        <div className={styles.list_item_number}>
                            4
                        </div>
                        <div className={styles.list_item_text}>
                            {locale['form.pay.terminals.step.four.text']}.
                        </div>
                    </li>
                    <li className={styles.list_item}>
                        <div className={styles.list_item_number}>
                            5
                        </div>
                        <div className={styles.list_item_text}>
                            {locale['form.pay.terminals.step.five.text']}.
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

export const InteractionTerminalForm = connect(mapStateToProps, mapDispatchToProps)(InteractionTerminalFormDef);
