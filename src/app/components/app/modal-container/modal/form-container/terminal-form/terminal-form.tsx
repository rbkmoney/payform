import * as React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as formStyles from 'checkout/styles/forms.scss';
import * as styles from '../form-container.scss';
import { CardFormValues, FormName, State } from 'checkout/state';
import { bindActionCreators, Dispatch } from 'redux';
import { Header } from '../header';
import { Amount, Email } from '../';
import { toFieldsConfig } from '../fields-config';
import { payTerminalEuroset, prepareToPay, setViewInfoError, setViewInfoHeight } from 'checkout/actions';
import { TerminalFormProps } from './terminal-form-props';
import { NextButton } from './next-button';
import { getAmount } from '../../amount-resolver';
import { formatAmount } from 'checkout/utils';
import { AmountInfo } from 'checkout/components/app/modal-container/modal/form-container/terminal-form/amount-info';

const mapStateToProps = (state: State) => ({
    locale: state.config.locale,
    fieldsConfig: toFieldsConfig(state.config.initConfig, state.model.invoiceTemplate),
    config: state.config,
    model: state.model,
    amount: formatAmount(getAmount(state.config.initConfig.integrationType, state.model))
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    pay: bindActionCreators(payTerminalEuroset, dispatch),
    setViewInfoError: bindActionCreators(setViewInfoError, dispatch),
    prepareToPay: bindActionCreators(prepareToPay, dispatch),
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch)
});

type Props = TerminalFormProps & InjectedFormProps;

export class TerminalFormDef extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    pay(values: CardFormValues) {
        const {config, model} = this.props;
        this.props.prepareToPay();
        this.props.pay(config, model, values);
    }

    submit(values: CardFormValues) {
        (document.activeElement as HTMLElement).blur();
        this.pay(values);
    }

    componentDidMount() {
        this.props.setViewInfoHeight(288);
    }

    componentWillReceiveProps(props: Props) {
        if (props.submitFailed) {
            props.setViewInfoError(true);
        }
    }

    render() {
        const {handleSubmit, locale, fieldsConfig: {email, amount}} = this.props;
        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <div>
                    <Header title={locale['form.header.pay.euroset.label']}/>
                    <p className={styles.text}>
                        {locale['form.pay.terminals.info.text']}.
                    </p>
                    {!amount.visible ?
                        <AmountInfo amount={this.props.amount} locale={locale}/> : false
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
                <NextButton locale={locale}/>
            </form>
        );
    }
}

const ReduxForm = reduxForm({
    form: FormName.terminalForm,
    destroyOnUnmount: false
})(TerminalFormDef);

export const TerminalForm = connect(mapStateToProps, mapDispatchToProps)(ReduxForm as any);
