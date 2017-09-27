import React from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';

import formatCurrency from '../../../utils/formatCurrency';

class TerminalInteraction extends React.Component {

    formatPaymentID(paymentID) {
        return paymentID.split('').map((character, index) => {
            if (index % 3 === 1) {
                return ` ${character}`;
            } else {
                return character;
            }
        }).join('');
    }

    render() {
        return (
            <div className="print-receipt__container">
                <div className="print-receipt__panel pseudo">
                    <div className="panel-body">
                        <dl>
                            <dt>
                                Оплату необходимо произвесте в салонах связи "Евросеть"
                            </dt>
                        </dl>
                        <dl>
                            <dt>Номер счета для оплаты:</dt>
                            <dd>{this.formatPaymentID(this.props.interactionData.shortPaymentID)}</dd>
                        </dl>
                        <dl>
                            <dt>Сумма к оплате:</dt>
                            <dd>{formatCurrency(this.props.integration.invoice.amount / 100, this.props.integration.invoice.currency)}</dd>
                        </dl>
                        <dl>
                            <dt>Действует до:</dt>
                            <dd>{format(this.props.interactionData.dueDate, 'D.MM.YYYY HH:mm', {locale: ruLocale})}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        integration: state.integration
    };
}

export default connect(mapStateToProps)(TerminalInteraction);
