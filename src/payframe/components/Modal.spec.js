import { mount } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import Modal from './Modal';
import ruLocale from '../../locale/ru.json';

let modal;

describe('Modal component', function () {
    before(() => {
        modal = mount(<Modal
            invoiceAccessToken={'token'}
            capiEndpoint={'http://api.rbk.fake'}
            invoiceID={'invoiceID'}
            defaultEmail={'defaultEmail'}
            logo={'logo'}
            amount={'amount'}
            currency={'currency'}
            name={'name'}
            description={'description'}
            payformHost={'payformHost'}
            setCheckoutDone={'setCheckoutDone'}
            setClose={'setClose'}
            popupMode={'popupMode'}
            payButtonLabel={'payButtonLabel'}
            locale={ruLocale}
        />);
    });

    it('check .checkout element', () => {
        modal.find('div.checkout');
    });

    it('modal component should have interact state', () => {
        modal.instance().handlePayformInteract(true);
        modal.state('largeContainer').should.be.equal(true);
    });

    it('modal component shouldn\'t have state with defaultEmail', () => {
        modal.state('defaultEmail').should.be.equal(false);
    });

    it('modal component should have state with defaultEmail', () => {
        modal = mount(<Modal
            invoiceAccessToken={'token'}
            capiEndpoint={'http://api.rbk.fake'}
            invoiceID={'invoiceID'}
            defaultEmail={'test@test.com'}
            logo={'logo'}
            amount={'amount'}
            currency={'currency'}
            name={'name'}
            description={'description'}
            payformHost={'payformHost'}
            setCheckoutDone={'setCheckoutDone'}
            setClose={'setClose'}
            popupMode={'popupMode'}
            payButtonLabel={'payButtonLabel'}
            locale={ruLocale}
        />);


        modal.state('defaultEmail').should.be.equal('test@test.com');
    });
});
