import React from 'react';
import ParentCommunicator from '../../communication/ParentCommunicator';

class ModalClose extends React.Component {

    close() {
        ParentCommunicator.send({type: 'close'});
    }

    render() {
        return <div className="modal--close" onClick={this.close}/>;
    }
}

export default ModalClose;
