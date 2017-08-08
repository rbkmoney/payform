import React from 'react';
import { connect } from 'react-redux';
import Logo from './Logo';
import ModalClose from './ModalClose';

class Header extends React.Component {

    render() {
        return (
            <div className="checkout--header">
                {
                    this.props.initParams.popupMode
                        ? false
                        : <ModalClose/>
                }
                <Logo logo={this.props.initParams.logo}/>
                <div className="checkout--company-name">{this.props.initParams.name}</div>
                {
                    this.props.initParams.description
                        ? <div className="checkout--company-description">{this.props.initParams.description}</div>
                        : false
                }
                {
                    this.props.viewData.defaultEmail ?
                        <div className="checkout--default-email--container">
                            <hr/>
                            <div className="checkout--default-email">
                                {this.props.viewData.defaultEmail}
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
        viewData: state.viewData
    };
}

export default connect(mapState)(Header);
