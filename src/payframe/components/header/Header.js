import React from 'react';
import { connect } from 'react-redux';
import Logo from './Logo';
import ModalClose from './ModalClose';
import BackChevron from './BackChevron';

class Header extends React.Component {

    render() {
        const viewData = this.props.viewData;
        const isBackAvailable = viewData.previousForm
            && viewData.previousForm !== viewData.activeForm
            && this.props.payment.status === 'pristine';
        return (
            <div className="checkout--header">
                {
                    this.props.initParams.popupMode
                        ? false
                        : <ModalClose/>
                }
                {
                    isBackAvailable ? <BackChevron/> : false
                }
                <Logo logo={this.props.initParams.logo}/>
                <div className="checkout--company-name">{this.props.initParams.name}</div>
                {
                    this.props.initParams.description
                        ? <div className="checkout--company-description">{this.props.initParams.description}</div>
                        : false
                }
                {
                    viewData.defaultEmail ?
                        <div className="checkout--default-email--container">
                            <hr/>
                            <div className="checkout--default-email">
                                {viewData.defaultEmail}
                            </div>
                        </div> : false
                }
            </div>
        );
    }
}

function mapState(state) {
    return {
        initParams: state.initParams,
        viewData: state.viewData,
        payment: state.payment
    };
}

export default connect(mapState)(Header);
