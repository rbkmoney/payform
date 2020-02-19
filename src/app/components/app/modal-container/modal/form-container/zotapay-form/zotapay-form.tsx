import * as React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import get from 'lodash-es/get';

import { FormGroup } from '../form-group';
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
    ZotapayFormInfo
} from 'checkout/state';
import { Header } from '../header';
import { Amount, Email } from '..';
import { toFieldsConfig } from '../fields-config';
import { pay, setViewInfoError } from 'checkout/actions';
import { ZotapayFormProps } from './zotapay-form-props';
import { NextButton } from './next-button';
import { findNamed, formatAmount } from 'checkout/utils';
import { AmountInfo } from './amount-info';
import { Text } from '../text';

type Props = ZotapayFormProps & InjectedFormProps;

const terminalFormInfo = (modals: ModalState[]): ZotapayFormInfo => {
    const info = findNamed<ModalForms>(modals, ModalName.modalForms).formsInfo;
    return findNamed<ZotapayFormInfo>(info, FormName.zotapayForm);
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

export class ZotapayFormDef extends React.Component<Props> {
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
            handleSubmit,
            locale,
            fieldsConfig: { email, amount }
        } = this.props;
        return (
            <form onSubmit={handleSubmit(this.submit)} id="zotapay-form">
                <div>
                    <Header title={locale['form.header.pay.zotapay.label']} />
                    <Text>{locale['form.pay.terminals.info.text']}.</Text>
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
                </div>
                <NextButton locale={locale} />
            </form>
        );
    }

    private submit = (values: CardFormValues) => {
        (document.activeElement as HTMLElement).blur();
        this.props.pay({ method: PaymentMethodName.ZotaPay, values });
    };
}

const ReduxForm = reduxForm({
    form: FormName.zotapayForm,
    destroyOnUnmount: false
})(ZotapayFormDef);

export const ZotapayForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ReduxForm as any);