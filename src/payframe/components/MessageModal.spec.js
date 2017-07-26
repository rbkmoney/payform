import { mount } from 'enzyme';
import React from 'react';
import MessageModal from './MessageModal';
import ruLocale from '../../locale/ru.json';

describe('<MessageModal />', function () {
    let modal;

    before(() => {
        modal = mount(<MessageModal
            setClose={'setClose'}
            popupMode={true}
            error="error"
            locale={ruLocale}
        />);
    });

    it('check .error-modal element', () => {
        modal.find('div.error-modal').should.to.have.length(1);
    });
});
