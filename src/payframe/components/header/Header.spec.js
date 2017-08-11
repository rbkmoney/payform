import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../redux/reducers/rootReducer';
import Header from './Header';

describe('<Header />', function () {
    let header;
    const initialState = {
        initParams: {
            popupMode: true,
            description: 'Description'
        },
        viewData: {
            defaultEmail: 'test@test.com',
        }
    };
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

    before(() => {
        header = mount(<Provider store={store}><Header/></Provider>);
    });

    it('check .checkout--header exist', () => {
        header.find('div.checkout--header').should.to.have.length(1);
    });

    it('check description exist', () => {
        header.find('div.checkout--company-description').text().should.be.equal('Description');
    });

    it('check default email exist', () => {
        header.find('div.checkout--default-email').text().should.be.equal('test@test.com');
    });
});
