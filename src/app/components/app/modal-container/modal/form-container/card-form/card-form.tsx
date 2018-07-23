import { connect } from 'react-redux';
import * as React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { bindActionCreators, Dispatch } from 'redux';
import get from 'lodash-es/get';
import * as formStyles from 'checkout/styles/forms.scss';
import { CardFormProps } from './card-form-props';
import { CardHolder, CardNumber, ExpireDate, SecureCode } from './fields';
import {
    CardFormValues,
    FormName,
    ModalForms,
    ModalName,
    ModalState,
    PaymentMethodName,
    PaymentStatus,
    State
} from 'checkout/state';
import { findNamed } from 'checkout/utils';
import {pay, setViewInfoError, subscribe } from 'checkout/actions';
import { PayButton } from '../pay-button';
import { Header } from '../header/header';
import { toFieldsConfig } from '../fields-config';
import { Email, Amount } from '../common-fields';
import { IntegrationType } from 'checkout/config';

const toCardFormInfo = (modals: ModalState[]) => {
    const info = (findNamed(modals, ModalName.modalForms) as ModalForms).formsInfo;
    return findNamed(info, FormName.cardForm);
};

const mapStateToProps = (state: State) => ({
    cardFormInfo: toCardFormInfo(state.modals),
    formValues: get(state.form, 'cardForm.values'),
    locale: state.config.locale,
    fieldsConfig: toFieldsConfig(state.config.initConfig, state.model.invoiceTemplate),
    integrationType: state.config.initConfig.integrationType
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    pay: bindActionCreators(pay, dispatch),
    subscribe: bindActionCreators(subscribe, dispatch),
    setViewInfoError: bindActionCreators(setViewInfoError, dispatch)
});

type Props = InjectedFormProps & CardFormProps;

class CardFormDef extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        const {cardFormInfo: {paymentStatus}, formValues} = this.props;
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
        const {handleSubmit, fieldsConfig: {email, amount, cardHolder}} = this.props;
        return (
            <form onSubmit={handleSubmit(this.submit)} id='card-form'>
                <div>
                    <Header title={this.getHeaderTitle()}/>
                    <div className={formStyles.formGroup}>
                        <CardNumber/>
                    </div>
                    <div className={formStyles.formGroup}>
                        <ExpireDate/>
                        <SecureCode/>
                    </div>
                    {cardHolder.visible ?
                        <div className={formStyles.formGroup}>
                            <CardHolder/>
                        </div> : false
                    }
                    {email.visible ?
                        <div className={formStyles.formGroup}>
                            <Email/>
                        </div> : false
                    }
                    {amount.visible ?
                        <div className={formStyles.formGroup}>
                            <Amount cost={amount.cost}/>
                        </div> : false
                    }
                </div>
                <PayButton/>
            </form>
        );
    }

    private submit(values: CardFormValues) {
        (document.activeElement as HTMLElement).blur();
        switch (this.props.integrationType) {
            case IntegrationType.invoice:
            case IntegrationType.invoiceTemplate:
                this.props.pay({method: PaymentMethodName.BankCard, values});
                break;
            case IntegrationType.customer:
                this.props.subscribe(values);
                break;
        }
    }

    private init(values: CardFormValues) {
        this.props.initialize({
            email: get(values, 'email'),
            amount: get(values, 'amount')
        });
    }

    private getHeaderTitle(): string {
        switch (this.props.integrationType) {
            case IntegrationType.invoice:
            case IntegrationType.invoiceTemplate:
                return this.props.locale['form.header.pay.card.label'];
            case IntegrationType.customer:
                return this.props.locale['form.header.pay.card.customer.label'];
        }
    }
}

const ReduxForm = reduxForm({
    form: FormName.cardForm,
    destroyOnUnmount: false
})(CardFormDef);

export const CardForm = connect(mapStateToProps, mapDispatchToProps)(ReduxForm as any);
