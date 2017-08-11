import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../redux/reducers/rootReducer';
import SupportButton from './SupportButton';
import ruLocale from '../../locale/ru.json';

describe('<SupportButton />', function () {
    let modal;
    const initialState = {
        initParams: {
            email: 'test@test.com'
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
        modal = mount(<Provider store={store}><SupportButton locale={ruLocale}/></Provider>);
    });

    it('check .checkout--support element', () => {
        modal.find('div.checkout--support').should.to.have.length(1);
    });
});
