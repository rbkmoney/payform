import * as React from 'react';
import { connect } from 'react-redux';
import * as TransitionGroup from 'react-transition-group';
import * as formStyles from '../form-container.scss';
import * as styles from './payment-methods.scss';
import { ChevronBack } from '../chevron-back';
import { ModelState, State } from 'checkout/state';
import { Locale } from 'checkout/locale';
import { PaymentMethod } from 'checkout/backend/model';
import {
    BankCard,
    Terminals,
    EWallets
} from './methods';
import {
    add,
    next,
    CardFormFlowItem,
    FormFlowItem,
    FormFlowStatus,
    FormName
} from 'checkout/form-flow';
import { bindActionCreators, Dispatch } from 'redux';
import { setFormFlowAction, SetFormsFlowAction } from 'checkout/actions';
import { toAmountConfig } from 'checkout/components/app/init-forms-flow';
import { InitConfig } from 'checkout/config';
import { ReactElement } from 'react';
import { PaymentMethodsNames } from 'checkout/backend';

export interface PaymentMethodsProps {
    locale: Locale;
    paymentMethods: PaymentMethod[];
    setFormFlow: (formFlow: FormFlowItem[]) => SetFormsFlowAction;
    flowItems: FormFlowItem[];
    initConfig: InitConfig;
    model: ModelState;
}

const makeFormFlow = (formName: FormName, props: PaymentMethodsProps): FormFlowItem => {
    switch (formName) {
        case FormName.cardForm:
            return {
                formName: FormName.cardForm,
                active: false,
                amountConfig: toAmountConfig(props.initConfig, props.model),
                status: FormFlowStatus.unprocessed
            } as CardFormFlowItem;
    }
};

export class PaymentMethodsDef extends React.Component<PaymentMethodsProps> {
    constructor(props: PaymentMethodsProps) {
        super(props);

        this.renderMethod = this.renderMethod.bind(this);
    }

    goToMethod(formName: FormName) {
        this.props.setFormFlow(next(add(this.props.flowItems, makeFormFlow(formName, this.props))));
    }

    renderMethod(method: PaymentMethod): ReactElement<PaymentMethodsProps> {
        switch (method.method) {
            case PaymentMethodsNames.BankCard:
                return <BankCard key={method.method} onClick={this.goToMethod.bind(this, FormName.cardForm)}/>;
            case PaymentMethodsNames.PaymentTerminal:
                return <Terminals key={method.method}/>;
            case PaymentMethodsNames.DigitalWallet:
                return <EWallets key={method.method}/>;
        }
    }

    render() {
        const CSSTransitionGroup = TransitionGroup.CSSTransitionGroup;
        const locale = this.props.locale;
        return (
            <form>
                <div className={formStyles.header}>
                    <ChevronBack/>
                    <div className={formStyles.title}>
                        {locale['form.header.payment.methods.label']}
                    </div>
                </div>
                <CSSTransitionGroup
                    className={styles.list}
                    component='ul'
                    transitionName={{
                        appear: styles.appearItem,
                        enter: styles.enterItem,
                        leave: styles.leaveItem
                    }}
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={1000}
                    transitionAppearTimeout={1000}
                    transitionAppear={true}
                    transitionEnter={true}
                    transitionLeave={true}
                >
                    {this.props.paymentMethods.map(this.renderMethod)}
                </CSSTransitionGroup>
            </form>
        );
    }
}

const mapStateToProps = (state: State) => ({
    locale: state.config.locale,
    paymentMethods: state.model.paymentMethods,
    flowItems: state.formsFlow,
    initConfig: state.config.initConfig,
    model: state.model
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setFormFlow: bindActionCreators(setFormFlowAction, dispatch)
});

export const PaymentMethods = connect(mapStateToProps, mapDispatchToProps)(PaymentMethodsDef);
