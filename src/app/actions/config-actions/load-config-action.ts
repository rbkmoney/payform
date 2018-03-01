import { AbstractAction, TypeKeys } from 'checkout/actions';
import { ConfigChunk } from './config-chunk';

export interface SetConfigChunk extends AbstractAction<ConfigChunk> {
    type: TypeKeys.SET_CONFIG_CHUNK;
    payload: ConfigChunk;
}
