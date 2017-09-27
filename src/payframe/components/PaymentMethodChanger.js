import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';

import * as viewDataActions from '../actions/viewDataActions';

class PaymentMethodChanger extends Component {
    constructor(props) {
        super(props);

        this.renderMethods = this.renderMethods.bind(this);
        this.makeActive = this.makeActive.bind(this);
    }

    makeActive(method) {
        this.props.actions.viewDataActions.setActiveForm({
            paymentMethod: method.method,
            activeForm: method.form
        });
    }

    //TODO: Решить вопрос по логике с провайдерами. Если в случае карты мне достаточно смотреть на метод,
    //то в случае с терминалами нужно смотреть именно провайдеров.

    getMethod(method) {
        switch (method.method) {
            case 'BankCard':
                return {
                    name: 'Card',
                    form: 'cardForm',
                    method: 'BankCard'
                };
            case 'PaymentTerminal':
                return {
                    name: 'Euroset',
                    form: 'eurosetForm',
                    method: 'PaymentTerminal'
                }
        }
    }

    renderMethods(method, index, arr) {
        const locale = this.props.locale;
        const activeIndex = arr.findIndex((item) => item.form === this.props.viewData.activeForm);
        const isActive = method.form === this.props.viewData.activeForm;
        const isPrev = arr[activeIndex - 1] ? arr[activeIndex - 1].form === method.form : false;
        const isNext = arr[activeIndex + 1] ? arr[activeIndex + 1].form === method.form : false;

        return (
            <li key={method.form} className={cx('payment-method-changer__item', {
                '_active': isActive,
                '_prev': isPrev,
                '_next': isNext
            })} onClick={this.makeActive.bind(this, method)}>
                {locale[method.name]}
            </li>
        );
    }

    render() {
        if (this.props.paymentCapabilities.capabilities.length > 1) {
            return (
                <ul className="payment-method-changer">
                    {this.props.paymentCapabilities.capabilities.map(this.getMethod)
                    .map(this.renderMethods)}
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
        paymentCapabilities: state.paymentCapabilities,
        locale: state.locale
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
