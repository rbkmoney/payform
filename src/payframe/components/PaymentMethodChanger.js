import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';

import * as viewDataActions from '../actions/viewDataActions';

class PaymentMethodChanger extends Component {
     constructor(props) {
         super(props);

         this.state = {
             active: 'cardForm'
         };

         this.renderMethods = this.renderMethods.bind(this);
         this.makeActive = this.makeActive.bind(this);
     }

     makeActive(method) {
         this.setState({
             active: method
         });

         this.props.actions.viewDataActions.setActiveForm(method);
     }

     //TODO: Решить вопрос по логике с провайдерами. Если в случае карты мне достаточно смотреть на метод,
     //то в случае с терминалами нужно смотреть именно провайдеров.

     getMethod(method) {
         switch (method.method) {
             case 'BankCard':
                 return {
                     name: 'Card',
                     type: 'cardForm'
                 };
             case 'PaymentTerminal':
                 return {
                     name: 'Euroset',
                     type: 'eurosetForm'
                 }
         }
     }

    renderMethods(method, index, arr) {
        const activeIndex = arr.findIndex((item) => item.type === this.state.active);
        const isActive = method.type === this.state.active;
        const isPrev = arr[activeIndex - 1] ? arr[activeIndex - 1].type === method.type : false;
        const isNext = arr[activeIndex + 1] ? arr[activeIndex + 1].type === method.type : false;

        return(
            <li key={method.type} className={cx('payment-method-changer__item', {
                '_active': isActive,
                '_prev': isPrev,
                '_next': isNext
            })} onClick={this.makeActive.bind(this, method.type)}>
                {method.name}
            </li>
        );
    }

    render() {
        if (this.props.paymentCapabilities.capabilities.length > 1) {
            return(
                <ul className="payment-method-changer">
                    {this.props.paymentCapabilities.capabilities.map(this.getMethod).map(this.renderMethods)}
                </ul>
            );
        } else {
            return false;
        }
    }
}

function mapStateToProps(state) {
    return {
        viewData: state.viewData,
        paymentCapabilities: state.paymentCapabilities
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            viewDataActions: bindActionCreators(viewDataActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodChanger);
