import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { reducer as formReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import { State } from './state';
import {
    initializeAppReducer,
    resultReducer,
    configReducer,
    modelReducer,
    errorReducer,
    modalReducer,
    availablePaymentMethodsReducer,
    amountInfoReducer
} from './reducers';
import rootSaga from 'checkout/sagas/root-saga';

export function configureStore(initState: any): Store<State> {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        combineReducers({
            initializeApp: initializeAppReducer,
            result: resultReducer,
            config: configReducer,
            model: modelReducer,
            error: errorReducer,
            form: formReducer,
            modals: modalReducer,
            availablePaymentMethods: availablePaymentMethodsReducer,
            amountInfo: amountInfoReducer
        }),
        initState,
        composeWithDevTools(applyMiddleware(sagaMiddleware))
    );
    sagaMiddleware.run(rootSaga);
    return store;
}
