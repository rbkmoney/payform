import { mount } from 'enzyme';
import React from 'react';
import SupportButton from './SupportButton';
import ruLocale from '../../locale/ru.json';

describe('<SupportButton />', function () {
    let modal;

    before(() => {
        modal = mount(<SupportButton locale={ruLocale}/>);
    });

    it('check .checkout--support element', () => {
        modal.find('div.checkout--support').should.to.have.length(1);
    });
});
