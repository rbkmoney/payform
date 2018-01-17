import * as React from 'react';
import { connect } from 'react-redux';
import parser from 'uri-template';
import * as styles from './user-interaction-modal.scss';
import { ModalInteraction, ModalName, State } from 'checkout/state';
import { BrowserPostRequest } from 'checkout/backend';
import { findNamed } from 'checkout/utils';

export interface UserInteractionModalProps {
    modal: ModalInteraction;
    origin: string;
}

const prepareForm = (origin: string, request: BrowserPostRequest): HTMLFormElement => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = request.uriTemplate;
    request.form.forEach((field) => {
        const formParam = document.createElement('input');
        formParam.name = field.key;
        if (field.key === 'TermUrl') {
            const decoded = decodeURIComponent(field.template);
            const template = parser.parse(decoded);
            const redirectUrl = `${origin}/html/finishInteraction.html`;
            formParam.value = template.expand({termination_uri: redirectUrl});
        } else {
            formParam.value = field.template;
        }
        form.appendChild(formParam);
    });
    form.setAttribute('target', '_self');
    form.style.visibility = 'hidden';
    return form;
};

class UserInteractionModalDef extends React.Component<UserInteractionModalProps> {

    componentDidMount() {
        const request = this.props.modal.request;
        const frame = document.querySelector('#interactionFrame') as HTMLIFrameElement;
        const frameDocument = frame.contentWindow.document;
        const form = prepareForm(this.props.origin, request);
        frameDocument.body.appendChild(form);
        form.submit();
    }

    render() {
        return (
            <div className={styles.container} key='3ds' id='interact-container'>
                <iframe id='interactionFrame'>
                </iframe>
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
    modal: findNamed(state.modals, ModalName.modalInteraction),
    origin: state.config.origin
});

export const UserInteractionModal = connect(mapStateToProps)(UserInteractionModalDef);
