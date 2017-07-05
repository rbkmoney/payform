import { mount } from 'enzyme';
import React from 'react';
import Payform from './Payform';
import ruLocale from '../../../locale/ru.json';

describe('Payform component', function () {
    it('check .checkout--header exist', () => {
        const payform = mount(<Payform locale={ruLocale}/>);
        payform.find('div.payform');
    });

    it('check renderPayform', () => {
        const payform = mount(<Payform locale={ruLocale}/>);
        payform.setState({payment: ''});
        payform.find('form');
    });

    it('form should have error class after handleError() method', () => {
        const payform = mount(<Payform locale={ruLocale} onPaymentSuccess={() => {}}/>);
        const error = {
            message: 'Error!'
        };

        payform.instance().handleError(error);
        payform.find('form.payform--form').hasClass('_error').should.to.equal(true);
    });

    it('error panel should be visible', () => {
        const payform = mount(<Payform locale={ruLocale}/>);
        payform.setState({payment: 'error'});
        payform.find('div.payform--error-panel');
    });

    it('back button should be visible', () => {
        const payform = mount(<Payform locale={ruLocale}/>);
        payform.setState({back: true});
        payform.find('.payform--pay-button').text().should.to.equal('Назад');
    });

    it('pay button should have right value', () => {
        const payform = mount(<Payform locale={ruLocale}/>);
        payform.find('.payform--pay-button').text().should.to.equal('Оплатить 0.00');
    });

    it('pay button should have success class and checkmark', () => {
        const payform = mount(<Payform locale={ruLocale}/>);
        payform.setState({payment: 'success'});
        payform.find('.payform--pay-button').hasClass('_success').should.to.equal(true);
        payform.find('div.checkmark');
    });

    it('spinner in pay burron should be visible', () => {
        const payform = mount(<Payform locale={ruLocale}/>);
        payform.setState({payment: 'process'});
        payform.find('div.spinner');
    });
});
