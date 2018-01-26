import { connect } from 'react-redux';
import * as React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { bindActionCreators, Dispatch } from 'redux';
import { get } from 'lodash';
import * as formStyles from 'checkout/styles/forms.scss';
import { CardFormProps } from './card-form-props';
import { CardHolder, CardNumber, ExpireDate, SecureCode } from './fields';
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
import { payCardData, prepareToPay, setViewInfoError, setViewInfoHeight } from 'checkout/actions';
import { PayButton } from '../pay-button';
import { Header } from '../header/header';
import { calcFormHeight } from '../calc-form-height';
import { toFieldsConfig } from '../fields-config';
import { Email, Amount } from '../common-fields';

const toCardFormInfo = (modals: ModalState[]) => {
    const info = (findNamed(modals, ModalName.modalForms) as ModalForms).formsInfo;
    return findNamed(info, FormName.cardForm);
};

const mapStateToProps = (state: State) => ({
    cardFormInfo: toCardFormInfo(state.modals),
    config: state.config,
    model: state.model,
    formValues: get(state.form, 'cardForm.values'),
    locale: state.config.locale,
    fieldsConfig: toFieldsConfig(state.config.initConfig, state.model.invoiceTemplate)
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    pay: bindActionCreators(payCardData, dispatch),
    setViewInfoError: bindActionCreators(setViewInfoError, dispatch),
    prepareToPay: bindActionCreators(prepareToPay, dispatch),
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch)
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
        this.props.setViewInfoError(false);
        switch (paymentStatus) {
            case PaymentStatus.pristine:
                this.init(formValues);
                break;
            case PaymentStatus.needRetry:
                this.pay(formValues);
                break;
        }
    }

    componentDidMount() {
        this.props.setViewInfoHeight(calcFormHeight(288, this.props.fieldsConfig));
    }

    componentWillReceiveProps(props: Props) {
        if (props.submitFailed) {
            props.setViewInfoError(true);
        }
    }

    render() {
        const {handleSubmit, fieldsConfig: {email, amount}, locale} = this.props;
        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <fieldset>
                    <Header title={locale['form.header.pay.card.label']}/>
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
                            <Amount cost={amount.cost}/>
                        </div> : false
                    }
                </fieldset>
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
