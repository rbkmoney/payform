import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardNumber from './CardNumber';
import CardExpire from './CardExpire';
import CardCvv from './CardCvv';
import CardHolder from './CardHolder';
import Email from './Email';
import Amount from './Amount';

class CardFieldset extends Component {
    render() {
        const email = this.props.viewData.cardForm.email;
        const amount = this.props.viewData.cardForm.amount;

        return (
            <div>
                <fieldset className="payform--fieldset">
                    <CardNumber/>
                    <CardExpire/>
                    <CardCvv/>
                </fieldset>
                <fieldset className="payform--fieldset">
                    <CardHolder/>
                </fieldset>
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

export default connect(mapStateToProps)(CardFieldset);
