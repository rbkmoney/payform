import * as React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { FormName, ModalForms, ModalName, ModalState, State, InteractionFormInfo } from 'checkout/state';
import { Header } from '../header';
import { toFieldsConfig } from '../fields-config';
import { setViewInfoError } from 'checkout/actions';
import { findNamed } from 'checkout/utils';
import { QPSInteractionFormProps as RedirectInteractionFormProps } from './redirect-interaction-form-props';
import { Button } from '../button';

type Props = RedirectInteractionFormProps & InjectedFormProps;

const terminalFormInfo = (modals: ModalState[]): InteractionFormInfo => {
    const info = (findNamed(modals, ModalName.modalForms) as ModalForms).formsInfo;
    return findNamed(info, FormName.interactionForm) as InteractionFormInfo;
};

const mapStateToProps = (state: State): Partial<Props> => ({
    terminalFormInfo: terminalFormInfo(state.modals),
    locale: state.config.locale,
    fieldsConfig: toFieldsConfig(state.config.initConfig, state.model.invoiceTemplate)
});

const mapDispatchToProps = (dispatch: Dispatch<any>): Partial<Props> => ({
    setViewInfoError: bindActionCreators(setViewInfoError, dispatch)
});

export class QPSInteractionFormDef extends React.Component<Props> {
    componentWillReceiveProps(props: Props) {
        if (props.submitFailed) {
            props.setViewInfoError(true);
        }
    }

    render() {
        const { locale, interaction } = this.props;
        return (
            <div id="redirect-interaction-form">
                <Header title={locale['form.interaction.redirect.header.label']} />
                <a href={interaction.request.uriTemplate} target="_blank">
                    <Button color="primary" type="button">
                        {locale['form.interaction.redirect.button.text']}
                    </Button>
                </a>
            </div>
        );
    }
}

const ReduxForm = reduxForm({
    form: FormName.qpsForm,
    destroyOnUnmount: false
})(QPSInteractionFormDef);

export const RedirectInteractionForm = connect<Partial<Props>, Partial<Props>, Pick<Props, 'interaction'>, State>(
    mapStateToProps,
    mapDispatchToProps
)(ReduxForm as any);
