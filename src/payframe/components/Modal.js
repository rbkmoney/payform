import React from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
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
            defaultEmail: CardUtils.validateEmail(props.data.defaultEmail) && props.data.defaultEmail
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
                        logo={this.props.data.logo}
                        name={this.props.data.name}
                        description={this.props.data.description}
                        defaultEmail={this.state.defaultEmail}/>
                    <div className="checkout--body">
                        <Payform
                            capiEndpoint={this.props.capiEndpoint}
                            invoiceAccessToken={this.props.data.invoiceAccessToken}
                            invoiceID={this.props.data.invoiceID}
                            invoiceTemplateID={this.props.data.invoiceTemplateID}
                            invoiceTemplateAccessToken={this.props.data.invoiceTemplateAccessToken}
                            defaultEmail={this.state.defaultEmail}
                            invoice={this.props.invoice}
                            payButtonLabel={this.props.data.payButtonLabel}
                            payformHost={this.props.payformHost}
                            onPaymentSuccess={this.props.setCheckoutDone}
                            onPayformInteract={this.handlePayformInteract}
                            locale={this.props.locale}
                            integrationType={this.props.integrationType}
                        />
                    </div>
                </div>
                <SupportButton invoiceID={this.props.data.invoiceID} locale={this.props.locale}/>
            </ReactCSSTransitionGroup>
        );
    }
}
