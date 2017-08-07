import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as resultActions from '../../redux/actions/resultActions';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import ModalClose from './header/ModalClose';

class ErrorModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
        this.prepareMessage = this.prepareMessage.bind(this);
    }

    componentDidMount() {
        if (this.props.error) {
            this.setState({
                message: this.prepareMessage(this.props.error.localePath)
            });
        }
    }

    prepareMessage(localePath) {
        return localePath
            ? this.props.locale[localePath]
            : this.props.locale['Unknown Failure'];
    }

    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName="error-modal"
                transitionAppear={true}
                transitionAppearTimeout={400}
                transitionEnter={false}
                transitionLeave={false}>
                <div className="error-modal">
                    <div className="error-modal--header">
                        <div className="error-modal--header--text">Error</div>
                        {this.props.initParams.popupMode ? false : <ModalClose/>}
                    </div>
                    <div className="error-modal--body">
                        <div className="error-modal--message">
                            {this.state.message}
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