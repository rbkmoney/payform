import { mount } from 'enzyme';
import React from 'react';
import Modal from './Modal';
import ruLocale from '../../locale/ru.json';

describe('<Modal />', function () {

    describe('<Modal /> clean', function () {
       let modal;

        before(() => {
            modal = mount(<Modal
                invoiceAccessToken={'token'}
                capiEndpoint={'http://api.rbk.fake'}
                invoiceID={'invoiceID'}
                amount={'amount'}
                currency={'currency'}
                payformHost={'payformHost'}
                locale={ruLocale}
            />);
        });

        it('check .checkout element', () => {
            modal.find('div.checkout--container').should.to.have.length(1)
        });

        it('modal component should have interact state', () => {
            modal.instance().handlePayformInteract(true);
            modal.state('largeContainer').should.be.equal(true);
        });

        it('modal component shouldn\'t have state with defaultEmail', () => {
            modal.state('defaultEmail').should.be.equal(false);
        });
    });

    it('modal component should have state with defaultEmail', () => {
        const modal = mount(<Modal
            invoiceAccessToken={'token'}
            capiEndpoint={'http://api.rbk.fake'}
            invoiceID={'invoiceID'}
            defaultEmail={'test@test.com'}
            amount={'amount'}
            currency={'currency'}
            payformHost={'payformHost'}
            locale={ruLocale}
        />);


        modal.state('defaultEmail').should.be.equal('test@test.com');
    });
});
