import * as React from 'react';
import { connect } from 'react-redux';
import get from 'lodash-es/get';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { bindActionCreators, Dispatch } from 'redux';

import { MobileCommerceFormProps } from './mobile-commerce-form-props';
import { FormGroup } from '../form-group';
import {
    FormName,
    ModalForms,
    ModalName,
    ModalState,
    PaymentMethodName,
    PaymentStatus,
    State,
    MobileCommerceFormValues
} from 'checkout/state';
import { PayButton } from '../pay-button';
import { Header } from '../header';
import { Amount, Email, Phone } from '../common-fields';
import { toFieldsConfig } from '../fields-config';
import { findNamed } from 'checkout/utils';
import { pay, setViewInfoError } from 'checkout/actions';

const toMobileCommerceFormInfo = (m: ModalState[]) => {
    const info = (findNamed(m, ModalName.modalForms) as ModalForms).formsInfo;
    return findNamed(info, FormName.mobileCommerceForm);
};

const mapStateToProps = (state: State) => ({
    config: state.config,
    model: state.model,
    formValues: get(state.form, 'mobileCommerceForm.values'),
    locale: state.config.locale,
    fieldsConfig: toFieldsConfig(state.config.initConfig, state.model.invoiceTemplate),
    mobileCommerceFormInfo: toMobileCommerceFormInfo(state.modals)
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setViewInfoError: bindActionCreators(setViewInfoError, dispatch),
    pay: bindActionCreators(pay, dispatch)
});

type Props = MobileCommerceFormProps & InjectedFormProps;

class MobileCommerceFormDef extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    init(values: MobileCommerceFormValues) {
        this.props.initialize({
            email: get(values, 'email'),
            amount: get(values, 'amount')
        });
    }

    submit(values: MobileCommerceFormValues) {
        (document.activeElement as HTMLElement).blur();
        this.props.pay({ method: PaymentMethodName.MobileCommerce, values });
    }

    componentWillMount() {
        const {
            mobileCommerceFormInfo: { paymentStatus },
            formValues
        } = this.props;
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
        const {
            handleSubmit,
            fieldsConfig: { email, amount }
        } = this.props;
        return (
            <form onSubmit={handleSubmit(this.submit)} id="mobile-commerce-form">
                <div>
                    <Header title={this.props.locale['form.header.pay.mobile.commerce.label']} />
                    <FormGroup>
                        <Phone />
                    </FormGroup>
                    {email.visible && (
                        <FormGroup>
                            <Email />
                        </FormGroup>
                    )}
                    {amount.visible && (
                        <FormGroup>
                            <Amount cost={amount.cost} />
                        </FormGroup>
                    )}
                </div>
                <PayButton />
            </form>
        );
    }
}

const ReduxForm = reduxForm({
    form: FormName.mobileCommerceForm,
    destroyOnUnmount: false
})(MobileCommerceFormDef);

export const MobileCommerceForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ReduxForm as any);
