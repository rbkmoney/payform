import * as React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import * as formStyles from '../form-container.scss';
import * as styles from './payment-methods.scss';
import { FormInfo, ModalState, ModelState, State } from 'checkout/state';
import { Locale } from 'checkout/locale';
import { BankCard, Wallets } from './methods';
import { PaymentMethod, PaymentMethodName } from 'checkout/backend/model';
import { bindActionCreators, Dispatch } from 'redux';
import { InitConfig } from 'checkout/config';
import { goToFormInfo, setViewInfoHeight } from 'checkout/actions';
import { Terminals } from './methods';

export interface PaymentMethodsProps {
    locale: Locale;
    methods: PaymentMethod[];
    setFormInfo: (formInfo: FormInfo) => any;
    initConfig: InitConfig;
    model: ModelState;
    modals: ModalState[];
    setViewInfoHeight: (height: number) => any;
}

const mapStateToProps = (state: State) => ({
    locale: state.config.locale,
    methods: state.model.paymentMethods,
    initConfig: state.config.initConfig,
    model: state.model,
    modals: state.modals
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setFormInfo: bindActionCreators(goToFormInfo, dispatch),
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch)
});

const renderMethods = (method: PaymentMethod, props: PaymentMethodsProps) => {
    const initConfig = props.initConfig;
    switch (method.method) {
        case PaymentMethodName.PaymentTerminal:
            return initConfig.terminals ? <Terminals key={method.method} {...props}/> : null;
        case PaymentMethodName.DigitalWallet:
            return initConfig.wallets ? <Wallets key={method.method} {...props}/> : null;
        case PaymentMethodName.BankCard:
            return <BankCard key={method.method} {...props}/>;
        default:
            return null;
    }
};

class PaymentMethodsDef extends React.Component<PaymentMethodsProps> {

    componentWillMount() {
        this.props.setViewInfoHeight(306);
    }

    render() {
        return (
            <form>
                <div>
                    <div className={formStyles.header}>
                        <div className={formStyles.title}>
                            {this.props.locale['form.header.payment.methods.label']}
                        </div>
                    </div>
                    <CSSTransition
                        className={styles.list}
                        component='ul'
                        classNames={{
                            appear: styles.appearItem,
                            enter: styles.enterItem,
                            exit: styles.leaveItem
                        }}
                        timeout={{enter: 1000, exit: 1000}}
                        transitionAppear={true}
                        transitionEnter={true}
                        transitionLeave={true}
                    >
                        {this.props.methods.map((method: PaymentMethod) => renderMethods(method, this.props))}
                    </CSSTransition>
                </div>
            </form>
        );
    }
}

export const PaymentMethods = connect(mapStateToProps, mapDispatchToProps)(PaymentMethodsDef);
