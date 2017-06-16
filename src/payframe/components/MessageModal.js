import React from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import ModalClose from './header/ModalClose';

export default class ErrorModal extends React.Component {
    getType(type) {
        switch (type) {
            case 'error':
                return 'Error';
        }
    }

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
                    <div className="error-modal--header">
                        {this.props.type ?
                            <div className="error-modal--header--text">
                                {this.getType(this.props.type)}
                            </div>
                        :
                            false
                        }
                        <ModalClose popoutMode={this.props.popoutMode} setClose={this.props.setClose} />
                    </div>
                    <div className="error-modal--body">
                        <div className="error-modal--message">
                            {this.props.error}
                        </div>
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}