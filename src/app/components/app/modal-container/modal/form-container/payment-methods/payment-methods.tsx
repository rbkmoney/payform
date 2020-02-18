import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { FormInfo, PaymentMethod, State } from 'checkout/state';
import { Locale } from 'checkout/locale';
import { goToFormInfo, pay as payAction, PaymentRequestedPayload, setViewInfoHeight } from 'checkout/actions';
import { MethodsList } from './methods';
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
    isShowAllMethods: boolean;
}

const mapStateToProps = (s: State): Partial<PaymentMethodsProps> => ({
    locale: s.config.locale,
    methods: s.availablePaymentMethods.sort((m1, m2) => (m1.priority > m2.priority ? 1 : -1)),
    amountPrefilled: s.amountInfo.status === AmountInfoStatus.final,
    emailPrefilled: !!s.config.initConfig.email
});

const mapDispatchToProps = (dispatch: Dispatch<any>): Partial<PaymentMethodsProps> => ({
    setFormInfo: bindActionCreators(goToFormInfo, dispatch),
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch),
    pay: bindActionCreators(payAction, dispatch)
});

class PaymentMethodsDef extends React.Component<PaymentMethodsProps, PaymentMethodsState> {
    static readonly visibilityThreshold = 3;

    state = {
        isShowAllMethods: false
    };

    private formRef = React.createRef<HTMLFormElement>();

    componentDidUpdate(prevProps: PaymentMethodsProps, prevState: PaymentMethodsState) {
        if (
            prevState.isShowAllMethods !== this.state.isShowAllMethods ||
            prevProps.methods.length !== this.props.methods.length
        ) {
            this.props.setViewInfoHeight(this.formRef.current.clientHeight);
        }
    }

    showAllMethods = () => {
        this.setState({ isShowAllMethods: true });
    };

    render() {
        const { locale, setFormInfo, methods, pay, amountPrefilled, emailPrefilled } = this.props;
        const visibleMethods = this.state.isShowAllMethods
            ? methods
            : methods.slice(0, PaymentMethodsDef.visibilityThreshold);
        return (
            <form ref={this.formRef}>
                <div>
                    <HeaderWrapper>
                        <Title>{locale['form.header.payment.methods.label']}</Title>
                    </HeaderWrapper>
                    <MethodsList
                        methods={visibleMethods}
                        locale={locale}
                        setFormInfo={setFormInfo}
                        pay={pay}
                        amountPrefilled={amountPrefilled}
                        emailPrefilled={emailPrefilled}
                    />
                    {visibleMethods.length < methods.length && (
                        <OtherPaymentMethodsLink onClick={this.showAllMethods} locale={locale} />
                    )}
                </div>
            </form>
        );
    }
}

export const PaymentMethods = connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentMethodsDef);
