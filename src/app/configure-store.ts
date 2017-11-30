import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { resultReducer, configReducer, modelReducer } from './reducers';
import { State } from './state';

export function configureStore(initState: any): Store<State> {
    return createStore(combineReducers({
        result: resultReducer,
        config: configReducer,
        model: modelReducer
    }), initState, composeWithDevTools(applyMiddleware(thunk)));
}
