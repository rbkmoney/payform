import { combineReducers } from 'redux'
import invoice from './invoice';
import invoiceTemplate from './invoiceTemplate';
import data from './data';
import config from './config';
import appearance from './appearance';

import initParams from './initParams';
import integration from './integration';
import appConfig from './appConfig';
import locale from './locale';
import error from './error';
import result from './result';

export default combineReducers({
    invoice,
    invoiceTemplate,
    data,
    config,
    appearance,

    initParams,
    integration,
    appConfig,
    locale,
    error,
    result
})