import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { resultReducer, configReducer } from './reducers';

export function configureStore(): Store<any> {
    return createStore(combineReducers({
        result: resultReducer,
        config: configReducer
    }), composeWithDevTools(applyMiddleware(thunk)));
}
