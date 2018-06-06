import * as React from 'react';
import { connect } from 'react-redux';
import get from 'lodash-es/get';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { bindActionCreators, Dispatch } from 'redux';
import { WalletFormProps } from './wallet-form-props';
import * as formStyles from 'checkout/styles/forms.scss';
import {
    FormName,
    ModalForms,
    ModalName,
    ModalState,
    PaymentMethodName,
    PaymentStatus,
    State,
    WalletFormValues
} from 'checkout/state';
import { PayButton } from '../pay-button';
import { Header } from '../header';
import { Amount, Email, Phone } from '../common-fields';
import { toFieldsConfig } from '../fields-config';
import { findNamed } from 'checkout/utils';
import { pay, setViewInfoError, setViewInfoHeight } from 'checkout/actions';

const toWalletFormInfo = (m: ModalState[]) => {
    const info = (findNamed(m, ModalName.modalForms) as ModalForms).formsInfo;
    return findNamed(info, FormName.walletForm);
};

const mapStateToProps = (state: State) => ({
    config: state.config,
    model: state.model,
    formValues: get(state.form, 'walletForm.values'),
    locale: state.config.locale,
    fieldsConfig: toFieldsConfig(state.config.initConfig, state.model.invoiceTemplate),
    walletFormInfo: toWalletFormInfo(state.modals)
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch),
    setViewInfoError: bindActionCreators(setViewInfoError, dispatch),
    pay: bindActionCreators(pay, dispatch)
});

type Props = WalletFormProps & InjectedFormProps;

class WalletFormDef extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.props.setViewInfoHeight(288);
    }

    init(values: WalletFormValues) {
        this.props.initialize({
            email: get(values, 'email'),
            amount: get(values, 'amount')
        });
    }

    submit(values: WalletFormValues) {
        (document.activeElement as HTMLElement).blur();
        this.props.pay({method: PaymentMethodName.DigitalWallet, values});
    }

    componentWillMount() {
        const {walletFormInfo: {paymentStatus}, formValues} = this.props;
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
        const {handleSubmit, fieldsConfig: {email, amount}} = this.props;
        return (
            <form onSubmit={handleSubmit(this.submit)} id='wallet-form'>
                <div>
                    <Header title={this.props.locale['form.header.pay.qiwi.label']}/>
                    <div className={formStyles.formGroup}>
                        <Phone/>
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
                </div>
                <PayButton/>
            </form>
        );
    }
}

const ReduxForm = reduxForm({
    form: FormName.walletForm,
    destroyOnUnmount: false
})(WalletFormDef);

export const WalletForm = connect(mapStateToProps, mapDispatchToProps)(ReduxForm as any);
