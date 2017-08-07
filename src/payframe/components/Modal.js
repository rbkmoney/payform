import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import cx from 'classnames';
import Payform from './payform/Payform';
import CardUtils from '../../utils/card-utils/CardUtils';
import Header from './header/Header';
import SupportButton from './SupportButton';

class Modal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            defaultEmail: CardUtils.validateEmail(props.data.email) && props.data.email
        };
    }

    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName='checkout'
                transitionAppear={true}
                transitionAppearTimeout={400}
                transitionEnter={false}
                transitionLeave={false}>
                <div className={cx('checkout--container', {'_large': this.props.appearance.largeContainer})}>
                    <Header
                        setClose={this.props.setClose}
                        logo={this.props.data.logo}
                        name={this.props.data.name}
                        description={this.props.data.description}
                        defaultEmail={this.state.defaultEmail}/>
                    <div className="checkout--body">
                        <Payform
                            defaultEmail={this.state.defaultEmail}
                            onPaymentSuccess={this.props.setCheckoutDone}
                            onPayformInteract={this.handlePayformInteract}
                        />
                    </div>
                </div>
                <SupportButton/>
            </ReactCSSTransitionGroup>
        );
    }
}

function mapStateToProps(state) {
    return {
        appearance: state.appearance,
        data: state.data
    }
}

export default connect(mapStateToProps)(Modal);
