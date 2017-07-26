import { mount } from 'enzyme';
import React from 'react';
import Modal from './Modal';
import ruLocale from '../../locale/ru.json';

describe('<Modal />', function () {

    describe('<Modal /> clean', function () {
       let modal;

        before(() => {
            const data = {
                invoiceAccessToken: 'token',
                invoiceID: 'invoiceID'
            };
            const invoice = {
                amount: 'amount',
                currency: 'currency'
            };
            modal = mount(<Modal
                capiEndpoint={'http://api.rbk.fake'}
                data={data}
                invoice={invoice}
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
        const data = {
            invoiceAccessToken: 'token',
            invoiceID: 'invoiceID',
            email: 'test@test.com',
        };
        const invoice = {
            amount: 'amount',
            currency: 'currency'
        };
        const modal = mount(<Modal
            data={data}
            invoice={invoice}
            payformHost={'payformHost'}
            locale={ruLocale}
        />);


        modal.state('defaultEmail').should.be.equal('test@test.com');
    });
});
