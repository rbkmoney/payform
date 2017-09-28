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
            paymentMethod: method.paymentMethod,
            activeForm: method.activeForm
        });
    }

    getMethods(acc, current) {
        return acc.concat(current.methods);
    }

    createMethod(method) {
        switch (method) {
            case 'bankCard':
                return {
                    dictionaryKey: 'method.changer.card',
                    activeForm: 'cardForm',
                    paymentMethod: 'BankCard'
                };
            case 'euroset':
                return {
                    dictionaryKey: 'method.changer.euroset',
                    activeForm: 'eurosetForm',
                    paymentMethod: 'PaymentTerminal'
                };
            default:
                return false;
        }
    }

    renderMethods(method, index, arr) {
        const createdMethod = this.createMethod(method);

        if (!createdMethod) {
            return false;
        }

        const locale = this.props.locale;
        const activeIndex = arr.findIndex((item) => item.activeForm === this.props.viewData.activeForm);
        const isActive = createdMethod.activeForm === this.props.viewData.activeForm;
        const isPrev = arr[activeIndex - 1] ? arr[activeIndex - 1].activeForm === createdMethod.activeForm : false;
        const isNext = arr[activeIndex + 1] ? arr[activeIndex + 1].activeForm === createdMethod.activeForm : false;

        return (
            <li key={createdMethod.activeForm} className={cx('payment-method-changer__item', {
                '_active': isActive,
                '_prev': isPrev,
                '_next': isNext
            })} onClick={this.makeActive.bind(this, createdMethod)}>
                {locale[createdMethod.dictionaryKey]}
            </li>
        );
    }

    render() {
        if (this.props.paymentCapabilities.capabilities.length > 1) {
            return (
                <ul className="payment-method-changer">
                    {this.props.paymentCapabilities.capabilities.reduce(this.getMethods, []).map(this.renderMethods)}
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
