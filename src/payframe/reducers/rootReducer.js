import { combineReducers } from 'redux'
import initParams from './initParams';
import integration from './integration';
import appConfig from './appConfig';
import locale from './locale';
import error from './error';
import result from './result';
import viewData from './viewData';
import payment from './payment';
import paymentCapabilities from './paymentCapabilities.js';

export default combineReducers({
    initParams,
    integration,
    appConfig,
    locale,
    error,
    result,
    viewData,
    payment,
    paymentCapabilities
})
