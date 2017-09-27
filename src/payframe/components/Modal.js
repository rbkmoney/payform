import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as viewDataActions from '../actions/viewDataActions';
import * as paymentActions from '../actions/paymentActions';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import cx from 'classnames';
import Header from './header/Header';
import SupportButton from './SupportButton';
import CardPayment from './cardPayment/CardPayment';
import TerminalPayment from './terminalPayment/TerminalPayment';
import PaymentMethodChanger from './PaymentMethodChanger';
import handleInteraction from './handleInteraction';
import handleInvoiceTemplate from './handleInvoiceTemplate';

class Modal extends React.Component {
    componentDidMount() {
        switch (this.props.integration.type) {
            case 'default':
                handleInteraction(this.props);
                break;
            case 'template':
                handleInvoiceTemplate(this.props);
                break;
        }
    }

    render() {
        const viewData = this.props.viewData;

        return (
            <ReactCSSTransitionGroup
                transitionName="checkout"
                transitionAppear={true}
                transitionAppearTimeout={400}
                transitionEnter={false}
                transitionLeave={false}>
                <div className={cx('checkout--container', {
                    '_large': this.props.viewData.containerSize === 'large'
                })}>
                    <Header/>
                    {this.props.payment.status !== 'interacted' ? <PaymentMethodChanger /> : false}
                    <div className="checkout--body">
                        {viewData.paymentMethod === 'BankCard' ? <CardPayment/> : false}
                        {viewData.paymentMethod === 'PaymentTerminal' ? <TerminalPayment/> : false}
                    </div>
                </div>
                <SupportButton/>
            </ReactCSSTransitionGroup>
        );
    }
}

function mapState(state) {
    return {
        appConfig: state.appConfig,
        viewData: state.viewData,
        initParams: state.initParams,
        paymentCapabilities: state.paymentCapabilities,
        integration: state.integration,
        payment: state.payment
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            viewDataActions: bindActionCreators(viewDataActions, dispatch),
            //invoiceActions: bindActionCreators(invoiceActions, dispatch),
            paymentActions: bindActionCreators(paymentActions, dispatch),
            //errorActions: bindActionCreators(errorActions, dispatch)
        }
    };
}

export default connect(mapState, mapDispatchToProps)(Modal);
