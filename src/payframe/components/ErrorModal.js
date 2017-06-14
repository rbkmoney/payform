import React from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import ModalClose from './ModalClose';

export default class ErrorModal extends React.Component {
    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName='error-modal'
                transitionAppear={true}
                transitionAppearTimeout={400}
                transitionEnter={false}
                transitionLeave={false}
            >
                <div className="error-modal">
                    <ModalClose popoutMode={this.props.popoutMode} setClose={this.props.setClose} />
                    <div className="error-modal--text">
                        {this.props.error}
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}