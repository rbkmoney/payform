import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { resultReducer } from './reducers/result-reducer';

export function configureStore(initialState: any): Store<any> {
    return createStore(combineReducers({
        result: resultReducer
    }), initialState, composeWithDevTools(applyMiddleware(thunk)));
}
