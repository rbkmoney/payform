import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk';
import { resultReducer, configReducer } from './reducers';
import { State } from './state';

export function configureStore(): Store<State> {
    return createStore(combineReducers({
        result: resultReducer,
        config: configReducer,
        forms: formReducer
    }), composeWithDevTools(applyMiddleware(thunk)));
}
