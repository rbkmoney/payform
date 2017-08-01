import { combineReducers } from 'redux'
import invoice from './invoice';
import data from './data';
import config from './config';
import locale from './locale';

export default combineReducers({
    invoice,
    data,
    config,
    locale
})