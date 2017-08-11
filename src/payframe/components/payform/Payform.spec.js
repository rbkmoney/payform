import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../redux/reducers/rootReducer';
import Payform from './Payform';
import ruLocale from '../../../locale/ru.json';

describe('<Payform />', function () {
    const initialState = {
            initParams: {
                //payButtonLabel: 'label'
            },
            locale: ruLocale,
            integration: {
                type: 'default',
                invoice: {
                    amount: 3000
                }
            }
        };
        const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

    describe('<Payform /> clean', function() {
       let payform;
       const initialState = {
            initParams: {
                //payButtonLabel: 'Оплатить'
            },
            locale: ruLocale,
            integration: {
                type: 'default',
                invoice: {
                    amount: 3000
                }
            }
        };
        const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

        before(() => {
            payform = mount(<Provider store={store}><Payform locale={ruLocale} onPaymentSuccess={() => {}}/></Provider>);
        });

        it('check .checkout--header exist', () => {
            payform.find('div.payform').should.to.have.length(1);
        });

        //it('check renderPayform', () => {
        //    payform.setState({payment: ''});
        //    payform.find('form').should.to.have.length(1);
        //});

        //it('error panel should be visible', () => {
        //    payform.setState({payment: 'error'});
        //    payform.find('div.payform--error-panel').should.to.have.length(1);
        //});

        it('pay button should have right value', () => {
            payform.find('.payform--pay-button--label').text().should.to.equal('Оплатить');
        });

        //it('pay button should have success class and checkmark', () => {
        //    payform.setState({payment: 'success'});
        //    payform.find('.payform--pay-button').hasClass('_success').should.to.equal(true);
        //    payform.find('div.checkmark');
        //});

        //it('spinner in pay button should be visible', () => {
        //    payform.setState({payment: 'process'});
        //    payform.find('div.spinner').should.to.have.length(1);
        //});

        //it('form should have error class after handleError() method', () => {
        //    const error = {
        //        message: 'Error!'
        //    };
        //
        //    payform.instance().handleError(error);
        //    payform.find('form.payform--form').hasClass('_error').should.to.equal(true);
        //});
    });

    //it('back button should be visible', () => {
    //    const payform = mount(<Provider store={store}><Payform locale={ruLocale} onPaymentSuccess={() => {}}/></Provider>);
    //    payform.setState({back: true});
    //    payform.find('.payform--pay-button').text().should.to.equal('Назад');
    //});
});
