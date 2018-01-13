import { connect } from 'react-redux';
import * as React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import * as styles from './card-form.scss';
import * as formStyles from '../form-container.scss';
import * as commonFormStyles from 'checkout/styles/forms.scss';
import { CardFormProps } from './card-form-props';
import { Button } from '../button';
import { Amount, CardHolder, CardNumber, Email, ExpireDate, SecureCode } from './fields';
import { CardFormValues, ModalForms, State } from 'checkout/state';
import { FormName } from 'checkout/form-flow';
import { getAmount } from '../../amount-resolver';
import { formatAmount } from 'checkout/utils';
import { bindActionCreators, Dispatch } from 'redux';
import { pay, setViewInfoError, setViewInfoInProcess } from 'checkout/actions';

const mapStateToProps = (state: State) => ({
    formInfo: (state.modal as ModalForms).formInfo,
    config: state.config,
    model: state.model,
    cardForm: state.form.cardForm,
    locale: state.config.locale
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    pay: bindActionCreators(pay, dispatch),
    setViewInfoError: bindActionCreators(setViewInfoError, dispatch),
    setViewInfoInProcess: bindActionCreators(setViewInfoInProcess, dispatch)
});

type Props = InjectedFormProps & CardFormProps;

const PayButton: React.SFC<CardFormProps> = (props) => {
    const amount = formatAmount(getAmount(props.config.initConfig.integrationType, props.model));
    const label = amount ? `${amount.value} ${amount.symbol}` : null;
    return <Button className={styles.pay_button} type='submit'
                   style='primary'>{props.locale['form.button.pay.label']} {label}</Button>;
};

class CardFormDef extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    submit(values: CardFormValues) {
        const activeElement = document.activeElement as HTMLInputElement;
        activeElement.blur();
        this.props.setViewInfoInProcess(true);
        const {config, model} = this.props;
        this.props.pay(config, model, values);
    }

    componentWillMount() {
        if (this.props.formInfo.needToReset) {
            this.props.reset();
        }
    }

    componentWillReceiveProps(props: Props) {
        if (props.submitFailed) {
            this.props.setViewInfoError(true);
        }
    }

    render() {
        const locale = this.props.locale;
        const {fieldsConfig} = this.props.formInfo;
        return (
            <form onSubmit={this.props.handleSubmit(this.submit)} className={styles.form}>
                <div className={formStyles.header}>
                    {/*{hasBack(this.props.formsFlow) ? <ChevronBack/> : null}*/}
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
