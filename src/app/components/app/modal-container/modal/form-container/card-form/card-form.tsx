import { connect } from 'react-redux';
import * as React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { bindActionCreators, Dispatch } from 'redux';
import * as commonFormStyles from 'checkout/styles/forms.scss';
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
import { Header } from './header';

const toCardFormInfo = (modals: ModalState[]) => {
    const info = (findNamed(modals, ModalName.modalForms) as ModalForms).formsInfo;
    return findNamed(info, FormName.cardForm);
};

const mapStateToProps = (state: State) => ({
    cardFormInfo: toCardFormInfo(state.modals),
    config: state.config,
    model: state.model
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

    submit(values: CardFormValues) {
        const activeElement = document.activeElement as HTMLInputElement;
        activeElement.blur();
        this.props.prepareToPay(values);
        const {config, model} = this.props;
        this.props.pay(config, model, values);
    }

    init(values: CardFormValues) {
        this.props.initialize(values ? {
            email: values.email,
            amount: values.amount
        } : null);
    }

    retry(values: CardFormValues) {
        const {config, model} = this.props;
        this.props.initialize(values);
        this.props.prepareToPay(values);
        this.props.pay(config, model, values);
    }

    componentWillMount() {
        this.props.setViewInfoError(false, FormName.cardForm);
        const {values, paymentStatus} = this.props.cardFormInfo;
        switch (paymentStatus) {
            case PaymentStatus.pristine:
                this.init(values);
                break;
            case PaymentStatus.needRetry:
                this.retry(values);
                break;
        }
    }

    componentWillReceiveProps(props: Props) {
        if (props.submitFailed) {
            this.props.setViewInfoError(true, FormName.cardForm);
        }
    }

    render() {
        const {handleSubmit, cardFormInfo: {fieldsConfig: {email, amount}}} = this.props;
        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <Header/>
                <div className={commonFormStyles.formGroup}>
                    <CardNumber/>
                </div>
                <div className={commonFormStyles.formGroup}>
                    <ExpireDate/>
                    <SecureCode/>
                </div>
                <div className={commonFormStyles.formGroup}>
                    <CardHolder/>
                </div>
                {email.visible ?
                    <div className={commonFormStyles.formGroup}>
                        <Email/>
                    </div> : false
                }
                {amount.visible ?
                    <div className={commonFormStyles.formGroup}>
                        <Amount/>
                    </div> : false
                }
                <PayButton/>
            </form>
        );
    }
}

const ReduxForm = reduxForm({
    form: FormName.cardForm
})(CardFormDef);

export const CardForm = connect(mapStateToProps, mapDispatchToProps)(ReduxForm as any);
