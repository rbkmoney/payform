import React from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import cx from 'classnames';
import Payform from './payform/Payform';
import TokenizerScript from '../elements/TokenizerScript';
import Processing from '../backend-communication/Processing';
import settings from '../../settings';
import Form3ds from '../interaction/Form3ds';
import EventPoller from '../backend-communication/EventPoller';
import isMobile from 'ismobilejs';
import CardUtils from '../../utils/card-utils/CardUtils';
import Header from './header/Header';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            payform: true,
            interact: false,
            spinner: false,
            checkmark: false,
            back: false,
            defaultEmail: props.defaultEmail && CardUtils.validateEmail(props.defaultEmail) ? props.defaultEmail : undefined,
            payformState: {
                cardHolder: {value: ''},
                cardNumber: {value: ''},
                cardExpire: {value: ''},
                cardCvv: {value: ''},
                email: {value: ''}
            }
        };

        window.addEventListener('message', (e) => {
            if (e.data === 'finish-interaction') {
                this.setState({
                    payform: true,
                    interact: false,
                    spinner: true,
                    checkmark: false
                });
                EventPoller.pollEvents(this.props.capiEndpoint, this.props.invoiceID, this.props.invoiceAccessToken)
                    .then((event) => this.handleEvent(event))
                    .catch(error => this.handleError(error));
            }
        });

        this.handlePay = this.handlePay.bind(this);
        this.setShowErrorPanel = this.setShowErrorPanel.bind(this);
    }

    componentDidMount() {
        // TODO move up
        const tokenizerScript = new TokenizerScript(this.props.tokenizerEndpoint);
        tokenizerScript.render()
            .catch(() => {
                this.isPayButtonDisabled = true;
                this.errorMessage = 'Tokenizer is not available';
                this.setShowErrorPanel(true);
                this.forceUpdate();
            });
    }

    setShowErrorPanel(state) {
        this.isShowErrorPanel = state;
    }

    handleEvent(event) {
        if (event.type === 'success') {
            this.handleSuccess();
        } else if (event.type === 'interact') {
            this.handleInteract(event);
        } else {
            console.error(event);
            throw new Error('Unsupported payment result error');
        }
    }

    handleError(error) {
        this.setState({
            payform: true,
            interact: false,
            spinner: false,
            checkmark: false
        });
        this.errorMessage = error.message;
        this.setShowErrorPanel(true);
        this.forceUpdate();
    }

    handleSuccess() {
        this.setState({
            payform: true,
            interact: false,
            spinner: false,
            checkmark: true
        });
        this.props.setCheckoutDone();
        if (isMobile.any && history.length > 1) {
            setTimeout(() => {
                this.setState({
                    payform: true,
                    interact: false,
                    spinner: false,
                    checkmark: false,
                    back: true
                })
            }, settings.closeFormTimeout + 100)
        }
    }

    handleInteract(event) {
        this.setState({
            payform: false,
            interact: true,
            spinner: false,
            checkmark: false
        });
        const form3ds = new Form3ds(event.data, this.props.payformHost, this.refs['3ds']);
        form3ds.submit(settings.submitFormTimeout); // TODO fix it
    }

    handlePay() {
        const formData = this.state.payformState;
        this.setShowErrorPanel(false);
        this.setState({
            payform: true,
            interact: false,
            spinner: true,
            checkmark: false
        });
        Processing.process({
            invoiceAccessToken: this.props.invoiceAccessToken,
            invoiceID: this.props.invoiceID,
            capiEndpoint: this.props.capiEndpoint,
            cardHolder: formData.cardHolder.value,
            cardNumber: formData.cardNumber.value,
            cardExpire: formData.cardExpire.value,
            email: formData.email.value,
            cardCvv: formData.cardCvv.value
        }).then(event => this.handleEvent(event))
            .catch(error => this.handleError(error));
    }

    renderPayform() {
        return (
            <Payform handlePay={this.handlePay}
                     defaultEmail={this.state.defaultEmail}
                     errorMessage={this.errorMessage}
                     isPayButtonDisabled={this.isPayButtonDisabled}
                     isShowErrorPanel={this.isShowErrorPanel}
                     amount={this.props.amount}
                     currency={this.props.currency}
                     payformState={this.state.payformState}
                     spinner={this.state.spinner}
                     checkmark={this.state.checkmark}
                     payButtonLabel={this.props.payButtonLabel}
                     back={this.state.back}
            />
        );
    }

    renderInteract() {
        // TODO fix it
        return (
            <div ref="3ds" className="payform--interact"/>
        );
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
                        <div className="payform">
                            { this.state.payform ? this.renderPayform() : false }
                            { this.state.interact ? this.renderInteract() : false }
                        </div>
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}
