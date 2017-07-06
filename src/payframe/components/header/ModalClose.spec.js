import {mount} from 'enzyme'
import React from 'react';
import chaiEnzyme from 'chai-enzyme'
import ModalClose from './ModalClose';
chai.use(chaiEnzyme());

describe('<ModalClose />', function () {
    let modalClose;

    before(() => {
        modalClose = mount(<ModalClose/>);
    });

    it('should have class checkout--close-button', function () {
        modalClose.find('div').should.to.have.className('checkout--close-button');
    });
});
