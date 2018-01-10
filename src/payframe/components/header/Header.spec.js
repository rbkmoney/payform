import { mount } from 'enzyme';
import React from 'react';
import Header from './Header';

describe('<Header />', function () {
    let header;

    before(() => {
        header = mount(<Header description="Description" defaultEmail="test@test.com"/>);
    });

    it('check .checkout--header exist', () => {
        header.find('div.checkout--header').should.to.have.length(1);
    });

    it('check description exist', () => {
        header.find('div.checkout--company-description').text().should.be.equal('Description');
    });

    it('check default value exist', () => {
        header.find('div.checkout--default-value').text().should.be.equal('test@test.com');
    });
});
