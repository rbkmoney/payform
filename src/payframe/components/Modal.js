import React from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import cx from 'classnames';
import ModalClose from './ModalClose';
import Logo from './Logo';
import Payform from './payform/Payform';
import TokenizerScript from '../elements/TokenizerScript';
import Processing from '../backend-communication/Processing';
import settings from '../../settings';
import Form3ds from '../interaction/Form3ds';
import EventPoller from '../backend-communication/EventPoller';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            payform: true,
            interact: false,
            spinner: false,
            checkmark: false,
            payformState: {
                cardHolder: {value: ''},
                cardNumber: {value: ''},
                cardExpire: {value: ''},
                cardCvv: {value: ''},
                email: {value: ''}
            }
        };

        this.handlePay = this.handlePay.bind(this);
        this.setPayformState = this.setPayformState.bind(this);
    }

    componentDidMount() {
        const tokenizerScript = new TokenizerScript(this.props.tokenizerEndpoint);
        tokenizerScript.render()
            .catch(() => {
                this.isPayButtonDisabled = true;
                this.errorMessage = 'Tokenizer is not available';
                this.isShowErrorPanel = true;
                this.forceUpdate();
            });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            payform: true,
            interact: false,
            spinner: true,
            checkmark: false
        });
        EventPoller.pollEvents(nextProps.capiEndpoint, nextProps.invoiceID, nextProps.invoiceAccessToken)
            .then((event) => this.handleEvent(event))
            .catch(error => this.handleError(error));
    }

    setPayformState(data, name) {
        this.setState({
            payformState: Object.assign(this.state.payformState, {
                [name]: data
            })
        })
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
        this.isShowErrorPanel = true;
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
    }

    handleInteract(event) {
        this.setState({
            payform: false,
            interact: true,
            spinner: false,
            checkmark: false
        });
        const redirectUrl = `${this.props.payformHost}/html/finishInteraction.html`;
        const form3ds = new Form3ds(event.data, redirectUrl, this.refs['3ds']);
        form3ds.render();
        form3ds.submit(settings.submitFormTimeout);
    }

    handlePay() {
        const formData = this.state.payformState;
        this.isShowErrorPanel = false;
        this.setState({
            payform: true,
            interact: false,
            spinner: true,
            checkmark: false
        });
        Processing.process({
            tokenizer: window.Tokenizer,
            invoiceAccessToken: this.props.invoiceAccessToken,
            invoiceID: this.props.invoiceID,
            capiEndpoint: this.props.capiEndpoint,
            tokenizerEndpoint: this.props.tokenizerEndpoint,
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
            <ReactCSSTransitionGroup
                transitionName='checkout--body'
                transitionAppear={true}
                transitionAppearTimeout={700}
                transitionEnter={false}
                transitionLeave={false}
            >
                <Payform handlePay={this.handlePay}
                         errorMessage={this.errorMessage}
                         isPayButtonDisabled={this.isPayButtonDisabled}
                         isShowErrorPanel={this.isShowErrorPanel}
                         amount={this.props.amount}
                         currency={this.props.currency}
                         payformState={this.state.payformState}
                         setPayformState={this.setPayformState}
                         spinner={this.state.spinner}
                         checkmark={this.state.checkmark}
                />
            </ReactCSSTransitionGroup>
        );
    }

    renderInteract() {
        return (
            <div ref="3ds" className="payform--interact"/>

        );
    }

    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName='checkout'
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}
            >
                <div className={cx(
                    'checkout--container',
                    {
                        '_interact': this.state.interact
                    }
                )}>
                    <div className="checkout--header">
                        <ModalClose invoiceID={this.props.invoiceID}
                                    setClose={this.props.setClose}/>
                        <Logo logo={this.props.logo}/>
                        <div className="checkout--company-name">
                            {this.props.name}
                        </div>
                    </div>
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