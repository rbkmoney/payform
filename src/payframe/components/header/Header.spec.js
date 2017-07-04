import { mount } from 'enzyme';
import React from 'react';
import Header from './Header';

describe('Header component', function () {
    it('check .checkout--header exist', () => {
        const header = mount(<Header/>);
        header.find('div.checkout--header');
    });

    it('check description exist', () => {
        const header = mount(<Header description="Description"/>);
        header.find('div.checkout--company-description').text().should.be.equal('Description');
    });

    it('check default email exist', () => {
        const header = mount(<Header defaultEmail="test@test.com"/>);
        header.find('div.checkout--default-email').text().should.be.equal('test@test.com');
    });
});
