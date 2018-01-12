import { connect } from 'react-redux';
import * as React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import * as styles from './card-form.scss';
import * as formStyles from '../form-container.scss';
import * as commonFormStyles from 'checkout/styles/forms.scss';
import { CardFormProps } from './card-form-props';
import { Button } from '../button';
import { Amount, CardHolder, CardNumber, Email, ExpireDate, SecureCode } from './fields';
import { CardFormValues, State } from 'checkout/state';
import { ChevronBack } from '../chevron-back';
import { CardFormFlowItem, FormFlowStatus, getByFormName, hasBack, update, FormName } from 'checkout/form-flow';
import { getAmount } from '../../amount-resolver';
import { formatAmount } from 'checkout/utils';
import { bindActionCreators, Dispatch } from 'redux';
import { setFormFlowAction } from 'checkout/actions';

const mapStateToProps = (state: State) => ({
    formsFlow: state.formsFlow,
    config: state.config,
    model: state.model,
    cardForm: state.form.cardForm,
    locale: state.config.locale
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setFormFlow: bindActionCreators(setFormFlowAction, dispatch)
});

type Props = InjectedFormProps & CardFormProps;

const PayButton: React.SFC<CardFormProps> = (props) => {
    const amount = formatAmount(getAmount(props.config.initConfig.integrationType, props.model));
    const label = amount ? `${amount.value} ${amount.symbol}` : null;
    return <Button className={styles.pay_button} type='submit' style='primary' id='payButton'>{props.locale['form.button.pay.label']} {label}</Button>;
};

class CardFormDef extends React.Component<Props> {

    private formFlow: CardFormFlowItem;

    constructor(props: Props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    submit(values: CardFormValues) {
        const activeElement = document.activeElement as HTMLInputElement;
        activeElement.blur();
        this.formFlow.status = FormFlowStatus.inProcess;
        this.formFlow.values = values;
        this.props.setFormFlow(update(this.props.formsFlow, this.formFlow));
    }

    componentWillMount() {
        this.formFlow = getByFormName(this.props.formsFlow, FormName.cardForm) as CardFormFlowItem;
        if (this.formFlow.needToReset) {
            this.props.reset();
        }
    }

    componentWillReceiveProps(props: Props) {
        if (props.submitFailed) {
            this.formFlow.status = FormFlowStatus.error;
            props.setFormFlow(update(props.formsFlow, this.formFlow));
        }
    }

    render() {
        const locale = this.props.locale;
        return (
            <form onSubmit={this.props.handleSubmit(this.submit)} className={styles.form}>
                <div className={formStyles.header}>
                    {hasBack(this.props.formsFlow) ? <ChevronBack/> : null}
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
                {this.formFlow.fieldsConfig.email.visible ?
                    <div className={commonFormStyles.formGroup}>
                        <Email/>
                    </div> : false
                }
                {this.formFlow.fieldsConfig.amount.visible ?
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
