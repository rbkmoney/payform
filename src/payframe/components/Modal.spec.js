import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../redux/reducers/rootReducer';
import Modal from './Modal';
import ruLocale from '../../locale/ru.json';

describe('<Modal />', function () {
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

    describe('<Modal /> clean', function () {
       let modal;

        before(() => {
            modal = mount(<Provider store={store}><Modal
            /></Provider>);
        });

        it('check .checkout element', () => {
            modal.find('div.checkout--container').should.to.have.length(1)
        });

    });
});
