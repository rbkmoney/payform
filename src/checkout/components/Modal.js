import React from 'react';
import ModalClose from './ModalClose';
import Preload from './Preload';
import Logo from './Logo';
import Payform from './payform/Payform';

class Modal extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.input.style.backgroundImage = 'url("' + this.props.logo + '")'
    }

    render() {
        return <div className="modal">
            <Preload/>
            <div className="modal--overlay"></div>
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
                            <Payform publicKey={this.props.publicKey}
                                     endpointInit={this.props.endpointInit}
                                     endpointEvents={this.props.endpointEvents}
                                     invoiceId={this.props.invoiceId}
                                     orderId={this.props.orderId}
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
