import * as React from 'react';
import {connect} from 'react-redux';
import * as TransitionGroup from 'react-transition-group';
import * as formStyles from '../form-container.scss';
import * as styles from './payment-methods.scss';
import {FormName, ModalState, ModelState, State} from 'checkout/state';
import {Locale} from 'checkout/locale';
import {BankCard, Terminals, Wallets} from './methods';
import {PaymentMethod, PaymentMethodName} from 'checkout/backend/model';
import {bindActionCreators, Dispatch} from 'redux';
import {InitConfig} from 'checkout/config';
import {setActiveFormInfo, setFormInfo} from 'checkout/actions';

export interface PaymentMethodsProps {
    locale: Locale;
    methods: PaymentMethod[];
    setFormInfo: (formName: FormName, initConfig: InitConfig, model: ModelState) => any;
    setActiveFormInfo: (formName: FormName, modals: ModalState[]) => any;
    initConfig: InitConfig;
    model: ModelState;
    modals: ModalState[];
}

const mapStateToProps = (state: State) => ({
    locale: state.config.locale,
    methods: state.model.paymentMethods,
    initConfig: state.config.initConfig,
    model: state.model,
    modals: state.modals
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setFormInfo: bindActionCreators(setFormInfo, dispatch),
    setActiveFormInfo: bindActionCreators(setActiveFormInfo, dispatch),
});

const CSSTransitionGroup = TransitionGroup.CSSTransitionGroup;

const renderMethods = (method: PaymentMethod, props: PaymentMethodsProps) => {
    const initConfig = props.initConfig;
    switch (method.method) {
        case PaymentMethodName.PaymentTerminal:
            return initConfig.terminals ? <Terminals key={method.method} {...props}/> : null;
        case PaymentMethodName.DigitalWallet:
            return initConfig.wallets ? <Wallets key={method.method} {...props}/> : null;
        default:
        case PaymentMethodName.BankCard:
            return <BankCard key={method.method} {...props}/>;
    }
};

export const PaymentMethodsDef: React.SFC<PaymentMethodsProps> = (props) => (
    <form>
        <div className={formStyles.header}>
            <div className={formStyles.title}>
                {props.locale['form.header.payment.methods.label']}
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
            {props.methods.map((method: PaymentMethod) => renderMethods(method, props))}
        </CSSTransitionGroup>
    </form>
);

export const PaymentMethods = connect(mapStateToProps, mapDispatchToProps)(PaymentMethodsDef);
