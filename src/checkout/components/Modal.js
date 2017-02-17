import React from 'react';
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
import StateWorker from '../state/StateWorker';

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.handlePay = this.handlePay.bind(this);
    }

    handleSuccess(result) {
        this.isInProcess = false;
        this.isProcessSuccess = true;
        this.forceUpdate();
        if (result.type === 'success') {
            StateWorker.flush();
            ParentCommunicator.sendWithTimeout({type: 'done'}, settings.closeFormTimeout);
        }
    }

    componentDidMount() {
        this.isInProcess = false;
        this.isProcessSuccess = false;
        const tokenizerScript = new TokenizerScript();
        tokenizerScript.render()
            .catch(() => {
                this.isPayButtonDisabled = true;
                this.errorMessage = 'Tokenizer is not available';
                this.isShowErrorPanel = true;
                this.forceUpdate();
            });
        if (this.props.isResume) {
            this.isInProcess = true;
            Processing.pollEvents({
                endpointEvents: this.props.endpointEvents,
                invoiceId: this.props.invoiceId,
                orderId: this.props.orderId
            }).then(result => {
                if (result.type === 'success') {
                    this.handleSuccess(result);
                } else {
                    StateWorker.flush();
                    ParentCommunicator.sendWithTimeout({type: 'error'}, settings.closeFormTimeout);
                }
            });
        }
        this.forceUpdate();
    }

    handlePay(formData) {
        this.isShowErrorPanel = false;
        this.isInProcess = true;
        this.forceUpdate();
        Processing.process({
            tokenizer: window.Tokenizer,
            publicKey: this.props.publicKey,
            cardHolder: formData.cardHolder,
            cardNumber: formData.cardNumber,
            cardExpire: formData.cardExpire,
            email: formData.email,
            cardCvv: formData.cardCvv,
            endpointInit: this.props.endpointInit,
            endpointEvents: this.props.endpointEvents,
            invoiceId: this.props.invoiceId,
            orderId: this.props.orderId
        }).then(result => {
            if (result.type === 'success') {
                this.handleSuccess(result);
            } else if (result.type === 'interact') {
                StateWorker.init3DS(this.props.invoiceId);
                const redirectUrl = `${this.props.payformHost}/checkout/checkout.html`; //TODO fix?
                const form3ds = new Form3ds(result.data, redirectUrl);
                form3ds.render();
                form3ds.submit(settings.closeFormTimeout);
            }
        }).catch(error => {
            this.isInProcess = false;
            this.errorMessage = error.message;
            this.isShowErrorPanel = true;
            this.forceUpdate();
        });
    }

    render() {
        return <div className="modal">
            <div className="modal--container">
                <ModalClose/>
                <div className="modal--body">
                    <div className="payform">
                        <div className="payform--header">
                            <div className="payform--logo">
                                <Logo logoUrl={this.props.logo}/>
                            </div>
                            <div className="payform--company-name">{this.props.name}</div>
                        </div>
                        <div className="payform--form">
                            <Spinner isShow={this.isInProcess}/>
                            <Checkmark isShow={this.isProcessSuccess}/>
                            <Payform isShow={!this.isInProcess && !this.isProcessSuccess}
                                     handlePay={this.handlePay}
                                     errorMessage={this.errorMessage}
                                     isPayButtonDisabled={this.isPayButtonDisabled}
                                     isShowErrorPanel={this.isShowErrorPanel}
                                     amount={this.props.amount}
                                     currency={this.props.currency}
                                     buttonColor={this.props.buttonColor}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Modal;
