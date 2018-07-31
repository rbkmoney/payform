import * as React from 'react';
import { connect } from 'react-redux';
import * as styles from './user-interaction-modal.scss';
import {
    EventInteractionObject,
    ModalInteraction,
    ModalInteractionType,
    ModalName,
    State,
    TokenizedInteractionObject
} from 'checkout/state';
import { findNamed } from 'checkout/utils';
import { prepareForm } from './interaction-form';
import { RequestType } from 'checkout/backend/model/event/user-interaction/request-type';
import { BrowserRequest } from 'checkout/backend';

export interface UserInteractionModalProps {
    modal: ModalInteraction;
    origin: string;
}

const getContentDocument = (): Document => {
    const frame = document.querySelector('#interactionFrame') as HTMLIFrameElement;
    return frame.contentWindow.document;
};

class UserInteractionModalDef extends React.Component<UserInteractionModalProps> {

    componentDidMount() {
        const frameDocument = getContentDocument();
        const { origin, modal: { interactionObject } } = this.props;
        let request: BrowserRequest;
        switch (interactionObject.type) {
            case ModalInteractionType.EventInteraction:
                request = (interactionObject as EventInteractionObject).request;
                break;
            case ModalInteractionType.TokenizedInteraction:
                request = {
                    uriTemplate: (interactionObject as TokenizedInteractionObject).uri,
                    requestType: RequestType.BrowserGetRequest
                };
                break;
        }
        const form = prepareForm(origin, request);
        frameDocument.body.appendChild(form);
        form.submit();
    }

    render() {
        return (
            <div className={styles.container} key='3ds' id='interact-container'>
                <iframe id='interactionFrame'/>
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
    modal: findNamed(state.modals, ModalName.modalInteraction),
    origin: state.config.origin
});

export const UserInteractionModal = connect(mapStateToProps)(UserInteractionModalDef);
