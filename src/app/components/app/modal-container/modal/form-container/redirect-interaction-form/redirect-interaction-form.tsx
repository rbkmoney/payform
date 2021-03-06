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
import { Text } from '../text';
import { Loader } from '../../../../../ui/loader';
import styled from '../../../../../../styled-components';
import { Divider } from '../divider';

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

const Centered = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 30px;
`;

export class RedirectInteractionFormDef extends React.Component<Props, { opened: boolean }> {
    state = {
        opened: false
    };

    componentWillReceiveProps(props: Props) {
        if (props.submitFailed) {
            props.setViewInfoError(true);
        }
    }

    render() {
        const { locale } = this.props;
        // TODO: temporary only Uzcard
        return (
            <div id="redirect-interaction-form">
                <Header title={locale['form.interaction.redirect.header.label']} />
                <Text centered={true}>{locale['form.interaction.redirect.text']}</Text>
                <Button onClick={this.open} color="primary" type="button">
                    {locale['form.interaction.redirect.button.text']}
                </Button>
                {this.state.opened && (
                    <>
                        <Divider />
                        <Text centered={true}>{locale['form.interaction.redirect.wait.text']}</Text>
                        <Centered>
                            <Loader />
                        </Centered>
                    </>
                )}
            </div>
        );
    }

    private open = () => {
        window.open(this.props.interaction.request.uriTemplate, '_blank');
        if (!this.state.opened) {
            this.setState({ opened: true });
            this.props.finishInteraction();
        }
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
