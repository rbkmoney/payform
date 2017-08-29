import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewDataActions from '../../actions/viewDataActions';

class BackChevron extends React.Component {

    constructor(props) {
        super(props);
        this.back = this.back.bind(this);
    }

    back() {
        this.props.actions.viewDataActions.setActiveForm(this.props.viewData.previousForm);
    }

    render() {
        return (
            <div className="checkout--back-chevron" onClick={this.back}>
                <svg version="1.1" x="0px" y="0px" viewBox="0 0 240.823 240.823">
                    <g>
                        <path d="M57.633,129.007L165.93,237.268c4.752,4.74,12.451,4.74,17.215,0c4.752-4.74,4.752-12.439,0-17.179l-99.707-99.671l99.695-99.671c4.752-4.74,4.752-12.439,0-17.191c-4.752-4.74-12.463-4.74-17.215,0L57.621,111.816C52.942,116.507,52.942,124.327,57.633,129.007z"/>
                    </g>
                </svg>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        viewData: state.viewData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            viewDataActions: bindActionCreators(viewDataActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BackChevron);
