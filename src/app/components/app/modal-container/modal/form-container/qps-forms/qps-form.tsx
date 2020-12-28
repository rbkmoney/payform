import * as React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import get from 'lodash-es/get';

import {
    FormName,
    ModalForms,
    ModalName,
    ModalState,
    PaymentMethodName,
    PaymentStatus,
    State,
    TerminalFormValues,
    QPSFormInfo
} from 'checkout/state';
import { Header } from '../header';
import { toFieldsConfig } from '../fields-config';
import { pay, setViewInfoError } from 'checkout/actions';
import { QPSFormProps } from './qps-form-props';
import { findNamed, formatAmount } from 'checkout/utils';
import { AmountInfo } from './amount-info';
import { Text } from '../text';
import { FormGroup } from '../form-group';
import { Amount, Email } from '..';
import { NextButton } from './next-button';

type Props = QPSFormProps & InjectedFormProps;

const terminalFormInfo = (modals: ModalState[]): QPSFormInfo => {
    const info = (findNamed(modals, ModalName.modalForms) as ModalForms).formsInfo;
    return findNamed(info, FormName.qpsForm) as QPSFormInfo;
};

const mapStateToProps = (state: State): Partial<Props> => ({
    terminalFormInfo: terminalFormInfo(state.modals),
    locale: state.config.locale,
    fieldsConfig: toFieldsConfig(state.config.initConfig, state.model.invoiceTemplate),
    formValues: get(state.form, 'qpsForm.values'),
    amount: formatAmount(state.amountInfo)
});

const mapDispatchToProps = (dispatch: Dispatch<any>): Partial<Props> => ({
    pay: bindActionCreators(pay, dispatch),
    setViewInfoError: bindActionCreators(setViewInfoError, dispatch)
});

export class QPSFormDef extends React.Component<Props> {
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
            handleSubmit,
            fieldsConfig: { email, amount }
        } = this.props;
        return (
            <form onSubmit={handleSubmit(this.submit)} id="qps-form">
                <Header title={locale['form.header.pay.qps.label']} />
                <Text>{locale['form.pay.qps.info.text']}.</Text>
                {!amount.visible && <AmountInfo amount={this.props.amount} locale={locale} />}
                {email.visible && (
                    <FormGroup>
                        <Email />
                    </FormGroup>
                )}
                {amount.visible && (
                    <FormGroup>
                        <Amount cost={amount.cost} />
                    </FormGroup>
                )}
                <NextButton locale={locale} />
            </form>
        );
    }

    private submit = (values: TerminalFormValues) => {
        (document.activeElement as HTMLElement).blur();
        this.props.pay({ method: PaymentMethodName.QPS, values });
    };
}

const ReduxForm = reduxForm({
    form: FormName.qpsForm,
    destroyOnUnmount: false
})(QPSFormDef);

export const QPSForm = connect(mapStateToProps, mapDispatchToProps)(ReduxForm as any);
