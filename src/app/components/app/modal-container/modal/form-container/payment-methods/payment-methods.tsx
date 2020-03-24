import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { FormInfo, PaymentMethod, State } from 'checkout/state';
import { Locale } from 'checkout/locale';
import { goToFormInfo, pay as payAction, PaymentRequestedPayload, setViewInfoHeight } from 'checkout/actions';
import { Methods } from './methods';
import { OtherPaymentMethodsLink } from './other-payment-methods-link';
import { AmountInfoStatus } from 'checkout/state/amount-info/amount-info-type';
import { Title } from '../title';
import { HeaderWrapper } from '../header-wrapper';

export interface PaymentMethodsProps {
    locale: Locale;
    methods: PaymentMethod[];
    amountPrefilled: boolean;
    emailPrefilled: boolean;
    setFormInfo: (formInfo: FormInfo) => any;
    setViewInfoHeight: (height: number) => any;
    pay: (payload: PaymentRequestedPayload) => any;
}

export interface PaymentMethodsState {
    visibleMethods: PaymentMethod[];
}

const mapStateToProps = (s: State) => ({
    locale: s.config.locale,
    methods: s.availablePaymentMethods.sort((m1, m2) => (m1.priority > m2.priority ? 1 : -1)),
    amountPrefilled: s.amountInfo.status === AmountInfoStatus.final,
    emailPrefilled: !!s.config.initConfig.email
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setFormInfo: bindActionCreators(goToFormInfo, dispatch),
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch),
    pay: bindActionCreators(payAction, dispatch)
});

class PaymentMethodsDef extends React.Component<PaymentMethodsProps, PaymentMethodsState> {
    private formElement: HTMLFormElement;

    componentWillMount() {
        const { methods } = this.props;
        const visibilityThreshold = 3;
        const visibleMethods = methods.filter((_m, i) => i < visibilityThreshold);
        this.setState({ visibleMethods });
        this.showAllMethods = this.showAllMethods.bind(this);
    }

    componentDidUpdate(_prevProps: PaymentMethodsProps, prevState: PaymentMethodsState) {
        if (prevState.visibleMethods !== this.state.visibleMethods) {
            this.props.setViewInfoHeight(this.formElement.clientHeight);
        }
    }

    showAllMethods() {
        this.setState((_state, { methods }) => ({ visibleMethods: methods }));
    }

    render() {
        const { locale, setFormInfo, methods, pay, amountPrefilled, emailPrefilled } = this.props;
        const { visibleMethods } = this.state;
        return (
            <form ref={this.setFormElement}>
                <div>
                    <HeaderWrapper>
                        <Title>{locale['form.header.payment.methods.label']}</Title>
                    </HeaderWrapper>
                    <Methods
                        methods={visibleMethods}
                        locale={locale}
                        setFormInfo={setFormInfo}
                        pay={pay}
                        amountPrefilled={amountPrefilled}
                        emailPrefilled={emailPrefilled}
                    />
                    {methods > visibleMethods && (
                        <OtherPaymentMethodsLink onClick={this.showAllMethods} locale={locale} />
                    )}
                </div>
            </form>
        );
    }

    private setFormElement = (element: HTMLFormElement) => {
        this.formElement = element;
    };
}

export const PaymentMethods = connect(mapStateToProps, mapDispatchToProps)(PaymentMethodsDef);
