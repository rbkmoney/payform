import { mount } from 'enzyme';
import React from 'react';
import MessageModal from './MessageModal';

let modal;

describe('Message modal component', function () {
    before(() => {
        modal = mount(<MessageModal
            setClose={'setClose'}
            popupMode={true}
            error="error"
        />);
    });

    it('check .error-modal element', () => {
        modal.find('div.error-modal');
    });
});
