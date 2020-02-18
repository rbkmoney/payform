import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import {
    FormInfo,
    PaymentMethod,
    State,
    ModalForms,
    ModalName,
    PaymentMethodsGroupForm,
    FormName
} from 'checkout/state';
import { Locale } from 'checkout/locale';
import { goToFormInfo, pay as payAction, PaymentRequestedPayload, setViewInfoHeight } from 'checkout/actions';
import { AmountInfoStatus } from 'checkout/state/amount-info/amount-info-type';
import { MethodsList } from '../payment-methods/methods';
import { Header } from '../header';
import { findNamed } from '../../../../../../utils';

export interface PaymentMethodsProps {
    locale: Locale;
    methods: PaymentMethod[];
    amountPrefilled: boolean;
    emailPrefilled: boolean;
    setFormInfo: (formInfo: FormInfo) => any;
    setViewInfoHeight: (height: number) => any;
    pay: (payload: PaymentRequestedPayload) => any;
    activeFormInfo: PaymentMethodsGroupForm;
}

const mapStateToProps = (s: State): Partial<PaymentMethodsProps> => {
    const modalForms = findNamed(s.modals, ModalName.modalForms) as ModalForms;
    return {
        locale: s.config.locale,
        methods: s.availablePaymentMethods.sort((m1, m2) => (m1.priority > m2.priority ? 1 : -1)),
        amountPrefilled: s.amountInfo.status === AmountInfoStatus.final,
        emailPrefilled: !!s.config.initConfig.email,
        activeFormInfo: modalForms.formsInfo.find((item) => item.active) as PaymentMethodsGroupForm
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): Partial<PaymentMethodsProps> => ({
    setFormInfo: bindActionCreators(goToFormInfo, dispatch),
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch),
    pay: bindActionCreators(payAction, dispatch)
});

class PaymentMethodsGroupDef extends React.Component<PaymentMethodsProps> {
    private formRef = React.createRef<HTMLFormElement>();

    render() {
        const { locale, setFormInfo, methods, pay, amountPrefilled, emailPrefilled, activeFormInfo } = this.props;
        const method = methods.find((m) => m.name === activeFormInfo.group);
        return (
            <form ref={this.formRef}>
                <div>
                    <Header title={locale['form.header.payment.method.groups.label']} />
                    {method && (
                        <MethodsList
                            methods={method.children}
                            locale={locale}
                            setFormInfo={setFormInfo}
                            pay={pay}
                            amountPrefilled={amountPrefilled}
                            emailPrefilled={emailPrefilled}
                            prevFormName={FormName.paymentMethodsGroup}
                        />
                    )}
                </div>
            </form>
        );
    }
}

export const PaymentMethodsGroup = connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentMethodsGroupDef);
