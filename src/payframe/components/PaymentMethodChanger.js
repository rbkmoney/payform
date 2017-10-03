import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';

import * as viewDataActions from '../actions/viewDataActions';

class PaymentMethodChanger extends Component {

    constructor(props) {
        super(props);
        this.renderTab = this.renderTab.bind(this);
        this.setActive = this.setActive.bind(this);
    }

    toMethodChangerItems() {
        return this.props.paymentCapabilities.capabilities.map((capability) => {
            switch (capability.name) {
                case 'card':
                    return {
                        name: 'BankCard',
                        dictionaryKey: 'method.changer.card',
                        visible: true,
                        active: false
                    };
                case 'terminal': {
                    return {
                        name: 'PaymentTerminal',
                        dictionaryKey: 'method.changer.euroset',
                        visible: this.props.initParams.terminals,
                        active: false
                    };
                }
            }
        });
    }

    renderTab(changerItem, index, items) {
        const setPaymentMethod = this.props.actions.viewDataActions.setPaymentMethod;
        return (
            <li key={changerItem.name} id={changerItem.name}
                className={cx('payment-method-changer__item', {
                    '_active': changerItem.active,
                    '_prev': items[index + 1] ? items[index + 1].active : false,
                    '_next': items[index - 1] ? items[index - 1].active : false
                })} onClick={setPaymentMethod.bind(this, changerItem.name)}>
                {this.props.locale[changerItem.dictionaryKey]}
            </li>
        );
    }

    setActive(changerItem) {
        changerItem.active = changerItem.name === this.props.viewData.paymentMethod;
        return changerItem;
    }

    render() {
        const visibleItems = this.toMethodChangerItems().filter((method) => method.visible);
        if (visibleItems.length > 1) {
            return (
                <ul className="payment-method-changer">
                    {visibleItems.map(this.setActive).map(this.renderTab)}
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
        locale: state.locale,
        initParams: state.initParams
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
