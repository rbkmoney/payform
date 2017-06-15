import React from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import cx from 'classnames';
import Payform from './payform/Payform';
import CardUtils from '../../utils/card-utils/CardUtils';
import Header from './header/Header';
import SupportButton from './SupportButton';

export default class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            largeContainer: false,
            defaultEmail: CardUtils.validateEmail(props.defaultEmail) && props.defaultEmail
        };
        this.handlePayformInteract = this.handlePayformInteract.bind(this);
    }

    handlePayformInteract(interact) {
        this.setState({
            largeContainer: interact
        });
    }

    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName='checkout'
                transitionAppear={true}
                transitionAppearTimeout={400}
                transitionEnter={false}
                transitionLeave={false}>
                <div className={cx('checkout--container', {'_large': this.state.largeContainer})}>
                    <Header
                        setClose={this.props.setClose}
                        logo={this.props.logo}
                        name={this.props.name}
                        description={this.props.description}
                        defaultEmail={this.state.defaultEmail}/>
                    <div className="checkout--body">
                        <Payform
                            capiEndpoint={this.props.capiEndpoint}
                            invoiceAccessToken={this.props.invoiceAccessToken}
                            invoiceID={this.props.invoiceID}
                            defaultEmail={this.state.defaultEmail}
                            amount={this.props.amount}
                            currency={this.props.currency}
                            payButtonLabel={this.props.payButtonLabel}
                            payformHost={this.props.payformHost}
                            onPaymentSuccess={this.props.setCheckoutDone}
                            onPayformInteract={this.handlePayformInteract}/>
                    </div>
                </div>
                <SupportButton invoiceID={this.props.invoiceID} />
            </ReactCSSTransitionGroup>
        );
    }
}
