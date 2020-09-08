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
    QPSFormInfo,
    InteractionFormInfo
} from 'checkout/state';
import { Header } from '../header';
import { toFieldsConfig } from '../fields-config';
import { pay, setViewInfoError } from 'checkout/actions';
import { findNamed, formatAmount } from 'checkout/utils';
import { QRCode } from './qr-code';
import { QPSInteractionFormProps } from './qps-interaction-form-props';
import { QrCodeDisplayRequest } from 'checkout/backend';

type Props = QPSInteractionFormProps & InjectedFormProps;

const terminalFormInfo = (modals: ModalState[]): InteractionFormInfo => {
    const info = (findNamed(modals, ModalName.modalForms) as ModalForms).formsInfo;
    return findNamed(info, FormName.interactionForm) as InteractionFormInfo;
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

export class QPSInteractionFormDef extends React.Component<Props> {
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
        const {
            locale,
            terminalFormInfo: { interaction }
        } = this.props;
        return (
            <div id="qps-started-form">
                <Header title={locale['form.header.pay.qps.label']} />
                <QRCode text={(interaction as QrCodeDisplayRequest).qrCode} />
            </div>
        );
    }

    private submit = (values: CardFormValues) => {
        (document.activeElement as HTMLElement).blur();
        this.props.pay({ method: PaymentMethodName.QPS, values });
    };
}

const ReduxForm = reduxForm({
    form: FormName.qpsForm,
    destroyOnUnmount: false
})(QPSInteractionFormDef);

export const QPSInteractionForm = connect<Partial<Props>, Partial<Props>, Pick<Props, 'interaction'>, State>(
    mapStateToProps,
    mapDispatchToProps
)(ReduxForm as any);
