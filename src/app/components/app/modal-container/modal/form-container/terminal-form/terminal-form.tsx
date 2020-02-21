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
    TerminalFormValues
} from 'checkout/state';
import { Header } from '../header';
import { Amount, Email } from '../';
import { toFieldsConfig } from '../fields-config';
import { pay, prepareToPay, setViewInfoError } from 'checkout/actions';
import { TerminalFormProps } from './terminal-form-props';
import { NextButton } from './next-button';
import { findNamed, formatAmount } from 'checkout/utils';
import { AmountInfo } from './amount-info';
import { Text } from '../text';

const toTerminalFormInfo = (modals: ModalState[]) => {
    const info = (findNamed(modals, ModalName.modalForms) as ModalForms).formsInfo;
    return findNamed(info, FormName.terminalForm);
};

const mapStateToProps = (state: State) => ({
    terminalFormInfo: toTerminalFormInfo(state.modals),
    locale: state.config.locale,
    fieldsConfig: toFieldsConfig(state.config.initConfig, state.model.invoiceTemplate),
    formValues: get(state.form, 'terminalForm.values'),
    amount: formatAmount(state.amountInfo)
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    pay: bindActionCreators(pay, dispatch),
    setViewInfoError: bindActionCreators(setViewInfoError, dispatch),
    prepareToPay: bindActionCreators(prepareToPay, dispatch)
});

type Props = TerminalFormProps & InjectedFormProps;

export class TerminalFormDef extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    init(values: TerminalFormValues) {
        this.props.initialize({
            email: get(values, 'email'),
            amount: get(values, 'amount')
        });
    }

    UNSAFE_componentWillMount() {
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

    UNSAFE_componentWillReceiveProps(props: Props) {
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
            <form onSubmit={handleSubmit(this.submit)} id="terminal-form">
                <div>
                    <Header title={locale['form.header.pay.euroset.label']} />
                    <Text>{locale['form.pay.terminals.info.text']}.</Text>
                    {!amount.visible ? <AmountInfo amount={this.props.amount} locale={locale} /> : false}
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

    private submit(values: CardFormValues) {
        (document.activeElement as HTMLElement).blur();
        this.props.pay({ method: PaymentMethodName.PaymentTerminal, values });
    }
}

const ReduxForm = reduxForm({
    form: FormName.terminalForm,
    destroyOnUnmount: false
})(TerminalFormDef);

export const TerminalForm = connect(mapStateToProps, mapDispatchToProps)(ReduxForm as any);
