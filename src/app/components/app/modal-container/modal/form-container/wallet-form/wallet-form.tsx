import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { get } from 'lodash';
import { WalletFormProps } from './wallet-form-props';
import * as formStyles from 'checkout/styles/forms.scss';
import { FormName, ModalForms, ModalName, ModalState, State } from 'checkout/state';
import { PayButton } from '../pay-button';
import { Header } from '../header';
import { findNamed } from 'checkout/utils';
import { Amount, Email, Phone } from '../common-fields';

const toWalletFormInfo = (modals: ModalState[]) => {
    const info = (findNamed(modals, ModalName.modalForms) as ModalForms).formsInfo;
    return findNamed(info, FormName.walletForm);
};

const mapStateToProps = (state: State) => ({
    walletFormInfo: toWalletFormInfo(state.modals),
    formValues: get(state.form, 'walletForm.values'),
    locale: state.config.locale
});

type Props = WalletFormProps & InjectedFormProps;

class WalletFormDef extends React.Component<Props> {
    render() {
        const {walletFormInfo: {fieldsConfig: {email, amount}}} = this.props;
        return (
            <form>
                <Header title={this.props.locale['form.header.pay.wallet.label']}/>
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

export const WalletForm = connect(mapStateToProps)(ReduxForm as any);
