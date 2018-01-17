import { connect } from 'react-redux';
import * as React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { get } from 'lodash';
import * as styles from './card-form.scss';
import * as formStyles from '../form-container.scss';
import * as commonFormStyles from 'checkout/styles/forms.scss';
import { CardFormProps } from './card-form-props';
import { Button } from '../button';
import { Amount, CardHolder, CardNumber, Email, ExpireDate, SecureCode } from './fields';
import { CardFormValues, FormName, ModalForms, ModalName, ModalState, PaymentStatus, State } from 'checkout/state';
import { getAmount } from '../../amount-resolver';
import { findNamed, formatAmount } from 'checkout/utils';
import { bindActionCreators, Dispatch } from 'redux';
import { pay, prepareToPay, setViewInfoError } from 'checkout/actions';
import {ChevronBack} from 'checkout/components/app/modal-container/modal/form-container/chevron-back';
import {setActiveFormInfo} from 'checkout/actions/modal-actions/set-active-form-info-action';

const toFormInfo = (modals: ModalState[], formName: FormName) => {
    const info = (findNamed(modals, ModalName.modalForms) as ModalForms).formsInfo;
    return findNamed(info, formName);
};

const mapStateToProps = (state: State) => ({
    cardFormInfo: toFormInfo(state.modals, FormName.cardForm),
    config: state.config,
    model: state.model,
    modals: state.modals,
    cardForm: state.form.cardForm,
    locale: state.config.locale,
    formValues: get(state.form, 'cardForm.values')
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    pay: bindActionCreators(pay, dispatch),
    setViewInfoError: bindActionCreators(setViewInfoError, dispatch),
    prepareToPay: bindActionCreators(prepareToPay, dispatch),
    setActiveFormInfo: bindActionCreators(setActiveFormInfo, dispatch)
});

type Props = InjectedFormProps & CardFormProps;

const PayButton: React.SFC<CardFormProps> = (props) => {
    const amount = formatAmount(getAmount(props.config.initConfig.integrationType, props.model));
    const label = amount ? `${amount.value} ${amount.symbol}` : null;
    return <Button className={styles.pay_button} type='submit'
                   style='primary' id='pay-btn'>{props.locale['form.button.pay.label']} {label}</Button>;
};

class CardFormDef extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.back = this.back.bind(this);
    }

    submit(values: CardFormValues) {
        const activeElement = document.activeElement as HTMLInputElement;
        activeElement.blur();
        this.props.prepareToPay();
        const {config, model} = this.props;
        this.props.pay(config, model, values);
    }

    back() {
        this.props.setActiveFormInfo(FormName.paymentMethods, this.props.modals);
    }

    hasBack() {
        return !!toFormInfo(this.props.modals, FormName.paymentMethods);
    }

    componentWillMount() {
        switch (this.props.cardFormInfo.paymentStatus) {
            case PaymentStatus.pristine:
                this.props.reset();
                break;
            case PaymentStatus.needRetry:
                this.props.prepareToPay();
                const {config, model, formValues} = this.props;
                this.props.pay(config, model, formValues);
        }
    }

    componentWillReceiveProps(props: Props) {
        if (props.submitFailed) {
            this.props.setViewInfoError(true, FormName.cardForm);
        }
    }

    render() {
        const locale = this.props.locale;
        const {fieldsConfig} = this.props.cardFormInfo;
        return (
            <form onSubmit={this.props.handleSubmit(this.submit)} className={styles.form}>
                <div className={formStyles.header}>
                    {this.hasBack() ? <ChevronBack back={this.back}/> : null}
                    <div className={formStyles.title}>
                        {locale['form.header.pay.card.label']}
                    </div>
                </div>
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
                {fieldsConfig.email.visible ?
                    <div className={commonFormStyles.formGroup}>
                        <Email/>
                    </div> : false
                }
                {fieldsConfig.amount.visible ?
                    <div className={commonFormStyles.formGroup}>
                        <Amount/>
                    </div> : false
                }
                <PayButton {...this.props}/>
            </form>
        );
    }
}

const ReduxForm = reduxForm({
    form: FormName.cardForm,
    destroyOnUnmount: false
})(CardFormDef);

export const CardForm = connect(mapStateToProps, mapDispatchToProps)(ReduxForm as any);
