import * as React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { CardFormValues, FormName, State } from 'checkout/state';
import { bindActionCreators, Dispatch } from 'redux';
import { Header } from '../header';
import * as formStyles from 'checkout/styles/forms.scss';
import { Amount, Email } from 'checkout/components/app/modal-container/modal/form-container';
import { toFieldsConfig } from 'checkout/components/app/modal-container/modal/form-container/fields-config';
import { PayButton } from '../pay-button';
import { calcFormHeight } from 'checkout/components/app/modal-container/modal/form-container/calc-form-height';
import { payTerminalData, prepareToPay, setViewInfoError, setViewInfoHeight } from 'checkout/actions';
import { TerminalFormProps } from 'checkout/components/app/modal-container/modal/form-container/terminal-form/terminal-form-props';

const mapStateToProps = (state: State) => ({
    locale: state.config.locale,
    fieldsConfig: toFieldsConfig(state.config.initConfig, state.model.invoiceTemplate),
    config: state.config,
    model: state.model
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    pay: bindActionCreators(payTerminalData, dispatch),
    setViewInfoError: bindActionCreators(setViewInfoError, dispatch),
    prepareToPay: bindActionCreators(prepareToPay, dispatch),
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch)
});

type Props = TerminalFormProps & InjectedFormProps;

export class TerminalFormDef extends React.Component<any> {

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
        this.props.setViewInfoHeight(calcFormHeight(288, this.props.fieldsConfig));
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
                <Header title={locale['form.header.pay.euroset.label']}/>
                {email.visible ?
                    <div className={formStyles.formGroup}>
                        <Email/>
                    </div> : false
                }
                {amount.visible ?
                    <div className={formStyles.formGroup}>
                        <Amount cost={amount.cost} locale={locale}/>
                    </div> : false
                }
                <PayButton/>
            </form>
        );
    }
}

const ReduxForm = reduxForm({
    form: FormName.terminalForm,
    destroyOnUnmount: false
})(TerminalFormDef);

export const TerminalForm = connect(mapStateToProps, mapDispatchToProps)(ReduxForm as any);
