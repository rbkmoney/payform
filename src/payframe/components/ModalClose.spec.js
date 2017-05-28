import {mount} from 'enzyme'
import React from 'react';
import chaiEnzyme from 'chai-enzyme'
import ModalClose from './ModalClose';
chai.use(chaiEnzyme());

describe('ModalClose', function () {

    it('should have class checkout--close-button', function () {
        const wrapper = mount(<ModalClose/>);
        wrapper.find('div').should.to.have.className('checkout--close-button');
    });
});
