import 'whatwg-fetch';
import TokenizerScript from './elements/TokenizerScript';
import StyleLink from './elements/StyleLink';
import CloseButton from './elements/modal-elements/CloseButton';
import domReady from '../utils/domReady';
import Listener from '../communication/Listener';
import ParentCommunicator from '../communication/ParentCommunicator';
import Modal from './elements/Modal';
import Container from './elements/modal-elements/Container';
import Form from './elements/modal-elements/container-elements/Form';

domReady(function () {
    const styleLink = new StyleLink();
    styleLink.render();
    const tokenizerScript = new TokenizerScript();
    const modal = new Modal();
    const closeButton = new CloseButton('checkout-modal-close');
    const communicator = new ParentCommunicator();
    closeButton.onclick = () => communicator.send({type: 'close'});
    const container = new Container('checkout-container');
    const form = new Form('checkout-form');

    Listener.addListener(message => {
        if (message.type === 'init' || message.type === 'resume') {
            modal.render().then(() => {
                closeButton.render();
                container.render().then(() => {
                    form.render();
                });
            });
            styleLink.rerender();
            tokenizerScript.render();
        }
    });

});

