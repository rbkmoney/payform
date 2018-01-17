import * as React from 'react';
import { connect } from 'react-redux';
import * as TransitionGroup from 'react-transition-group';
import * as formStyles from '../form-container.scss';
import * as styles from './payment-methods.scss';
import { ChevronBack } from '../chevron-back';
import { FormName, ModelState, State } from 'checkout/state';
import { Locale } from 'checkout/locale';
import { BankCard, Terminals, EWallets } from './methods';
import { PaymentMethod, PaymentMethodsEnum } from 'checkout/backend/model';
import { bindActionCreators, Dispatch } from 'redux';
import { setFormInfo } from 'checkout/actions/modal-actions/set-form-info-action';
import { InitConfig } from 'checkout/config';

export interface PaymentMethodsProps {
    locale: Locale;
    methods: PaymentMethod[];
    setFormInfo: (formName: FormName, initConfig: InitConfig, model: ModelState) => any;
    initConfig: InitConfig;
    model: ModelState;
}

const mapStateToProps = (state: State) => ({
    locale: state.config.locale,
    methods: state.model.paymentMethods,
    initConfig: state.config.initConfig,
    model: state.model
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setFormInfo: bindActionCreators(setFormInfo, dispatch),
});

const CSSTransitionGroup = TransitionGroup.CSSTransitionGroup;

export class PaymentMethodsDef extends React.Component<PaymentMethodsProps> {
    constructor(props: PaymentMethodsProps) {
        super(props);

        this.renderMethods = this.renderMethods.bind(this);
    }

    renderMethods(method: PaymentMethod) {
        const initConfig = this.props.initConfig;
        switch (method.method) {
            case PaymentMethodsEnum.PaymentTerminal:
                return initConfig.terminals ? <Terminals key={method.method} {...this.props}/> : null;
            case PaymentMethodsEnum.DigitalWallet:
                return initConfig.ewallets ? <EWallets key={method.method} {...this.props}/> : null;
            default:
            case PaymentMethodsEnum.BankCard:
                return <BankCard key={method.method} {...this.props}/>;
        }
    }

    render() {
        return (
            <form>
                <div className={formStyles.header}>
                    <div className={formStyles.title}>
                        {this.props.locale['form.header.payment.methods.label']}
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
                    {this.props.methods.map(this.renderMethods)}
                </CSSTransitionGroup>
            </form>
        );
    }
}

export const PaymentMethods = connect(mapStateToProps, mapDispatchToProps)(PaymentMethodsDef);
