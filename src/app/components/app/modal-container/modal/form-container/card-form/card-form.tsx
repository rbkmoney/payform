import { connect } from 'react-redux';
import * as React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import * as styles from './card-form.scss';
import * as formStyles from '../form-container.scss';
import * as commonFormStyles from 'checkout/styles/forms.scss';
import { CardFormProps } from './card-form-props';
import { Button } from '../button';
import { Amount, CardHolder, CardNumber, Email, ExpireDate, SecureCode } from './fields';
import { State, CardFormFlowItem, FormFlowStatus, FormName } from 'checkout/state';
import { ChevronBack } from '../chevron-back';
import { getByFormName, hasBack, update } from 'checkout/components/app/form-flow-manager';
import { getAmount } from '../../amount-resolver';
import { formatAmount } from 'checkout/utils';
import { bindActionCreators, Dispatch } from 'redux';
import { setFormFlowAction } from 'checkout/actions';

const mapStateToProps = (state: State) => ({
    formsFlow: state.formsFlow,
    config: state.config,
    model: state.model,
    cardForm: state.form.cardForm
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setFormFlow: bindActionCreators(setFormFlowAction, dispatch)
});

type Props = InjectedFormProps & CardFormProps;

const PayButton: React.SFC<CardFormProps> = (props) => {
    const amount = formatAmount(getAmount(props.config.initConfig.integrationType, props.model));
    const label = amount ? `${amount.value} ${amount.symbol}` : null;
    return <Button className={styles.pay_button} type='submit' style='primary'>Оплатить {label}</Button>;
};

class CardFormDef extends React.Component<Props> {

    private formFlow: CardFormFlowItem;

    constructor(props: Props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    submit() {
        this.formFlow.status = FormFlowStatus.inProcess;
        this.formFlow.values = this.props.cardForm.values;
        this.props.setFormFlow(update(this.props.formsFlow, this.formFlow));
    }

    componentWillMount() {
        this.formFlow = getByFormName(this.props.formsFlow, FormName.cardForm) as CardFormFlowItem;
    }

    componentWillReceiveProps(props: Props) {
        if (props.submitFailed) {
            this.formFlow.status = FormFlowStatus.error;
            props.setFormFlow(update(props.formsFlow, this.formFlow));
        }
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.submit)}>
                <div className={formStyles.header}>
                    {hasBack(this.props.formsFlow) ? <ChevronBack/> : null}
                    <div className={formStyles.title}>
                        Оплата банковской картой
                    </div>
                </div>
                {this.formFlow.amountConfig.visible ?
                    <div className={commonFormStyles.formGroup}>
                        <Amount/>
                    </div> : false
                }
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
                <div className={commonFormStyles.formGroup}>
                    <Email/>
                </div>
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
