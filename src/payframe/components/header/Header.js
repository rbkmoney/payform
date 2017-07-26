import React from 'react';
import Logo from './Logo';
import ModalClose from './ModalClose';
import isMobile from 'ismobilejs';

class Header extends React.Component {

    render() {
        return (
            <div className="checkout--header">
                {
                    !isMobile.any
                        ? <ModalClose setClose={this.props.setClose}/>
                        : false
                }
                <Logo logo={this.props.logo}/>
                <div className="checkout--company-name">{this.props.name}</div>
                {
                    this.props.description
                        ? <div className="checkout--company-description">{this.props.description}</div>
                        : false
                }
                {
                    this.props.defaultEmail ?
                        <div className="checkout--default-email--container">
                            <hr/>
                            <div className="checkout--default-email">
                                {this.props.defaultEmail}
                            </div>
                        </div> : false
                }
            </div>
        );
    }
}

export default Header;
