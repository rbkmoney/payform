import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as resultActions from '../../redux/actions/resultActions';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import ModalClose from './header/ModalClose';

class ErrorModal extends React.Component {

    constructor(props) {
        super(props);
        this.prepareMessage = this.prepareMessage.bind(this);
    }

    prepareMessage() { // TODO fix it
        let result = this.props.locale['Unknown Failure'];
        const localePath = this.props.error.localePath;
        if (localePath) {
            const localized = this.props.locale[localePath];
            if (localized) {
                result = localized;
            }
        }
        return result;
    }

    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName="error-modal"
                transitionAppear={true}
                transitionAppearTimeout={400}
                transitionEnter={false}
                transitionLeave={false}
            >
                <div className="error-modal">
                    <div className="error-modal--header">
                        <div className="error-modal--header--text">Error</div>
                        {this.props.initParams.popupMode ? false : <ModalClose/>}
                    </div>
                    <div className="error-modal--body">
                        <div className="error-modal--message">
                            {this.prepareMessage()}
                        </div>
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}

function mapStateToProps(state) {
    return {
        initParams: state.initParams,
        locale: state.locale,
        error: state.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            resultActions: bindActionCreators(resultActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);