import * as React from 'react';
import { connect } from 'react-redux';
import parser from 'uri-template';
import * as styles from './user-interaction-modal.scss';
import { ConfigState, State } from 'checkout/state';
import { BrowserPostRequest } from 'checkout/backend';
import { FormFlowItem, FormName, getActive, ModalInteractionFlowItem } from 'checkout/form-flow';

export interface UserInteractionModalProps {
    formsFlow: FormFlowItem[];
    config: ConfigState;
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
        const interactionItem = getActive(this.props.formsFlow);
        if (interactionItem.formName !== FormName.modalInteraction) {
            throw new Error('Form flow item has wrong type');
        }
        const request = (interactionItem as ModalInteractionFlowItem).request;
        const frame = document.querySelector('#interactionFrame') as HTMLIFrameElement;
        const frameDocument = frame.contentWindow.document;
        const form = prepareForm(this.props.config.origin, request);
        frameDocument.body.appendChild(form);
        form.submit();
    }

    render() {
        return (
            <div className={styles.container} key='3ds'>
                <iframe id='interactionFrame'>
                </iframe>
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
    formsFlow: state.formsFlow,
    config: state.config
});

export const UserInteractionModal = connect(mapStateToProps)(UserInteractionModalDef);
