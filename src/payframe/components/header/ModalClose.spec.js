import {mount} from 'enzyme'
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../redux/reducers/rootReducer';
import chaiEnzyme from 'chai-enzyme'
import ModalClose from './ModalClose';
chai.use(chaiEnzyme());

describe('<ModalClose />', function () {
    let modalClose;
    const initialState = {};
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

    before(() => {
        modalClose = mount(<Provider store={store}><ModalClose/></Provider>);
    });

    it('should have class checkout--close-button', function () {
        modalClose.find('div').should.to.have.className('checkout--close-button');
    });
});
