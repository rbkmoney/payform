import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import cx from 'classnames';
import Payform from './payform/Payform';
import Header from './header/Header';
import SupportButton from './SupportButton';

class Modal extends React.Component {

    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName="checkout"
                transitionAppear={true}
                transitionAppearTimeout={400}
                transitionEnter={false}
                transitionLeave={false}>
                <div className={cx('checkout--container', {
                    '_large': this.props.viewData.containerSize === 'large'
                })}>
                    <Header/>
                    <div className="checkout--body">
                        <Payform/>
                    </div>
                </div>
                <SupportButton/>
            </ReactCSSTransitionGroup>
        );
    }
}

function mapState(state) {
    return {
        viewData: state.viewData,
        initParams: state.initParams
    };
}

export default connect(mapState)(Modal);
