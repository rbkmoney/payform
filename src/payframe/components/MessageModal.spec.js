import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../redux/reducers/rootReducer';
import MessageModal from './MessageModal';

describe('<MessageModal />', function () {
    let modal;
    const initialState = {
        initParams: {
            popupMode: true
        }
    };
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

    before(() => {
        modal = mount(<Provider store={store}>
            <MessageModal
             />
        </Provider>);
    });

    it('check .error-modal element', () => {
        modal.find('div.error-modal').should.to.have.length(1);
    });
});
