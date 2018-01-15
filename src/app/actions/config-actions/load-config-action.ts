import { AbstractAction, SetErrorAction, TypeKeys } from 'checkout/actions';
import { ConfigChunk } from './config-chunk';
import { getAppConfig, getLocale } from 'checkout/backend';
import { Dispatch } from 'redux';

export interface SetConfigChunk extends AbstractAction<ConfigChunk> {
    type: TypeKeys.SET_CONFIG_CHUNK;
    payload: ConfigChunk;
}

export type LoadConfigDispatch = (dispatch: Dispatch<SetConfigChunk | SetErrorAction>) => void;

const load = (localeName: string): Promise<ConfigChunk> =>
    getAppConfig().then((appConfig) =>
        getLocale(localeName).then((locale) =>
            ({appConfig, locale})));

export const loadConfig = (locale: string): LoadConfigDispatch =>
    (dispatch) => load(locale)
        .then((payload) => dispatch({
            type: TypeKeys.SET_CONFIG_CHUNK,
            payload
        })).catch(() => dispatch({
            type: TypeKeys.SET_ERROR,
            payload: {
                message: 'Failed to load config'
            }
        }));
