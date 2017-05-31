import React from 'react';
import isMobile from 'ismobilejs';

class ModalClose extends React.Component {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);
    }

    close() {
        if (this.props.popupMode) {
            //window.close();
            history.back();
        } else {
            this.props.setClose();
        }
    }

    render() {
        if (isMobile.any) {
          return false;
        } else {
            return (
                <div className="checkout--close-button" onClick={this.close}>
                    <svg width="12" height="12">
                        <polygon points="1,3 1,2 2,1 3,1 6,4 9,1 10,1 11,2 11,3 8,6 11,9 11,10 10,11 9,11 6,8 3,11 1,11 2,11 1,10 1,9 4,6" fill="#e8e8e8" stroke="#bbbcbe" strokeWidth="1" />
                    </svg>
                </div>
            );
        }

    }
}

export default ModalClose;
