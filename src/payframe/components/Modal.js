import React from 'react';
import cx from 'classnames';
import ModalClose from './ModalClose';
import Logo from './Logo';
import Spinner from './Spinner';
import Checkmark from './Checkmark';
import Payform from './payform/Payform';
import TokenizerScript from '../elements/TokenizerScript';
import Processing from '../backend-communication/Processing';
import ParentCommunicator from '../../communication/ParentCommunicator';
import settings from '../../settings';
import Form3ds from '../interaction/Form3ds';
import EventPoller from '../backend-communication/EventPoller';
import isMobile from 'ismobilejs';

export default class Modal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            payform: true,
            interact: false,
            spinner: false,
            checkmark: false
        };

        this.handlePay = this.handlePay.bind(this);
    }

    handleSuccess(result) {
        if (result.type === 'success') {
            this.setState({
                payform: false,
                interact: false,
                spinner: false,
                checkmark: true
            });

            if (isMobile.any) {
                this.props.setCheckoutDone();
                setTimeout(() => {
                    window.close();
                }, settings.closeFormTimeout);
            } else {
                ParentCommunicator.sendWithTimeout({type: 'done', invoiceID: this.props.invoiceID}, settings.closeFormTimeout);
            }
        }
    }

    handleError() {
        ParentCommunicator.sendWithTimeout({type: 'error', invoiceID: this.props.invoiceID}, settings.closeFormTimeout);
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

    handlePay(formData) {
        this.isShowErrorPanel = false;
        this.setState({
            payform: false,
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
            cardHolder: formData.cardHolder,
            cardNumber: formData.cardNumber,
            cardExpire: formData.cardExpire,
            email: formData.email,
            cardCvv: formData.cardCvv
        }).then(result => {
            if (result.type === 'success') {
                this.handleSuccess(result);
            } else if (result.type === 'interact') {
                this.setState({
                    payform: false,
                    interact: true,
                    spinner: false,
                    checkmark: false
                });
                this.props.set3DSStatus(true);
                const redirectUrl = `${this.props.payformHost}/payframe/finishInteraction.html`;
                const form3ds = new Form3ds(result.data, redirectUrl, this.refs['3ds']);
                form3ds.render();
                form3ds.submit(settings.submitFormTimeout);
            }
        }).catch(error => {
            this.setState({
                payform: true,
                interact: false,
                spinner: false,
                checkmark: false
            });
            this.errorMessage = error.message;
            this.isShowErrorPanel = true;
            this.forceUpdate();
        });
    }

    componentWillReceiveProps(nextProps) {
       this.setState({
            payform: false,
            interact: false,
            spinner: true,
            checkmark: false
       });
        EventPoller.pollEvents(nextProps.capiEndpoint, nextProps.invoiceID, nextProps.invoiceAccessToken)
            .then((result) => {
               if (result.type === 'success') {
                   this.setState({
                        payform: false,
                        interact: false,
                        spinner: false,
                        checkmark: true
                   });
                   this.handleSuccess(result);
               }
            })
            .catch(error => {
                this.setState({
                    payform: true,
                    interact: false,
                    spinner: false,
                    checkmark: false
               });
                this.errorMessage = error.message;
                this.isShowErrorPanel = true;
                this.forceUpdate();
            });
    }

    renderPayform() {
        return (
            <Payform handlePay={this.handlePay}
                     errorMessage={this.errorMessage}
                     isPayButtonDisabled={this.isPayButtonDisabled}
                     isShowErrorPanel={this.isShowErrorPanel}
                     buttonColor={this.props.buttonColor}
                     amount={this.props.amount}
                     currency={this.props.currency}
            />
        );
    }

    render() {
        return (
            <div className="checkout">
                <div className="checkout--overlay" />
                <div className={cx(
                    'checkout--container',
                    {
                        '_interact': this.state.interact
                    }
                )}>
                    <div className="checkout--header">
                        <ModalClose invoiceID={this.props.invoiceID} />
                        <Logo logoUrl={this.props.logo}/>
                        <div className="checkout--company-name">
                            {this.props.name}
                        </div>
                    </div>
                    <div className="checkout--body">
                        <div className="payform">
                            { this.state.payform ? this.renderPayform() : false }
                            { this.state.interact ? <div ref="3ds" className="payform--interact" /> : false }
                            { this.state.spinner ? <Spinner /> : false }
                            { this.state.checkmark ? <Checkmark /> : false }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
