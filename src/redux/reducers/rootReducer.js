import { combineReducers } from 'redux'
import invoice from './invoice';
import invoiceTemplate from './invoiceTemplate';
import data from './data';
import config from './config';
import locale from './locale';
import status from './status';
import error from './error';
import appearance from './appearance';
import process from './process';

export default combineReducers({
    invoice,
    invoiceTemplate,
    data,
    config,
    locale,
    status,
    error,
    appearance,
    process
})