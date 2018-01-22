import * as React from 'react';
import {WalletFormProps} from './wallet-form-props';
import * as formStyles from 'checkout/styles/forms.scss';
import { CardFormValues, FormName, ModalForms, ModalName, ModalState, State } from 'checkout/state';
import { PayButton } from 'checkout/components/app/modal-container/modal/form-container/card-form/pay-button';
import { Amount, Email } from 'checkout/components/app/modal-container/modal/form-container/card-form/fields';
import { Header } from 'checkout/components/app/modal-container/modal/form-container/header';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { get } from 'lodash';
import { Dispatch } from 'redux';
import { findNamed } from 'checkout/utils';

const toWalletFormInfo = (modals: ModalState[]) => {
    const info = (findNamed(modals, ModalName.modalForms) as ModalForms).formsInfo;
    return findNamed(info, FormName.walletForm);
};

const mapStateToProps = (state: State) => ({
    walletFormInfo: toWalletFormInfo(state.modals),
    formValues: get(state.form, 'walletForm.values'),
    locale: state.config.locale
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});

type Props = WalletFormProps & InjectedFormProps;

class WalletFormDef extends React.Component<Props> {
    submit(values: CardFormValues) {
        (document.activeElement as HTMLElement).blur();
    }

    render() {
        const {handleSubmit, walletFormInfo: {fieldsConfig: {email, amount}}} = this.props;
        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <Header title={this.props.locale['form.header.pay.wallet.label']}/>
                {email.visible ?
                    <div className={formStyles.formGroup}>
                        <Email/>
                    </div> : false
                }
                {amount.visible ?
                    <div className={formStyles.formGroup}>
                        <Amount/>
                    </div> : false
                }
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
