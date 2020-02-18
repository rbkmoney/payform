import * as React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import get from 'lodash-es/get';

import {
    CardFormValues,
    FormName,
    ModalForms,
    ModalName,
    ModalState,
    PaymentMethodName,
    PaymentStatus,
    State,
    TerminalFormValues,
    AlipayFormInfo
} from 'checkout/state';
import { Header } from '../header';
import { toFieldsConfig } from '../fields-config';
import { pay, setViewInfoError } from 'checkout/actions';
import { findNamed, formatAmount } from 'checkout/utils';
import { QRCode } from './qr-code';
import { AlipayInteractionFormProps } from './alipay-interaction-form-props';

type Props = AlipayInteractionFormProps & InjectedFormProps;

const terminalFormInfo = (modals: ModalState[]): AlipayFormInfo => {
    const info = (findNamed(modals, ModalName.modalForms) as ModalForms).formsInfo;
    return findNamed(info, FormName.alipayForm) as AlipayFormInfo;
};

const mapStateToProps = (state: State): Partial<Props> => ({
    terminalFormInfo: terminalFormInfo(state.modals),
    locale: state.config.locale,
    fieldsConfig: toFieldsConfig(state.config.initConfig, state.model.invoiceTemplate),
    formValues: get(state.form, 'terminalForm.values'),
    amount: formatAmount(state.amountInfo)
});

const mapDispatchToProps = (dispatch: Dispatch<any>): Partial<Props> => ({
    pay: bindActionCreators(pay, dispatch),
    setViewInfoError: bindActionCreators(setViewInfoError, dispatch)
});

export class AlipayInteractionFormDef extends React.Component<Props> {
    init(values: TerminalFormValues) {
        this.props.initialize({
            email: get(values, 'email'),
            amount: get(values, 'amount')
        });
    }

    componentWillMount() {
        const {
            terminalFormInfo: { paymentStatus },
            formValues
        } = this.props;
        this.props.setViewInfoError(false);
        switch (paymentStatus) {
            case PaymentStatus.pristine:
                this.init(formValues);
                break;
            case PaymentStatus.needRetry:
                this.submit(formValues);
                break;
        }
    }

    componentWillReceiveProps(props: Props) {
        if (props.submitFailed) {
            props.setViewInfoError(true);
        }
    }

    render() {
        const { locale } = this.props;
        return (
            <div id="alipay-started-form">
                <Header title={locale['form.header.pay.alipay.label']} />
                <QRCode text="https://qr.alipay.com/ocx02573uqygoindre2dtf3" />
            </div>
        );
    }

    private submit = (values: CardFormValues) => {
        (document.activeElement as HTMLElement).blur();
        this.props.pay({ method: PaymentMethodName.Euroset, values });
    };
}

const ReduxForm = reduxForm({
    form: FormName.alipayForm,
    destroyOnUnmount: false
})(AlipayInteractionFormDef);

export const AlipayInteractionForm = connect<Partial<Props>, Partial<Props>, Pick<Props, 'interaction'>, State>(
    mapStateToProps,
    mapDispatchToProps
)(ReduxForm as any);
