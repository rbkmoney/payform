import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { resultReducer, configReducer } from './reducers';
import { State } from './state';

export function configureStore(): Store<State> {
    return createStore(combineReducers({
        result: resultReducer,
        config: configReducer
    }), composeWithDevTools(applyMiddleware(thunk)));
}
