import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { State } from './state';
import {
    initializeAppReducer,
    resultReducer,
    configReducer,
    modelReducer,
    errorReducer,
    modalReducer
} from './reducers';
import rootSaga from 'checkout/sagas/root-saga';

export function configureStore(initState: any): Store<State> {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(combineReducers({
        initializeApp: initializeAppReducer,
        result: resultReducer,
        config: configReducer,
        model: modelReducer,
        error: errorReducer,
        form: formReducer,
        modals: modalReducer
    }), initState, composeWithDevTools(applyMiddleware(thunk, sagaMiddleware)));
    sagaMiddleware.run(rootSaga);
    return store;
}
