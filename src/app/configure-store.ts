import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { State } from './state';
import {
    resultReducer,
    configReducer,
    modelReducer,
    lifecycleReducer,
    errorReducer,
    formsFlowReducer
} from './reducers';

export function configureStore(initState: any): Store<State> {
    return createStore(combineReducers({
        result: resultReducer,
        config: configReducer,
        model: modelReducer,
        lifecycle: lifecycleReducer,
        error: errorReducer,
        formsFlow: formsFlowReducer
    }), initState, composeWithDevTools(applyMiddleware(thunk)));
}
