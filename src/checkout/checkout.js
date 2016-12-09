import 'whatwg-fetch';
import StyleLink from './elements/StyleLink';
import ready from '../utils/domReady';
import Listener from '../communication/Listener';
import Utils from '../utils/Utils';
import Payform from './payform/Payform';

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './components/Modal';

ready(function () {
    const styleLink = new StyleLink();
    styleLink.render();

    Listener.addListener(message => {
        if (message.type === 'init-payform' || message.type === 'resume') {
            if (Utils.isSafari()) {
                styleLink.rerender();
            }

            ReactDOM.render(
                <Modal/>,
                document.getElementById('root')
            );


            // const payform = new Payform(message.data);
            // const isResume = message.type === 'resume';
            // payform.render(isResume);
        }
    });
});
