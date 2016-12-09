import React from 'react';
import ModalClose from './ModalClose';
import Preload from './Preload';
import Payform from './payform/Payform';

class Modal extends React.Component {

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
                                <div className="payform--logo-image"></div>
                            </div>
                            <div className="payform--company-name"></div>
                        </div>
                        <div className="payform--form">
                            <Payform/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Modal;
