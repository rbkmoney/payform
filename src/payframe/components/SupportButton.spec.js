import { mount } from 'enzyme';
import React from 'react';
import SupportButton from './SupportButton';
import ruLocale from '../../locale/ru.json';

let modal;

describe('Checkout support component', function () {
    before(() => {
        modal = mount(<SupportButton locale={ruLocale}/>);
    });

    it('check .checkout--support element', () => {
        modal.find('div.checkout--support');
    });
});
