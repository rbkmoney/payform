import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { bindActionCreators, Dispatch } from 'redux';
import { get } from 'lodash';
import { WalletFormProps } from './wallet-form-props';
import * as formStyles from 'checkout/styles/forms.scss';
import { FormName, ModalForms, ModalName, ModalState, State } from 'checkout/state';
import { PayButton } from '../pay-button';
import { Header } from '../header';
import { Amount, Email, Phone } from '../common-fields';
import { toFieldsConfig } from '../fields-config';
import { findNamed } from 'checkout/utils';
import { setViewInfoHeight } from 'checkout/actions';
import { calcFormHeight } from '../calc-form-height';

const toWalletFormInfo = (m: ModalState[]) => {
    const info = (findNamed(m, ModalName.modalForms) as ModalForms).formsInfo;
    return findNamed(info, FormName.walletForm);
};

const mapStateToProps = (state: State) => ({
    formValues: get(state.form, 'walletForm.values'),
    locale: state.config.locale,
    fieldsConfig: toFieldsConfig(state.config.initConfig, state.model.invoiceTemplate),
    walletFormInfo: toWalletFormInfo(state.modals)
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch)
});

type Props = WalletFormProps & InjectedFormProps;

class WalletFormDef extends React.Component<Props> {

    componentDidMount() {
        this.props.setViewInfoHeight(calcFormHeight(172, this.props.fieldsConfig));
    }

    render() {
        const {fieldsConfig: {email, amount}, locale} = this.props;
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
                        <Amount cost={amount.cost} locale={locale}/>
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
