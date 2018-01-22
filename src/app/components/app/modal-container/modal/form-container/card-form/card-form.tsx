import { connect } from 'react-redux';
import * as React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { bindActionCreators, Dispatch } from 'redux';
import { get } from 'lodash';
import * as formStyles from 'checkout/styles/forms.scss';
import { CardFormProps } from './card-form-props';
import { Amount, CardHolder, CardNumber, Email, ExpireDate, SecureCode } from './fields';
import {
    CardFormValues,
    FormName,
    ModalForms,
    ModalName,
    ModalState,
    PaymentStatus,
    State
} from 'checkout/state';
import { findNamed } from 'checkout/utils';
import { pay, prepareToPay, setViewInfoError } from 'checkout/actions';
import { PayButton } from './pay-button';
import { Header } from '../header/header';

const toCardFormInfo = (modals: ModalState[]) => {
    const info = (findNamed(modals, ModalName.modalForms) as ModalForms).formsInfo;
    return findNamed(info, FormName.cardForm);
};

const mapStateToProps = (state: State) => ({
    cardFormInfo: toCardFormInfo(state.modals),
    config: state.config,
    model: state.model,
    formValues: get(state.form, 'cardForm.values')
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    pay: bindActionCreators(pay, dispatch),
    setViewInfoError: bindActionCreators(setViewInfoError, dispatch),
    prepareToPay: bindActionCreators(prepareToPay, dispatch)
});

type Props = InjectedFormProps & CardFormProps;

class CardFormDef extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    pay(values: CardFormValues) {
        const {config, model} = this.props;
        this.props.prepareToPay();
        this.props.pay(config, model, values);
    }

    init(values: CardFormValues) {
        this.props.initialize({
            email: get(values, 'email'),
            amount: get(values, 'amount')
        });
    }

    submit(values: CardFormValues) {
        (document.activeElement as HTMLElement).blur();
        this.pay(values);
    }

    componentWillMount() {
        const {cardFormInfo: {paymentStatus}, formValues} = this.props;
        this.props.setViewInfoError(false, FormName.cardForm);
        switch (paymentStatus) {
            case PaymentStatus.pristine:
                this.init(formValues);
                break;
            case PaymentStatus.needRetry:
                this.pay(formValues);
                break;
        }
    }

    componentWillReceiveProps(props: Props) {
        if (props.submitFailed) {
            props.setViewInfoError(true, FormName.cardForm);
        }
    }

    render() {
        const {handleSubmit, cardFormInfo: {fieldsConfig: {email, amount}}} = this.props;
        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <Header localeString='form.header.pay.card.label'/>
                <div className={formStyles.formGroup}>
                    <CardNumber/>
                </div>
                <div className={formStyles.formGroup}>
                    <ExpireDate/>
                    <SecureCode/>
                </div>
                <div className={formStyles.formGroup}>
                    <CardHolder/>
                </div>
                {email.visible ?
                    <div className={formStyles.formGroup}>
                        <Email/>
                    </div> : false
                }
                {amount.visible ?
                    <div className={formStyles.formGroup}>
                        <Amount/>
                    </div> : false
                }
                <PayButton/>
            </form>
        );
    }
}

const ReduxForm = reduxForm({
    form: FormName.cardForm,
    destroyOnUnmount: false
})(CardFormDef);

export const CardForm = connect(mapStateToProps, mapDispatchToProps)(ReduxForm as any);
