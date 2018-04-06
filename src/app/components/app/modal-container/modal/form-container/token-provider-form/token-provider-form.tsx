import { connect } from 'react-redux';
import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import get from 'lodash-es/get';
import * as formStyles from 'checkout/styles/forms.scss';
import { TokenProviderFormProps } from './token-provider-form-props';
import { Header } from '../header';
import {
    FormName,
    ModalForms,
    ModalName,
    ModalState,
    State,
    TokenProviderFormInfo,
    PaymentStatus,
    TokenProviderFormValues
} from 'checkout/state';
import {
    payTokenProvider,
    prepareToPay,
    setViewInfoError,
    setViewInfoHeight
} from 'checkout/actions';
import { findNamed } from 'checkout/utils';
import { ApplePayButton } from './apple-pay-button';
import { toFieldsConfig } from '../fields-config';
import { Amount, Email } from '../';

const toFormInfo = (modals: ModalState[]): TokenProviderFormInfo => {
    const info = (findNamed(modals, ModalName.modalForms) as ModalForms).formsInfo;
    return findNamed(info, FormName.tokenProviderForm) as TokenProviderFormInfo;
};

const mapStateToProps = (state: State) => ({
    tokenProviderFormInfo: toFormInfo(state.modals),
    locale: state.config.locale,
    config: state.config,
    model: state.model,
    fieldsConfig: toFieldsConfig(state.config.initConfig, state.model.invoiceTemplate),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setViewInfoError: bindActionCreators(setViewInfoError, dispatch),
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch),
    prepareToPay: bindActionCreators(prepareToPay, dispatch),
    pay: bindActionCreators(payTokenProvider, dispatch),
});

type Props = InjectedFormProps & TokenProviderFormProps;

export class TokenProviderFormDef extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.props.setViewInfoHeight(236);
    }

    init(values: TokenProviderFormValues) {
        this.props.initialize({
            email: get(values, 'email'),
            amount: get(values, 'amount')
        });
    }

    componentWillMount() {
        const {tokenProviderFormInfo: {paymentStatus}, formValues} = this.props;
        this.props.setViewInfoError(false);
        switch (paymentStatus) {
            case PaymentStatus.pristine:
                this.init(formValues);
                break;
            case PaymentStatus.needRetry:
                this.doPaymentAction(formValues);
                break;
        }
    }

    componentWillReceiveProps(props: Props) {
        if (props.submitFailed) {
            props.setViewInfoError(true);
        }
    }

    render() {
        const {fieldsConfig: {email, amount}, handleSubmit} = this.props;
        return (
            <form id='token-provider-form'>
                <div>
                    <Header title='Apple Pay'/>
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
                <ApplePayButton onClick={handleSubmit(this.submit)}/>
            </form>
        );
    }

    private submit(values: TokenProviderFormValues) {
        (document.activeElement as HTMLElement).blur();
        this.doPaymentAction(values);
    }

    private doPaymentAction(values: TokenProviderFormValues) {
        const {config, model} = this.props;
        this.props.prepareToPay();
        this.props.pay(config, model, values);
    }
}

const ReduxForm = reduxForm({
    form: FormName.tokenProviderForm,
    destroyOnUnmount: false
})(TokenProviderFormDef);

export const TokenProviderForm = connect(mapStateToProps, mapDispatchToProps)(ReduxForm as any);
