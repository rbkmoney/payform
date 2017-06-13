import React from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import cx from 'classnames';
import Payform from './payform/Payform';
import CardUtils from '../../utils/card-utils/CardUtils';
import Header from './header/Header';

export default class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            interact: false, // TODO rename to container size
            defaultEmail: props.defaultEmail && CardUtils.validateEmail(props.defaultEmail) ? props.defaultEmail : undefined
        };
        this.handlePayformInteract = this.handlePayformInteract.bind(this);
    }

    handlePayformInteract(interact) {
        this.setState({
            interact: interact
        });
    }

    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName='checkout'
                transitionAppear={true}
                transitionAppearTimeout={400}
                transitionEnter={false}
                transitionLeave={false}
            >
                <div className={cx('checkout--container', {'_interact': this.state.interact})}>
                    <Header
                        setClose={this.props.setClose}
                        logo={this.props.logo}
                        name={this.props.name}
                        description={this.props.description}
                        defaultEmail={this.props.defaultEmail}
                    />
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
                            onPayformInteract={this.handlePayformInteract}
                        />
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}
