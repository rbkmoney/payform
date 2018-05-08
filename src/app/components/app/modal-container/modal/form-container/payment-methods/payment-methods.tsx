import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as formStyles from '../form-container.scss';
import { FormInfo, PaymentMethod, State } from 'checkout/state';
import { Locale } from 'checkout/locale';
import {
    goToFormInfo,
    pay as payAction,
    PaymentRequestedPayload,
    setViewInfoHeight
} from 'checkout/actions';
import { Methods } from './methods';
import { OtherPaymentMethodsLink } from './other-payment-methods-link';
import { calcHeight } from './calc-height';
import { isPrefilled } from './is-payment-values-prefilled';

export interface PaymentMethodsProps {
    locale: Locale;
    methods: PaymentMethod[];
    paymentValuesPrefilled: boolean;
    setFormInfo: (formInfo: FormInfo) => any;
    setViewInfoHeight: (height: number) => any;
    pay: (payload: PaymentRequestedPayload) => any;
}

export interface PaymentMethodsState {
    visibleMethods: PaymentMethod[];
}

const mapStateToProps = (s: State) => ({
    locale: s.config.locale,
    methods: s.availablePaymentMethods.sort((m1, m2) => m1.priority > m2.priority ? 1 : -1),
    paymentValuesPrefilled: isPrefilled(s.config.initConfig, s.model)
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setFormInfo: bindActionCreators(goToFormInfo, dispatch),
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch),
    pay: bindActionCreators(payAction, dispatch)
});

class PaymentMethodsDef extends React.Component<PaymentMethodsProps, PaymentMethodsState> {

    componentWillMount() {
        const {methods} = this.props;
        const visibilityThreshold = 3;
        const visibleMethods = methods.filter((m, i) => i < visibilityThreshold);
        this.setState({visibleMethods});
        this.props.setViewInfoHeight(calcHeight(methods.length, visibleMethods.length, visibilityThreshold));
        this.showAllMethods = this.showAllMethods.bind(this);
    }

    showAllMethods() {
        this.setState({
            visibleMethods: this.props.methods
        });
        this.props.setViewInfoHeight(400);
    }

    render() {
        const {locale, setFormInfo, methods, pay, paymentValuesPrefilled} = this.props;
        const {visibleMethods} = this.state;
        return (
            <form>
                <div>
                    <div className={formStyles.header}>
                        <div className={formStyles.title}>
                            {locale['form.header.payment.methods.label']}
                        </div>
                    </div>
                    <Methods
                        methods={visibleMethods}
                        locale={locale}
                        setFormInfo={setFormInfo}
                        pay={pay}
                        paymentValuesPrefilled={paymentValuesPrefilled}
                    />
                    {methods > visibleMethods ?
                        <OtherPaymentMethodsLink onClick={this.showAllMethods} locale={locale}/> : null}
                </div>
            </form>
        );
    }
}

export const PaymentMethods = connect(mapStateToProps, mapDispatchToProps)(PaymentMethodsDef);
