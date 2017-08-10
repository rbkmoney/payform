import React, { Component } from 'react';
import { connect } from 'react-redux';
import Email from './Email';
import Amount from './Amount';

class AppleFieldset extends Component {
    render() {
        const email = this.props.viewData.cardForm.email;
        const amount = this.props.viewData.cardForm.amount;

        return (
            <div>
                {
                    email.visible ?
                        <fieldset className="payform--fieldset">
                            <Email/>
                        </fieldset> : false
                }
                {
                    amount.visible ?
                        <fieldset className="payform--fieldset">
                            <Amount/>
                        </fieldset> : false
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        viewData: state.viewData
    }
}

export default connect(mapStateToProps)(AppleFieldset);
