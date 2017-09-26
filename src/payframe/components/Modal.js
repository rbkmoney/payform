import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import cx from 'classnames';
import Header from './header/Header';
import SupportButton from './SupportButton';
import CardPayment from './cardPayment/CardPayment';
import TerminalPayment from './terminalPayment/TerminalPayment';
import PaymentMethodChanger from './PaymentMethodChanger';

class Modal extends React.Component {

    render() {
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
                    <PaymentMethodChanger />
                    <div className="checkout--body">
                        <CardPayment/>
                        <TerminalPayment/>
                    </div>
                </div>
                <SupportButton/>
            </ReactCSSTransitionGroup>
        );
    }
}

function mapState(state) {
    return {
        viewData: state.viewData,
        initParams: state.initParams,
        paymentCapabilities: state.paymentCapabilities
    };
}

export default connect(mapState)(Modal);
