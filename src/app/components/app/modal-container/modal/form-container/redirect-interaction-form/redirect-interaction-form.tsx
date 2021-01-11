import * as React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { FormName, ModalForms, ModalName, ModalState, State, InteractionFormInfo } from 'checkout/state';
import { Header } from '../header';
import { toFieldsConfig } from '../fields-config';
import { setViewInfoError, finishInteraction } from 'checkout/actions';
import { findNamed } from 'checkout/utils';
import { RedirectInteractionFormProps } from './redirect-interaction-form-props';
import { Button } from '../button';

type Props = RedirectInteractionFormProps &
    InjectedFormProps & {
        finishInteraction: typeof finishInteraction;
    };

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
    finishInteraction: bindActionCreators(finishInteraction, dispatch),
    setViewInfoError: bindActionCreators(setViewInfoError, dispatch)
});

export class RedirectInteractionFormDef extends React.Component<Props> {
    componentDidMount() {
        this.open();
        this.props.finishInteraction();
    }

    componentWillReceiveProps(props: Props) {
        if (props.submitFailed) {
            props.setViewInfoError(true);
        }
    }

    render() {
        const { locale } = this.props;
        return (
            <div id="redirect-interaction-form">
                <Header title={locale['form.interaction.redirect.header.label']} />
                <Button onClick={this.open} color="primary" type="button">
                    {locale['form.interaction.redirect.button.text']}
                </Button>
            </div>
        );
    }

    private open = () => {
        window.open(this.props.interaction.request.uriTemplate, '_blank', 'noopener');
    };
}

const ReduxForm = reduxForm({
    form: FormName.redirectInteractionForm,
    destroyOnUnmount: false
})(RedirectInteractionFormDef);

export const RedirectInteractionForm = connect<Partial<Props>, Partial<Props>, Pick<Props, 'interaction'>, State>(
    mapStateToProps,
    mapDispatchToProps
)(ReduxForm as any);
